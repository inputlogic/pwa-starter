const $ = window

// The check for URL.revokeObjectURL fixes an issue with Opera 12,
// which provides URL.createObjectURL but doesn't properly implement it:
const urlAPI =
  ($.createObjectURL && $) ||
  ($.URL && $.URL.revokeObjectURL && $.URL) ||
  ($.webkitURL)

const createObjectURL = file =>
  urlAPI ? urlAPI.createObjectURL(file) : false

const revokeHelper = img => {
  if (img._objectURL) {
    urlAPI && urlAPI.revokeObjectURL(img._objectURL)
    delete img._objectURL
  }
}

const readFile = (file, callback, method) => {
  if ($.FileReader) {
    const fileReader = new $.FileReader()
    fileReader.onload = fileReader.onerror = callback
    method = method || 'readAsDataURL'
    if (fileReader[method]) {
      fileReader[method](file)
      return fileReader
    }
  }
  return false
}

// Loads an image for a given File object. And returns an <img> element
export default function loadImage (file, callback) {
  const url = createObjectURL(file)
  const img = document.createElement('img')
  img._objectURL = url
  img.onerror = (ev) => {
    revokeHelper(img)
    callback && callback(ev, img)
  }
  img.onload = (event) => {
    revokeHelper(img)
    callback && callback(null, img)
  }
  if (url) {
    img.src = url
    return img
  } else {
    return readFile(file, ev => {
      const target = ev.target
      if (target && target.result) {
        img.src = target.result
      } else if (callback) {
        callback(ev, img)
      }
    })
  }
}
