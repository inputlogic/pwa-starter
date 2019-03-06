import { h, Component } from 'preact'

const asyncComponent = getComponent => {
  class AsyncComponent extends Component {
    componentWillMount () {
      getComponent().then(component => {
        this.setState({ componentData: component })
      })
    }

    render () {
      if (this.state.componentData) {
        return h(this.state.componentData, this.props)
      } else if (this.props.loading) {
        return this.props.loading()
      }
      return null
    }
  }

  return AsyncComponent
}

export default asyncComponent
