/* eslint-disable */

import { createElement } from 'react'

global.createElement = createElement
window.isJest = true

jest.mock('/consts')
