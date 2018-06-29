import {DEBUG} from '/consts'

const state = {
  clicks: 1,
  wins: 1,
  parent: {
    nested: {
      child: 1
    }
  }
}
const components = []

export const subscribe = component => {
  components.push(component)
  return getState()
}

export const unsubscribe = component => {
  const idx = components.findIndex(c => c === component)
  idx > -1 && components.splice(idx, 1)
}

export const getState = () => Object.freeze({...state})

export const setState = updatedState => {
  Object.assign(state, updatedState)
  DEBUG && console.log('setState', updatedState, state)
  components.forEach(c => c.setState(state))
}
