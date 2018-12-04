import render from 'preact-render-to-string'

import Helmet, {rewind} from '@app-elements/helmet'

import {RootApp} from '/index'
import store from '/store'

const {getState, setState} = store

export const renderReact = (url) => new Promise((resolve, reject) => {
  setState({currentPath: url})
  render(<RootApp />) // Render, to register pendingRequests

  const maxTime = 6000
  const delay = 1
  let count = 0
  let id = setInterval(() => {
    const pending = getState().pendingRequests
    if (!pending || count * delay >= maxTime) {
      clearInterval(id)
      const state = JSON.stringify(getState())
      // Rerender html again, now that pendingRequests are done
      const html = render(<RootApp />)
      const head = render(<Helmet {...rewind()} />).slice(5, -6)
      resolve({html, head, state})
    }
    count++
  }, delay)
})

export default renderReact
