import qs from '/util/qs'

export default function updateQuery (queries) {
  const existingParams = qs.parse(window.location.search)
  return window.location.pathname + `?${qs.stringify({...existingParams, ...queries})}`
}
