import W from 'wasmuth'

import WithRequest from '/hoc/WithRequest'
import WithState from '/hoc/WithState'

import Pagination from '/elements/Pagination'

import qs from '/util/qs'

const OK_TYPES = ['function', 'object']

export default class ListResource extends WithState {
  render ({
    children,
    endpoint,
    list = true,
    limit,
    pagination = false
  }) {
    const Child = children[0]
    const type = typeof Child
    if (!Child || !OK_TYPES.includes(type)) {
      throw new Error('ListResource requires a function or Component as its only child')
    }
    const func = type === 'function' ? Child : props => <Child {...props} />

    // @TODO: Needs to access search params on SSR
    const search = typeof window !== 'undefined' ? window.location.search : ''
    const args = qs.parse(search)
    const activePage = args.page ? parseInt(args.page, 10) : 1

    const request = {
      endpoint: limit != null
        ? `${endpoint}?limit=${limit}${activePage > 1 ? `&offset=${limit * activePage}` : ''}`
        : endpoint
    }
    return (
      <WithRequest request={request}>
        {({result, isLoading}) =>
          isLoading
            ? <p>Loading...</p>
            : <div key={request.endpoint}>
              {list ? W.map(func, W.pathOr(result, 'results', result)) : func({...result})}
              {pagination && limit != null
                ? <Pagination activePage={activePage} request={result} pageSize={limit} />
                : null
              }
            </div>
        }
      </WithRequest>
    )
  }
}

ListResource.defaultProps = {mapper: ({currentPath}) => ({currentPath})}
