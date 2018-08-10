import W from 'wasmuth'
import Preact from 'preact'

export default class Carousel extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = {active: this.props.active || 0, width: 0}
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.setActive = this.setActive.bind(this)
    this.getRef = this.getRef.bind(this)
    this.getStyle = this.getStyle.bind(this)
    this.getSlidesStyle = this.getSlidesStyle.bind(this)
  }

  next (ev) {
    ev.preventDefault()
    const active = this.state.active + this.state.numFit
    const n = active >= this.props.children.length - 1
      ? 0
      : this.state.active + 1
    this.setState({active: n})
  }

  prev (ev) {
    ev.preventDefault()
    const n = this.state.active <= 0
      ? this.props.children.length - (this.state.numFit + 1)
      : this.state.active - 1
    this.setState({active: n})
  }

  setActive (active) {
    return ev => {
      ev.preventDefault()
      this.setState({active})
    }
  }

  getRef (ref) {
    if (!ref || this.ref) return
    this.ref = ref
    window.requestAnimationFrame(() => {
      const width = this.ref.offsetWidth
      const parent = this.ref.parentNode
      const parentWidth = parent.offsetWidth
      const numFit = parent != null
        ? Math.max(0, Math.floor(parent.offsetWidth / width) - 1)
        : 0
      this.setState({width, parentWidth, numFit})
    })
  }

  getStyle (idx, active) {
    const {parentWidth, width} = this.state
    const style = parentWidth != null
      ? `width: ${parentWidth}px;`
      : ''
    if (active === 0 || idx >= active) {
      return style
    }
    return `${style} margin-left: -${width}px;`
  }

  getSlidesStyle () {
    return `width: ${this.state.parentWidth * this.props.children.length}px;`
  }

  render ({
    children,
    className = 'carousel-slide',
    noNav = false,
    withDots = false,
    wrapperClass = ''
  }) {
    const {active} = this.state
    return (
      <div className={`carousel ${wrapperClass}`}>
        <div>
          <div className='carousel-inner'>
            {!noNav &&
              <nav className='nav prev'>
                <button onClick={this.prev} />
              </nav>}
            <div className='slides-wrapper'>
              <div className='slides' style={this.getSlidesStyle()}>
                {W.map((c, idx) =>
                  <div
                    ref={(ref) => idx === 0 && this.getRef(ref)}
                    style={this.getStyle(idx, active)}
                    class={`${className}${idx === active ? ' active' : ''}`}
                  >{c}</div>,
                children)}
              </div>
            </div>
            {!noNav &&
              <nav className='nav next'>
                <button onClick={this.next} />
              </nav>}
          </div>
          {withDots &&
            <div className='level carousel-dots'>
              {W.map(i =>
                <button
                  onClick={this.setActive(i)}
                  className={`${i === active ? 'active' : ''}`}
                >
                  {i}
                </button>,
              W.range(0, children.length))}
            </div>}
        </div>
      </div>
    )
  }
}
