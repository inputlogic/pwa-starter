import { useEffect, useRef } from 'react'

import store from '/store'

import './element-holder.less'

function debounce (func, wait) {
  let timeout
  return function () {
    const args = arguments
    const later = () => {
      timeout = null
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function isElementVisible (el) {
  const rect = el.getBoundingClientRect()
  const vWidth = window.innerWidth || document.documentElement.clientWidth
  const vHeight = window.innerHeight || document.documentElement.clientHeight
  const efp = (x, y) => document.elementFromPoint(x, y)

  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0 ||
      rect.left > vWidth || rect.top > vHeight) {
    return false
  }

  // Return true if any of its four corners are visible
  return (
    el.contains(efp(rect.left, rect.top + window.innerHeight / 2)) ||
    el.contains(efp(rect.right, rect.top + window.innerHeight / 2)) ||
    el.contains(efp(rect.right, rect.bottom)) ||
    el.contains(efp(rect.left, rect.bottom))
  )
}

let refs = []

if (typeof document !== 'undefined') {
  document.addEventListener('scroll', debounce(() => {
    if (!refs.length) return
    window.requestAnimationFrame(() => {
      refs.forEach(r => {
        if (isElementVisible(r)) {
          if (r.id !== store.getState().currentHash) {
            store.setState({ currentHash: r.id })
            window.location.hash = '#' + r.id
          }
        }
      })
    })
  }, 150), true)
}

export const ElementHolder = ({ heading, children }) => {
  const ref = useRef(null)
  useEffect(() => {
    refs.push(ref.current)
    if (ref.current && isElementVisible(ref.current)) {
      window.location.hash = '#' + heading
      store.setState({ currentHash: heading })
    }
    return () => {
      if (refs.includes(ref.current)) {
        refs = refs.filter(ref => ref !== ref.current)
      }
    }
  }, [])
  return (
    <div id={heading} className='element-holder' ref={ref}>
      <div className='inside'>
        <h2>{heading}</h2>
        {children}
      </div>
    </div>
  )
}
