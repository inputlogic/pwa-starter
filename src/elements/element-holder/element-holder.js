import './element-holder.less'

export const ElementHolder = ({ heading, children }) =>
  <div id={heading} className='element-holder'>

    <div className='inside'>
      <h2>{heading}</h2>
      {children}
    </div>

  </div>
