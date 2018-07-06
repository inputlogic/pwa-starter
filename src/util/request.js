export default function request ({url, method = 'GET', data = null, headers}) {
  const xhr = new window.XMLHttpRequest()
  const promise = new Promise((resolve, reject) => {
    xhr.open(method, url, true)
    xhr.onload = () => xhr.status >= 400
      ? reject(xhr.statusText)
      : resolve(safelyParse(xhr.responseText))
    xhr.onerror = () => reject(xhr.statusText)
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (headers && typeof headers === 'object') {
      Object.keys(headers).forEach(k => xhr.setRequestHeader(k, headers[k]))
    }
    xhr.send(typeof data === 'object' || Array.isArray(data)
      ? JSON.stringify(data)
      : data)
  })
  return {xhr, promise}
}

function safelyParse (json) {
  try {
    return JSON.parse(json)
  } catch (_) {
    return json
  }
}
