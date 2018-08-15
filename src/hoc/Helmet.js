import W from 'wasmuth'
import Preact from 'preact'

let refs = []

export const rewind = () => {
  const res = W.reduce((acc, el) => W.merge(acc, el.props), {}, refs)
  return res
}

const Wrapper = ({children}) => {
  if (typeof window !== 'undefined') {
    const titleChild = W.find(({nodeName}) => nodeName === 'title', children)
    if (titleChild) {
      const title = titleChild.children[0]
      if (title !== document.title) {
        document.title = title
      }
    }
    return null
  } else {
    return <div>{children}</div>
  }
}

export default class Helmet extends Preact.Component {
  constructor (props) {
    super(props)
    refs.push(this)
  }

  componentWillUnmount () {
    const newRefs = W.reject(c => c === this, refs)
    refs = newRefs
    document.title = this._getTitle({})
  }

  _getTitle (props) {
    const {title, titleTemplate = '%s', defaultTitle} = {...rewind(), ...props}
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
        <title data-helmet='true'>{this._getTitle(this.props)}</title>
        {this._getMeta(this.props)}
      </Wrapper>
    )
  }
}
