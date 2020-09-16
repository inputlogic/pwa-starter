import { Avatar } from '@app-elements/avatar'

export function Testimonial ({
  quote,
  attribution,
  avatarSrc = '/images/_temp/avatar.png',
  linkUrl
}) {
  return (
    <div className='testimonial'>
      <div className='level'>
        <Avatar src={avatarSrc} fullName={attribution} size='200' />
        <div className='text'>
          <div className='quote'>{quote}</div>
          {attribution && <div className='attribution'>{attribution}</div>}
        </div>
      </div>
    </div>
  )
}
