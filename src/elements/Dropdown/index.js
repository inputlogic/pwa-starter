import W from 'wasmuth'

import WithState from '/hoc/WithState'
import Level from '/elements/Level'

import {getState, setState} from '/store'

import './style.less'

const DEFAULT_PROPS = {
  mapper: ({dropdown}, {uid}) => {
    if (!uid) {
      console.warn('<Dropdown> must include a uid prop.')
    }
    return {
      isOpen: dropdown === uid
    }
  }
}

export default class Dropdown extends WithState {
  constructor (props) {
    super(props)
    this.state = {...this.state, isOpen: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (ev) {
    ev.preventDefault()
    const {isOpen} = this.state._mappedState
    setState({dropdown: isOpen ? null : this.props.uid})
  }

  render ({
    Trigger,
    buttonText = 'Select',
    noWrapper = false,
    children
  }) {
    const {isOpen} = this.state._mappedState
    console.log({isOpen})
    const cls = isOpen
      ? 'dropdown-menu open'
      : isOpen === false
        ? 'dropdown-menu close'
        : 'dropdown-menu'
    return (
      <div>
        {Trigger === undefined
          ? <button className='btn btn-dropdown black-ghost-btn' onClick={this.handleClick}>
            <Level noPadding>{buttonText}</Level>
          </button>
          : <Trigger className='btn-dropdown' onClick={this.handleClick} />}
        {noWrapper
          ? isOpen && children
          : <div className={cls}>
            <div class='dropdown-arrow' />
            {children}
          </div>}
      </div>
    )
  }
}

Dropdown.defaultProps = DEFAULT_PROPS

// DOM event to close all Dropdown's on off-click
const isDropdown = (el) =>
  (el.classList && el.classList.contains('dropdown-menu')) ||
  (el.classList && el.classList.contains('btn-dropdown'))

try {
  document.body.addEventListener('click', (ev) => {
    const activeDropdown = W.path('dropdown', getState())
    console.log({activeDropdown})
    if (!activeDropdown) {
      return
    }
    let el = ev.target
    if (isDropdown(el)) return
    while (el.parentNode) {
      el = el.parentNode
      if (isDropdown(el)) return
    }
    setState({dropdown: null})
  })
} catch (_) {}
