import Preact from 'preact'
import equal from '/util/equal'
import workerize from '/util/workerize'

const defaultParse = r => r.result || r

const CACHE = {}
const cache = (url, result) => {
  CACHE[url] = {result, timestamp: Date.now()}
}
const validCache = url => {
  const diff = Date.now() - CACHE[url].timestamp
  return diff < 5000 // less than 5 seconds old
}

export default class WithRequest extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = {isLoading: true, result: null, error: null}
    this._existing = null
  }

  _workerRequest (url, parse) {
    const {worker, promise} = workerize('request', {url})

    this._existing = worker
    this._existing.responseURL = url

    promise
      .then(({response}) => parse ? parse(response) : defaultParse(response))
      .then(result => cache(url, result) || this.setState({result, isLoading: false}))
      .catch(error => this.setState({error}))
  }

  _performRequest () {
    if (this._existing) {
      this._existing.terminate()
      this._existing = null
    }

    const {url, parse} = this.props.request
    if (validCache(url)) {
      console.log('SHIT!', Date.now() - CACHE[url].timestamp)
    } else {
      this._workerRequest(url, parse)
    }
  }

  componentDidMount () {
    this._performRequest()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.request.url !== this.props.request.url) {
      return true
    }
    return !equal(nextState, this.state)
  }

  componentDidUpdate () {
    if (this.props.request.url !== this._existing.responseURL) {
      this._performRequest()
    }
  }

  render ({children}, state) {
    const child = children[0]
    if (!child || typeof child !== 'function') {
      throw new Error('WithRequest requires a function as its only child')
    }
    return child(state)
  }
}
