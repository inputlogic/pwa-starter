import W from 'wasmuth'
import Preact from 'preact'

import paginationRange from '/util/paginationRange'
import updateQuery from '/util/updateQuery'

import './style.less'

const pageBuilder = page => updateQuery({page})

export default class Pagination extends Preact.Component {
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
