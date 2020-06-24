import { useRouter } from '@app-elements/router'

export function NotFound () {
  const { route } = useRouter()
  if (route && route.notFound) {
    return (
      <div className='container pt-10'>
        Not Found :(
      </div>
    )
  }
}
