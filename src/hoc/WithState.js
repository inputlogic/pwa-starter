import Preact from 'preact'
import equal from '/util/equal'
import {getState, subscribe, unsubscribe} from '/store'

// **WithState** let's you create Component's that rerender when a specified
// part of the global state changes.

// You could do this manually, as described in [store.js](/store.html), but
// this abstracts away the performance logic of `shouldComponentUpdate`.

// That said, this is still not the most-performant implementation, and any
// Component that experiences performance issues may need more work done
// within `shouldComponentUpdate` to be accetable.

// `WithState` can be used as a HoC, or extended as a Class.

// To use as a HoC:

// ```
// <WithState mapper={({clicks}) => ({clicks})}>
//  {({clicks}) =>
//     <p>You have clicked {clicks || 0} times.</p>
//   }
// </WithState>
// ```

// And to extend into your own class:

// ```
// class ClicksCount extends WithState {
//   render () {
//     const {clicks} = this.state._mappedState
//     return (
//       <p>You have clicked {clicks || 0} times.</p>
//     )
//   }
// }
// ClicksCount.defaultProps = {mapper: ({clicks}) => ({clicks})}
// ```

export default class WithState extends Preact.Component {
  constructor (props) {
    super(props)
    const state = subscribe(this)
    this.state = {...state, _mappedState: props.mapper(state, props)}
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
