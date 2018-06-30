import WithRequests from '/hoc/WithRequests'

const OK_TYPES = ['function', 'object']

export default ({url, children}) => {
  const Child = children[0]
  const type = typeof Child
  if (!Child || !OK_TYPES.includes(type)) {
    throw new Error('ListResource requires a function or Component as its only child')
  }
  const func = type === 'function'
    ? Child
    : props => <Child {...props} />
  return (
    <WithRequests requests={{results: {url}}}>
      {({results = [], isLoading}) =>
        isLoading
          ? <p>Loading...</p>
          : <div>
            {results.map(func)}
          </div>}
    </WithRequests>
  )
}
