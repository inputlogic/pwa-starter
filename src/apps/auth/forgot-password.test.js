/* eslint-disable */

jest.mock('@app-elements/use-form')

import { render } from 'react-dom'
import { useForm } from '@app-elements/use-form'
import { RouteProvider } from '@app-elements/router'

import { ForgotPassword } from './forgot-password.js'
import { routes } from './index.js'

const { useForm: useFormOrig } = jest.requireActual('@app-elements/use-form')

test('ForgotPassword exports', () => {
  expect(typeof ForgotPassword).toBe('function')
})

test('ForgotPassword should submit with data', () => { 
  // Mock useForm, so it doesn't submit and hit an endpoint
  // as we don't want to test the endpoint here.
  const submit = jest.fn(ev => ev.preventDefault())
  useForm.mockImplementation(input => {
    const ret = useFormOrig(input)
    ret.submit = submit
    return ret
  })

  render(
    <RouteProvider routes={routes}>
      <ForgotPassword />
    </RouteProvider>,
    document.body
  )

  const form = document.body.querySelector('form')
  const email = document.body.querySelector('input[name="email"]')

  expect(form).toBeDefined()
  expect(email).toBeDefined()
  expect(submit).not.toBeCalled()

  email.value = 'me@example.org'
  form.submit()

  expect(submit).toBeCalled()
})

