import W from 'wasmuth'
import Preact from 'preact'

import './style.less'

const isInViewport = function (element) {
  if (typeof document === 'undefined') {
    return false
  }
  const rect = element.getBoundingClientRect()
  const html = document.documentElement
  return (
    rect.bottom <= (window.innerHeight || html.clientHeight)
  )
}

let imageComponents = []

if (typeof document !== 'undefined') {
  document.addEventListener('scroll', () => {
    if (!imageComponents.length) return
    imageComponents.forEach(i => {
      if (isInViewport(i.base)) {
        i.loadImage()
      }
    })
  }, true)
}

export default class Image extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      error: false
    }
  }

  loadImage () {
    if (typeof document !== 'undefined') {
      const img = document.createElement('img')
      img.onload = () => {
        this.setState({loaded: true})
        this.removeSelf(img)
      }
      img.onerror = () => {
        this.setState({error: true})
        this.removeSelf(img)
      }
      img.src = this.props.src
    }
  }

  removeSelf (img) {
    if (img) {
      img.remove()
    }
    if (imageComponents.includes(this)) {
      imageComponents = W.reject(i => i === this, imageComponents)
    }
  }

  componentDidMount () {
    imageComponents.push(this)

    if (isInViewport(this.base)) {
      this.loadImage()
    }
  }

  componentWillUnmount () {
    this.removeSelf()
  }

  render (
    {src, unloadedSrc = '/images/blank-poster.gif', className, ...props},
    {error, loaded}
  ) {
    if (error) {
      return <img src={unloadedSrc} className={className} {...props} />
    } else if (!loaded) {
      return <img src={unloadedSrc} className={`${className} image-loading`} {...props} />
    } else {
      return <img src={src} className={`${className} image-ready`} {...props} />
    }
  }
}
