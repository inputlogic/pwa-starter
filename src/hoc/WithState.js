import Preact from 'preact'
import equal from '/util/equal'
import {getState, subscribe, unsubscribe} from '/store'

export default class WithState extends Preact.Component {
  constructor (props) {
    super(props)
    const allState = subscribe(this)
    this.state = {...allState, _mappedState: props.mapper(allState, props)}
  }

  componentWillUnmount () {
    unsubscribe(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !equal(
      nextProps.mapper(nextState, nextProps),
      this.state._mappedState
    )
  }

  componentDidUpdate () {
    const _mappedState = this.props.mapper(getState(), this.props)
    if (!equal(_mappedState, this.state._mappedState)) {
      this.setState({_mappedState})
    }
  }

  render ({children}, {_mappedState}) {
    const child = children[0]
    if (!child || typeof child !== 'function') {
      throw new Error('WithState requires a function as its only child')
    }
    return child(_mappedState)
  }
}
