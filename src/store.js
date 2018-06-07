// Set initial state here
const state = {
  initial: 1
}

// no touchy
const listeners = {}

function notifyListeners (paths) {
  const fns = listeners[paths]
  if (fns && fns.length) {
    fns.forEach(fn => fn())
  }
}

export function subscribe (paths, listener) {
  listeners[paths] = listeners[paths] || []
  listeners[paths].push(listener)
}

export function getState () {
  return Object.freeze({...state})
}

export function get (paths) {
  paths = paths.split('.')
  let val = Object.freeze({...state})
  for (let x = 0; x < paths.length; x++) {
    if (val == null) break
    val = val[paths[x]]
  }
  return val
}

export function set (paths, valToSet) {
  paths = paths.split('.')
  paths.reduce(function (obj, prop, idx) {
    obj[prop] = obj[prop] || {}
    if (paths.length === (idx + 1)) {
      obj[prop] = valToSet
    }
    return obj[prop]
  }, state)
  notifyListeners(paths)
  return Object.freeze({...state})
}
