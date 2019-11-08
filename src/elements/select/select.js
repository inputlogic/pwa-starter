import './select.less'

export const Select = ({ name, label, children, ...props }) =>
  <div className='select-wrap'>
    {label && <label>{label}</label>}
    <div className='select'>
      <select name={name} {...props}>
        {children}
      </select>
    </div>
  </div>
