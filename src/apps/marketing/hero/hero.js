export function Hero ({ text, media, measure = 'measure-narrow' }) {
  return (
    <div className='hero'>
      <div className='level'>
        <div className={`text ${measure}`}>
          {text}
        </div>

        <div className='media'>
          {media}
        </div>
      </div>
    </div>
  )
}

export function ReverseHero ({ text, media, measure = 'measure-narrow' }) {
  return (
    <div className='hero'>
      <div className='level'>
        <div className='media'>
          {media}
        </div>

        <div className={`text ${measure}`}>
          {text}
        </div>
      </div>
    </div>
  )
}
