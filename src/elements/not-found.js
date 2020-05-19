import { useMappedState } from '@app-elements/use-mapped-state'

export function NotFound () {
  const currentRoute = useMappedState(
    this.context.store, ({ currentRoute }) => currentRoute)

  if (!currentRoute) {
    return (
      <div className='container pt-10'>
        Not Found :(
      </div>
    )
  }
}
