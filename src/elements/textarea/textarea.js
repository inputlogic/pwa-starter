import './textarea.less'

export const TextArea = ({ name, value, label, placeholder, rows = '5', ...props }) =>
  <div className='textarea-component'>
    {label && <label>{label}</label>}
    <textarea
      rows={rows}
      name={name}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  </div>
