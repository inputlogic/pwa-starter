// Set initial state here
const state = {
  parent: {
    nested: {
      child: 1
    }
  }
}

// no touchy
const ANY = '*'
const listeners = {}

function notifyListeners (path) {
  const fns = listeners[path]
  if (fns && fns.length) {
    fns.forEach(fn => fn())
  }
}

export function subscribe (path, listener) {
  if (!listener) {
    listener = path
    path = ANY
  }
  listeners[path] = listeners[path] || []
  listeners[path].push(listener)
  return function unsubscribe () {
    listeners[path] = listeners[path].filter(fn => fn !== listener)
  }
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

export function set (path, valToSet) {
  console.log('set', path, valToSet)
  let changed = false
  let paths = path.split('.')
  paths.reduce((obj, prop, idx) => {
    obj[prop] = obj[prop] || {}
    if (paths.length === (idx + 1)) {
      obj[prop] = valToSet
      changed = true
    }
    return obj[prop]
  }, state)
  if (changed) {
    while (paths.length) {
      notifyListeners(paths.join('.'))
      paths = paths.slice(0, -1)
    }
    notifyListeners(ANY)
  }
  return Object.freeze({...state})
}
