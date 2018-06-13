import Preact from 'preact'
import {getState, subscribe} from '/store'

const equal = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2)

export default class WithState extends Preact.Component {
  constructor (props) {
    super(props)
    this.state = {_mappedState: props.mapper(getState(), props)}
  }

  componentDidMount () {
    const syncState = () => {
      const newProps = this.props.mapper(getState(), this.props)
      if (!equal(newProps, this.state._mappedState)) {
        this.setState({_mappedState: {...newProps}})
      }
    }
    this.unsubscribe = subscribe(syncState)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render ({children}, {_mappedState}) {
    const child = children[0]
    if (!child || typeof child !== 'function') {
      throw new Error('WithState requires a function as its only child')
    }
    return child(_mappedState)
  }
}
