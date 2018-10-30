// import W from 'wasmuth'
import render from 'preact-render-to-string'

import Helmet, {rewind} from '@app-elements/helmet'

import {MainApp, store} from '/index'

const {setState, getState} = store

export const renderReact = (url) => new Promise((resolve, reject) => {
  setState({currentPath: url})
  render(<MainApp />) // Render, to register pendingRequests

  console.log('pendingRequests', getState().pendingRequests)

  const maxTime = 6000
  const delay = 1
  let count = 0
  let id = setInterval(() => {
    const pending = getState().pendingRequests
    if (!pending || count * delay >= maxTime) {
      clearInterval(id)
      const state = JSON.stringify(getState())
      // Rerender html again, now that pendingRequests are done
      const html = render(<MainApp />)
      const head = render(<Helmet {...rewind()} />).slice(5, -6)
      resolve({html, head, state})
    }
    count++
  }, delay)
})

export default renderReact
