import Preact from 'preact'
import equal from '/util/equal'
import makeRequest from '/util/request'

const defaultParse = r => r.result || r

export default class WithRequest extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = {isLoading: true, result: null, error: null}
    this._xhr = null
  }

  _performRequest () {
    if (this._xhr && this._xhr.readyState !== 4) {
      this._xhr.abort()
    }

    const {url, parse} = this.props.request
    const {xhr, promise} = makeRequest({url})

    this._xhr = xhr

    promise
      .then(r => parse ? parse(r) : defaultParse(r))
      .then(result => this.setState({result, isLoading: false}))
      .catch(error => this.setState({error}))
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
    if (this.props.request.url !== this._xhr.responseURL) {
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
