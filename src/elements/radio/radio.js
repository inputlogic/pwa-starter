import './radio.less'

export const Radio = ({ id, name, value, formName, label, ...props }) =>
  <div className='radio-component'>
    <input type='radio' name={name} value={value} id={id} {...props} />
    <label for={id}>{label}</label>
  </div>
