import Preact from 'preact'
import Portal from 'preact-portal'

import {setState} from '/store'

let allProps = {}

export const rewind = () => allProps

const Wrapper = ({children}) =>
  typeof window !== 'undefined'
    ? <Portal into='head'>{children}</Portal>
    : <div>{children}</div>

export default class Helmet extends Preact.Component {
  constructor (props) {
    super(props)
    this._sync(props)
  }

  componentDidUpdate () {
    this._sync(this.props)
  }

  _sync (props) {
    allProps = {...allProps, ...props}
    setState({helmet: {
      title: this._getTitle(props)
    }})
  }

  _getTitle ({title, titleTemplate = '%s', defaultTitle}) {
    return titleTemplate.replace('%s', title || defaultTitle || '')
  }

  _getMeta ({meta = []}) {
    return meta.map(({name, property, content}) =>
      <meta
        name={name}
        property={property}
        content={content}
      />
    )
  }

  render () {
    return (
      <Wrapper>
        <title>{this._getTitle(this.props)}</title>
        {this._getMeta(this.props)}
      </Wrapper>
    )
  }
}
