export default function paginationRange (current, numPages, delta = 1) {
  if (numPages <= 1) return [1]

  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []

  range.push(1)

  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < numPages && i > 1) {
      range.push(i)
    }
  }

  range.push(numPages)

  let count
  for (let i of range) {
    if (count) {
      if (i - count === delta - 1) {
        rangeWithDots.push(count + 1)
      } else if (i - count !== 1) {
        rangeWithDots.push(null)
      }
    }
    rangeWithDots.push(i)
    count = i
  }

  // if at first or last page, pad range so there are at least 4 options
  // if `numPages` permits it.
  if (numPages >= 4 && rangeWithDots.length === 4) {
    if (current === numPages) {
      return [
        ...rangeWithDots.slice(0, 2),
        ...[numPages - 2],
        ...rangeWithDots.slice(-2)
      ]
    } else if (current === 1) {
      return [
        ...rangeWithDots.slice(0, 2),
        ...[current + 2],
        ...rangeWithDots.slice(-2)
      ]
    }
  }

  return rangeWithDots
}
