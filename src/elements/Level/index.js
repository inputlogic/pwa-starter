import './style.less'

const Level = ({
  children,
  ...props
}) =>
  <div {...props}>
    <div className='level'>
      {children}
    </div>
  </div>

export default Level
