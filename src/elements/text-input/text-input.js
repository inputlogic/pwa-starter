import './text-input.less'

export const TextInput = ({
  type = 'text',
  name,
  value,
  label,
  placeholder,
  variant,
  title,
  ...props
}) =>
  <div className={`input-component ${variant || ''}`}>
    {label && <label htmlFor={name}>{label}</label>}

    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      {...props}
    />

    {title && (
      <span className='field-hint is-error'>
        {title}
      </span>
    )}
  </div>
