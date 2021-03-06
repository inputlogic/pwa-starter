import { createElement, Component } from 'react'

export const asyncComponent = getComponent => {
  class AsyncComponent extends Component {
    componentWillMount () {
      getComponent().then(component => {
        this.setState({ componentData: component })
      })
    }

    render () {
      if (this.state.componentData) {
        return createElement(this.state.componentData, this.props)
      } else if (this.props.loading) {
        return this.props.loading()
      }
      return null
    }
  }

  return AsyncComponent
}
