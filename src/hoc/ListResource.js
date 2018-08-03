import W from 'wasmuth'

import WithRequest from '/hoc/WithRequest'

const OK_TYPES = ['function', 'object']

export default function ListResource ({list = true, endpoint, children}) {
  const Child = children[0]
  const type = typeof Child
  if (!Child || !OK_TYPES.includes(type)) {
    throw new Error('ListResource requires a function or Component as its only child')
  }
  const func = type === 'function' ? Child : props => <Child {...props} />
  return (
    <WithRequest request={{endpoint}}>
      {({result, isLoading}) =>
        isLoading
          ? <p>Loading...</p>
          : <div>
            {list ? W.map(func, result) : func({...result})}
          </div>}
    </WithRequest>
  )
}
