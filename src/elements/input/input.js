import { ErrorOrHint } from '@app-elements/form'

import './input.less'

export const Input = ({
  type = 'text',
  name,
  value,
  label,
  placeholder,
  variant,
  ...props
}) =>
  <div className={`input-component ${variant || ''}`}>

    {label &&
    <label htmlFor={name}>{label}</label>
    }

    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      {...props}
    />
    {props.formName != null &&
      <ErrorOrHint formName={props.formName} name={name} />
    }

  </div>
