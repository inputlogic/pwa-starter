import W from 'wasmuth'
import React from 'react'
import equal from '/util/equal'
import makeRequest from '/util/makeRequest'
import {getState, setState} from '/store'

const OK_TIME = 30000

const getCache = () => getState().CACHE || {}

export const clearCache = endpoint =>
  setState({CACHE: W.dissoc(endpoint, getCache())})

const cache = (endpoint, result) =>
  setState({CACHE: W.assoc(
    endpoint,
    {result, timestamp: Date.now()},
    getCache()
  )})

const validCache = endpoint => {
  const CACHE = getCache()
  const ts = CACHE[endpoint] && CACHE[endpoint].timestamp
  if (!ts) return false
  const diff = Date.now() - ts
  if (diff < OK_TIME) {
    return CACHE[endpoint]
  }
  clearCache(endpoint)
  return false
}

const reducePending = () => {
  const curr = getState().pendingRequests
  if (curr > 0) {
    setState({pendingRequests: curr - 1})
  }
}

const _existing = {}

export default class WithRequest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {...(this.state || {}), isLoading: true, result: null, error: null}
    setState({pendingRequests: getState().pendingRequests + 1})
    this._loadResult(this.props)
  }

  _loadResult (props) {
    if (!props.request || !props.request.endpoint) {
      return
    }

    const {endpoint, parse} = props.request

    if (_existing[endpoint] && !this.state.error) {
      this._handlePromise(endpoint, _existing[endpoint])
      console.log('_existing', endpoint)
      return
    }

    const cached = validCache(endpoint)
    if (cached) {
      this.setState({result: cached.result, isLoading: false})
      reducePending()
    } else {
      this._performRequest(endpoint, parse)
    }
  }

  _performRequest (endpoint, parse) {
    const token = getState().token
    const headers = {}
    if (token) {
      headers.Authorization = `Token ${token}`
    }
    const {promise} = makeRequest({endpoint, headers})

    _existing[endpoint] = promise
    _existing[endpoint]._endpoint = endpoint

    this._handlePromise(endpoint, promise)
  }

  _handlePromise (endpoint, promise) {
    promise
      .then(result => {
        cache(endpoint, result)
        this.setState({result, isLoading: false})
        reducePending()
      })
      .catch(error => {
        console.log('_performRequest', {error})
        this.setState({error, isLoading: false})
        reducePending()
      })
  }

  shouldComponentUpdate (nextProps, nextState) {
    const nextEndpoint = (nextProps.request || {}).endpoint
    const currEndpoint = (this.props.request || {}).endpoint
    if (currEndpoint !== nextEndpoint) {
      return true
    }
    return !equal(nextState, this.state)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const endpointChanged = this.props.request !== prevProps.request
    if (endpointChanged) {
      this.setState({isLoading: true, result: null})
      this._loadResult(this.props)
      return
    }
    const endpoint = (this.props.request || {}).endpoint
    if (!_existing[endpoint]) return
    if (endpoint !== _existing[endpoint]._endpoint) {
      this.setState({isLoading: true})
      this._loadResult(this.props)
    }
  }

  render ({children}) {
    const child = children[0]
    if (!child || typeof child !== 'function') {
      throw new Error('WithRequest requires a function as its only child')
    }
    return child(this.state)
  }
}
