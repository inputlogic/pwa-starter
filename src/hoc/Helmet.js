import Preact from 'preact'
import Portal from 'preact-portal'

import {setState} from '/store'

let allProps = {}

export const rewind = () => allProps

const getCount = (nodeName, nodeList) => {
  let count = 0
  for (var x = 0; x < nodeList.length; x++) {
    if (nodeList[x].nodeName === nodeName) {
      count++
    }
  }
  return count
}

const Wrapper = ({children}) => {
  if (typeof window !== 'undefined') {
    const nodeList = document.querySelectorAll('[data-helmet]')
    for (let x = nodeList.length - 1; x >= 0; x--) {
      // const k = nodeList[x].getAttribute('property') || nodeList[x].getAttribute('name')
      // const counterpart = W.find(
      //   c => (c.attributes.property || c.attributes.name) === k,
      //   children
      // )
      if (nodeList[x].nodeName === 'TITLE') {
        const count = getCount('TITLE', nodeList)
        if (count) {
          nodeList[x].remove()
        }
      }
    }
    return <Portal into='head'>{children}</Portal>
  } else {
    return <div>{children}</div>
  }
}

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

  _getTitle (props) {
    const {title, titleTemplate = '%s', defaultTitle} = {...allProps, ...props}
    return titleTemplate.replace('%s', title || defaultTitle || '')
  }

  _getMeta ({meta = []}) {
    return meta.map(({name, property, content}) =>
      <meta
        name={name}
        property={property}
        content={content}
        data-helmet
      />
    )
  }

  render () {
    return (
      <Wrapper>
        <title data-helmet>{this._getTitle(this.props)}</title>
        {this._getMeta(this.props)}
      </Wrapper>
    )
  }
}
