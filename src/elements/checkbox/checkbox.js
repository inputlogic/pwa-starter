import './checkbox.less'

export const Checkbox = ({
  id,
  name,
  value,
  formName,
  label,
  variant,
  ...props
}) =>
  <div className={`checkbox-component ${variant || ''}`}>
    <input type='checkbox' name={name} value={value} id={id} {...props} />
    <label for={id}>{label}</label>
  </div>
