import { API_URL } from '/consts'

const xhr = window.XMLHttpRequest
const nativeOpen = xhr.prototype.open

// You may wish to show a notification, redirect to a new page, or reload all state.
const logout = () => {
  window.localStorage.removeItem('token')
  // window.location.reload()
}

xhr.prototype.open = function () {
  this.addEventListener('load', function () {
    if (this.responseURL.indexOf(API_URL) === -1) return
    switch (this.status) {
      case 401:
        console.warn('User token is no longer valid.', this.responseText)
        logout()
        break

      case 402:
        console.warn('User subscription is no longer valid.', this.responseText)
        break

      case 403:
        console.warn('User does not have permission.', this.responseText)
        break
    }
  })
  nativeOpen.apply(this, arguments)
}
