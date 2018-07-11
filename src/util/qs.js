const has = Object.prototype.hasOwnProperty

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
const decode = input => decodeURIComponent(input.replace(/\+/g, ' '))

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function parse (query) {
  const parser = /([^=?&]+)=?([^&]*)/g
  const result = {}
  let part

  while ((part = parser.exec(query)) != null) {
    const key = decode(part[1])

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue
    result[key] = decode(part[2])
  }

  return result
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function stringify (obj, prefix = '') {
  const pairs = []

  //
  // Optionally prefix with a '?' if needed
  //
  if (typeof prefix !== 'string') prefix = '?'

  for (let key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }
  }

  return pairs.length ? prefix + pairs.join('&') : ''
}

export default {
  stringify,
  parse
}
