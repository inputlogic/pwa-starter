import WithRequest from '/hoc/WithRequest'

const OK_TYPES = ['function', 'object']

export default ({list = true, url, children}) => {
  const Child = children[0]
  const type = typeof Child
  if (!Child || !OK_TYPES.includes(type)) {
    throw new Error('ListResource requires a function or Component as its only child')
  }
  const func = type === 'function' ? Child : props => <Child {...props} />
  return (
    <WithRequest request={{url}}>
      {({result, isLoading}) =>
        isLoading
          ? <p>Loading...</p>
          : <div>
            {list ? result.map(func) : func({...result})}
          </div>}
    </WithRequest>
  )
}
