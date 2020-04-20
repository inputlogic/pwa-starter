import Router from '@app-elements/router'

import url from '/util/url'

import Gallery from './gallery'

export const routes = {
  gallery: {
    path: url('gallery'),
    component: Gallery
  }
}

export default function GalleryApp () {
  return <Router routes={routes} />
}
