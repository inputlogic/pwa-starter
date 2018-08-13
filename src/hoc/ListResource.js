import W from 'wasmuth'
import Preact from 'preact'

import WithRequest from '/hoc/WithRequest'
import WithState from '/hoc/WithState'

import paginationRange from '/util/paginationRange'
import qs from '/util/qs'
import updateQuery from '/util/updateQuery'

const OK_TYPES = ['function', 'object']

const pageBuilder = page => updateQuery({page})

class Pagination extends Preact.Component {
  render ({activePage, pageSize, request}) {
    const {count, next, previous} = request
    if (!count || count < pageSize) {
      return
    }

    const numPages = Math.ceil(count / pageSize)
    const pages = paginationRange(activePage, numPages)

    return (
      <nav class='pagination'>
        {previous
          ? <a href={pageBuilder(activePage - 1)} >
            <span className='arrow back' /> Back
          </a>
          : <span className='disabled' >
            <span className='arrow back' /> Back
          </span>
        }
        <ul>
          {W.map(
            (page, index) => page
              ? <li key={`page-${page}`}>
                <a href={pageBuilder(page)} className={activePage === page ? 'active' : ''} >
                  {page}
                </a>
              </li>
              : <li key={`break-${index}`}>&hellip;</li>,
            pages
          )}
        </ul>
        {next
          ? <a href={pageBuilder(activePage + 1)} >
            Next <span className='arrow next' />
          </a>
          : <span className='disabled' >
            Next <span className='arrow next' />
          </span>
        }
      </nav>
    )
  }
}

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

    const args = qs.parse(window.location.search)
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
            : <div>
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
