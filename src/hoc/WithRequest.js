import React from 'react'

import equal from '/util/equal'
import makeRequest from '/util/makeRequest'
import {getState} from '/store'

const OK_TIME = 30000
const CACHE = {}
const cache = (endpoint, result) => {
  console.log('cache', {endpoint, result})
  CACHE[endpoint] = {result, timestamp: Date.now()}
  console.log(endpoint, result)
}
const validCache = endpoint => {
  const ts = CACHE[endpoint] && CACHE[endpoint].timestamp
  if (!ts) return false
  const diff = Date.now() - ts
  return diff < OK_TIME
}

export const clearCache = endpoint => {
  CACHE[endpoint] = null
  console.log('clearCache', endpoint, CACHE)
}

export default class WithRequest extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isLoading: true, result: null, error: null}
    this._existing = null
  }

  _performRequest (endpoint, parse) {
    const token = getState().token
    const headers = {}
    if (token) {
      headers.Authorization = `Token ${token}`
    }
    console.log('_performRequest', {endpoint, parse, headers})
    const {xhr, promise} = makeRequest({endpoint, headers})

    this._existing = xhr
    this._existing._endpoint = endpoint

    promise
      .then(result => cache(endpoint, result) || this.setState({result, isLoading: false}))
      .catch(error => console.log('_performRequest', {error}) || this.setState({error, isLoading: false}))
  }

  _loadResult () {
    if (this._existing && !this.state.error) {
      this._existing.abort()
      this._existing = null
    }

    const {endpoint, parse} = this.props.request
    console.log('_loadResult', {endpoint, parse})
    if (validCache(endpoint)) {
      this.setState({result: CACHE[endpoint].result, isLoading: false})
    } else {
      this._performRequest(endpoint, parse)
    }
  }

  componentDidMount () {
    this._loadResult()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.request.endpoint !== this.props.request.endpoint) {
      return true
    }
    return !equal(nextState, this.state)
  }

  componentDidUpdate () {
    if (!this._existing) return
    if (this.props.request.endpoint !== this._existing._endpoint) {
      console.log('_existing', this._existing._endpoint)
      this._loadResult()
    }
  }

  render () {
    const children = this.children || this.props.children
    const child = children[0]
    if (!child || typeof child !== 'function') {
      throw new Error('WithRequest requires a function as its only child')
    }
    return child(this.state)
  }
}
