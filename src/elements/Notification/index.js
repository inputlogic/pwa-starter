import Preact from 'preact'

import './style.less'

let ref

export function showNotification (notification) {
  ref && ref.setState({...ref.state, ...notification, open: true})
}

export default class Notification extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = {open: false, message: null, type: 'error', length: 3000}
  }

  componentDidUpdate () {
    console.log('componentDidUpdate', this.state)
    if (this.state.message) {
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(
        () => this.timeout && this.setState({open: false}),
        this.state.length
      )
    }
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
  }

  render (_, {open, message, type}) {
    if (!ref) ref = this
    if (!message) return null
    console.log('!!!!', {message})
    return (
      <div className={`notification-bar ${type} ${open ? 'open' : 'close'}`}>
        <span className='text'>
          {message}
        </span>
        <div className='close-icon' onClick={this.onClose} />
      </div>
    )
  }
}
