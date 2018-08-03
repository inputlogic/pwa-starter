import React from 'react'
import makeRequest from '/util/makeRequest'

const isReactNative = window.navigator.product === 'ReactNative'

// children can be an array or object in React,
// but always array in Preact.
const compatMap = React.Children
  ? React.Children.map
  : (ls, fn) => Array.prototype.map.call(ls, fn)

// React method to skip textNodes, and Preact fallback.
const compatIsValid = React.isValidElement
  ? React.isValidElement
  : child => child.nodeName != null

// These are the component names that we will sync values
// to our parent Form state.
// @TODO: This should be props passed into <Form />
const formFieldNames = [
  // Our ReactNative 'form' components
  'InputIcon',
  'InputText'
]

const getNodeName = child =>
  child.type ? child.type.displayName : child.nodeName.name

const getProps = child => child.attributes || child.props || {}

// Is one of the above defined form fields, and has a `name`
// prop set. We can't sync state if the component doesn't have
// have a `name` prop set.
const isFormField = child =>
  formFieldNames.includes(getNodeName(child)) &&
  getProps(child).name != null

/**
 * Our Form Component
 *
 * Required Props:
 *
 *  name: A unique String identifer for your Form
 *
 * Optional Props:
 *
 *  initialData: An Object whose keys match formFieldNames and whose values will
 *  be set as defaults.
 *
 *  onSubmit: When the Form is submitted, this will be called with
 *  `{hasError, errors, data}`
 *
 * If you do not specify an `onSubmit` prop, you should specify a `action` and
 * optional `method` prop.
 *
 *  action: The URL to send the form data to.
 *  method: The HTTP method to use, defaults to GET.
 */
export default class Form extends React.Component {
  constructor (props) {
    super(props)
    if (!this.props.name) throw new Error('<Form /> Components needs a `name` prop.')
    this.state = {
      values: this.props.initialData || {},
      errors: {}
    }
    this._fields = {}
  }

  _updateChildFormFields (children, formName) {
    return compatMap(children, child => {
      if (!compatIsValid(child)) {
        return child
      }

      const childProps = child.attributes || child.props
      if (childProps.isSubmit) {
        // if has isSubmit flag, treat as Submit button on ReactNative
        child = React.cloneElement(child, {formName, onPress: () => this._onSubmit()})
      } else if (isFormField(child)) {
        // If one of our nested Form Fields, add syncState prop.
        // If not ReactNative, override the onChange event to sync value.
        const newProps = {
          formName,
          text: this.state.values[child.props.name],
          syncState: state => this.setState({values: {
            ...this.state.values,
            [childProps.name]: state.value || state.text
          }})
        }
        if (!isReactNative) {
          newProps.onChange = ev => this.setState({values: {
            ...this.state.values,
            [childProps.name]: ev.target.value
          }})
        }
        child = React.cloneElement(child, newProps)
        // Store a reference to our fields, so we can validate them on submit
        this._fields[childProps.name] = child
      } else if (child.children || child.props.children) {
        // Recursively search children for more form fields
        child = React.cloneElement(child, {
          formName,
          children: this._updateChildFormFields(
            child.children || child.props.children,
            formName
          )
        })
      }

      return child
    })
  }

  _onSubmit (ev) {
    ev && ev.preventDefault()
    const fieldNames = Object.keys(this._fields)

    // @TODO: More validations, allow props to set them, etc.
    const errors = fieldNames.reduce((errs, name) => {
      const comp = this._fields[name]
      if (getProps(comp).required && !this.state.values[name]) {
        errs[name] = 'Is required.'
      }
      return errs
    }, {})

    const hasError = Object.keys(errors).length > 0
    hasError && this.setState({errors: {...this.state.errors, ...errors}})

    if (this.props.onSubmit) {
      this.props.onSubmit({
        hasError,
        errors: errors,
        data: this.state.values
      })
    } else {
      const {xhr, promise} = makeRequest({
        endpoint: this.props.action,
        method: this.props.method,
        data: this.state.values
      })
      console.log('makeRequest', this.state.values)
      promise
        .then(r => this.props.onSuccess && this.props.onSuccess(r))
        .catch(_ => this.props.onFailure && this.props.onFailure(xhr))
    }
  }

  render () {
    const children = this._updateChildFormFields(
      this.children || this.props.children,
      this.props.name
    )
    return isReactNative
      ? children
      : <form
        id={`Form-${this.props.name}`}
        key={this.props.name}
        onSubmit={this._onSubmit.bind(this)}
      >
        {children}
      </form>
  }
}
