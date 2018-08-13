import Preact from 'preact'
import {setState} from '/store'

// // Watch for an open modal, if so add a class to body to prevent
// // scrolling behind the modal.
// if (typeof document !== 'undefined') {
//   watchPath(['modal'], (modal, oldmodal) => {
//     if (modal && modal !== oldmodal) {
//       document.body.classList.add('modal-open')
//     } else {
//       document.body.classList.remove('modal-open')
//     }
//   })
// }

// // Watch for URL change, if so close all modals.
// watchPath(['route'], (route, oldRoute = {}) => {
//   if (route.name && oldRoute.name && route.name !== oldRoute.name) {
//     dispatch(set('modal', null))
//   }
// })

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
