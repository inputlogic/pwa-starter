/* eslint-disable */

jest.mock('@app-elements/use-form')

import { render } from 'react-dom'
import { useForm } from '@app-elements/use-form'
import { RouteProvider } from '@app-elements/router'

import { SignUp } from './signup.js'
import { routes } from './index.js'

const { useForm: useFormOrig } = jest.requireActual('@app-elements/use-form')

test('SignUp exports', () => {
  expect(typeof SignUp).toBe('function')
})

test('SignUp should render form', () => {
  useForm.mockImplementation(input => {
    const ret = useFormOrig(input)
    ret.submit = jest.fn(ev => ev.preventDefault())
    return ret
  })

  render(
    <RouteProvider routes={routes}>
      <SignUp />
    </RouteProvider>,
    document.body
  )

  const form = document.body.querySelectorAll('form')
  const inputs = document.body.querySelectorAll('input')

  expect(form.length).toBeGreaterThanOrEqual(1)
  expect(inputs.length).toBeGreaterThanOrEqual(2)
})

test('SignUp should submit with data', () => { 
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
      <SignUp />
    </RouteProvider>,
    document.body
  )

  const form = document.body.querySelector('form')
  const email = document.body.querySelector('input[name="email"]')
  const pass = document.body.querySelector('input[name="password"]')

  expect(form).toBeDefined()
  expect(email).toBeDefined()
  expect(pass).toBeDefined()
  expect(submit).not.toBeCalled()

  email.value = 'me@example.org'
  pass.value = 'test'
  form.submit()

  expect(submit).toBeCalled()
})

