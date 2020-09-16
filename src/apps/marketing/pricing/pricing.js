export function Pricing ({
  primary = false,
  title,
  subTitle,
  cost,
  perText,
  features = [],
  children
}) {
  return (
    <div className={`pricing${primary ? ' primary' : ''}`}>
      <div className='pricing-inner'>
        <h2 className='f3'>{title}</h2>
        <div className={`cost${isNaN(cost) ? ' is-nan' : ''}`}>{cost}</div>
        <div className='per-text'>{perText}</div>
        {subTitle && <p className='pricing-subtitle tc'>{subTitle}</p>}
        <ul className='pricing-features'>
          {features.map(text => <li>{text}</li>)}
        </ul>
        {children}
      </div>
    </div>
  )
}
