this.onmessage = function (ev) {
  const { url, method = 'GET', data = null, headers } = ev.data.args[0]
  const xhr = new this.XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onload = () => xhr.status >= 400
    ? this.postMessage({ error: xhr.statusText })
    : this.postMessage({ response: safelyParse(xhr.responseText) })
  xhr.onerror = () => this.postMessage({ error: xhr.statusText })
  xhr.setRequestHeader('Content-Type', 'application/json')
  if (headers && typeof headers === 'object') {
    Object.keys(headers).forEach(k => xhr.setRequestHeader(k, headers[k]))
  }
  xhr.send(typeof data === 'object' || Array.isArray(data)
    ? JSON.stringify(data)
    : data)
}

function safelyParse (json) {
  try {
    return JSON.parse(json)
  } catch (_) {
    return json
  }
}
