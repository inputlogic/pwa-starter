import { useMappedState as useMS } from '@app-elements/use-mapped-state'
import { useRequest as useR } from '@app-elements/use-request'
import { useStorePath as useSP } from '@app-elements/use-store-path'

import { store } from './index'

export function useMappedState (mapper) {
  const mappedState = useMS(store, mapper)
  return mappedState
}

export function useRequest (endpoint, options = {}) {
  const request = useR(store, endpoint, options = {})
  return request
}

export function useStorePath (path) {
  const pair = useSP(store, path)
  return pair
}
