import W from 'wasmuth'
import Preact from 'preact'
import Portal from 'preact-portal'

import WithState from '/hoc/WithState'

import {setState} from '/store'

import './style.less'

const isOverlay = (el) =>
  (el.classList && el.classList.contains('modal-container'))

export default class Modal extends Preact.Component {
  constructor (props) {
    super(props)
    this.onContainerClick = this.onContainerClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  onContainerClick (ev) {
    if (isOverlay(ev.target)) {
      this.props.onClose
        ? this.props.onClose()
        : setState({modal: null})
    }
  }

  closeModal () {
    this.props.onClose
      ? this.props.onClose()
      : setState({modal: null})
  }

  render ({className = '', children}) {
    return (
      <Portal into='body'>
        <div
          class={'modal-container ' + className}
          onClick={this.onContainerClick}
        >
          <div class='modal-content'>
            <div className='close' onClick={this.closeModal} >
              close
            </div>
            {children}
          </div>
        </div>
      </Portal>
    )
  }
}

export class Modals extends WithState {
  componentDidUpdate (_, prevState) {
    super.componentDidUpdate()
    const {modal} = this.state._mappedState
    const prevModal = W.path('_mappedState.modal', prevState)
    if (!modal) {
      if (prevModal != null) {
        document.body.classList.remove('modal-open')
      }
      return
    } else if (modal !== prevModal) {
      document.body.classList.add('modal-open')
    }

    const route = W.path('_mappedState.route.name', this.state)
    const prevRoute = W.path('_mappedState.route.name', prevState)
    if (route !== prevRoute) {
      setState({modal: null})
    }
  }

  render ({children}, {_mappedState}) {
    const {modal} = _mappedState
    const child = W.find(c => W.pathEq('nodeName.name', modal, c), children)
    return child
  }
}

Modals.defaultProps = {
  mapper: ({modal, route}) => ({modal, route})
}
