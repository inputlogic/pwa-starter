import W from 'wasmuth'

import {getState} from '/store'

import {clearCache} from '/hoc/WithRequest'

const API_URL = 'http://10.0.2.2:8000'

const XMLHttpRequest = typeof window !== 'undefined'
  ? window.XMLHttpRequest
  : require('xmlhttprequest').XMLHttpRequest

const safelyParse = (json, key) => {
  try {
    const parsed = JSON.parse(json)
    return key != null ? parsed[key] : parsed
  } catch (_) {
    return json
  }
}

const getAuthHeader = (headers = {}) => {
  const token = getState().token
  if (token) {
    headers.Authorization = `Token ${token}`
  }
  return headers
}

const makeErr = (code, msg) => {
  const e = new Error(msg)
  e.code = code
  if (code === 401) {
    typeof window !== 'undefined' && window.localStorage.removeItem('token')
  }
  console.log('makeErr', {code, msg})
  return e
}

function makeRequest ({endpoint, url, method = 'get', data, headers, invalidate}) {
  if (endpoint != null) {
    url = endpoint.indexOf('http') === -1
      ? `${API_URL}/${endpoint}`
      : endpoint
  }

  const xhr = new XMLHttpRequest()
  const promise = new Promise((resolve, reject) => {
    xhr.open(method.toUpperCase(), url)

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      invalidate && clearCache(invalidate)
      xhr.status >= 400
        ? reject(makeErr(xhr.status, safelyParse(xhr.responseText, 'detail')))
        : resolve(safelyParse(xhr.responseText))
    }
    xhr.onerror = () => reject(xhr)
    xhr.setRequestHeader('Content-Type', 'application/json')

    headers = getAuthHeader(headers)
    if (headers && W.toType(headers) === 'object') {
      W.map((k, v) => xhr.setRequestHeader(k, v), headers)
    }

    const dataType = W.toType(data)

    xhr.send(dataType === 'object' || dataType === 'array'
      ? JSON.stringify(data)
      : data)
  })
  return {xhr, promise}
}

export default makeRequest
