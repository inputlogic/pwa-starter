// import W from 'wasmuth'
import render from 'preact-render-to-string'
import Helmet from 'preact-helmet'

import {getState, setState} from '/store'
import {MainApp} from '/index'

export const renderReact = (url) => new Promise((resolve, reject) => {
  setState({currentPath: url})
  render(<MainApp />) // Render, to register pendingRequests

  const helmet = Helmet.rewind()
  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `
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
      resolve({html: render(<MainApp />), head, state})
    }
    count++
  }, delay)
})

export default renderReact
