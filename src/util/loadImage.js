const $ = window

// Loads an image for a given File object. And returns an <img> element
export default function loadImage (file, callback) {
  let img = document.createElement('img')
  let url
  img.onerror = function (event) {
    return loadImage.onerror(img, event, file, callback)
  }
  img.onload = function (event) {
    return loadImage.onload(img, event, file, callback)
  }
  url = img._objectURL = loadImage.createObjectURL(file)
  if (url) {
    img.src = url
    return img
  }
  return loadImage.readFile(file, function (e) {
    let target = e.target
    if (target && target.result) {
      img.src = target.result
    } else if (callback) {
      callback(e)
    }
  })
}
// The check for URL.revokeObjectURL fixes an issue with Opera 12,
// which provides URL.createObjectURL but doesn't properly implement it:
let urlAPI =
  ($.createObjectURL && $) ||
  ($.URL && $.URL.revokeObjectURL && $.URL) ||
  ($.webkitURL)

function revokeHelper (img) {
  if (img._objectURL) {
    loadImage.revokeObjectURL(img._objectURL)
    delete img._objectURL
  }
}

loadImage.isInstanceOf = function (type, obj) {
  // Cross-frame instanceof check
  return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}

loadImage.transform = function (img, callback, file, data) {
  callback(img, data)
}

loadImage.onerror = function (img, event, file, callback) {
  revokeHelper(img)
  if (callback) {
    callback.call(img, event)
  }
}

loadImage.onload = function (img, event, file, callback) {
  revokeHelper(img)
  if (callback) {
    loadImage.transform(img, callback, file, {})
  }
}

loadImage.createObjectURL = function (file) {
  return urlAPI ? urlAPI.createObjectURL(file) : false
}

loadImage.revokeObjectURL = function (url) {
  return urlAPI ? urlAPI.revokeObjectURL(url) : false
}

// Loads a given File object via FileReader interface,
// invokes the callback with the event object (load or error).
// The result can be read via event.target.result:
loadImage.readFile = function (file, callback, method) {
  if ($.FileReader) {
    let fileReader = new $.FileReader()
    fileReader.onload = fileReader.onerror = callback
    method = method || 'readAsDataURL'
    if (fileReader[method]) {
      fileReader[method](file)
      return fileReader
    }
  }
  return false
}
