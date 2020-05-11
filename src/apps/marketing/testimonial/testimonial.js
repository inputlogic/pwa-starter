import Avatar from '@app-elements/avatar'

import './testimonial.less'

export function Testimonial ({
  quote,
  attribution,
  avatarSrc = '/images/_temp/avatar.png',
  linkUrl
}) {
  return (
    <div className='testimonial'>
      <div className='level'>
        <Avatar src={avatarSrc} fullName={attribution} />
        <div className='quote'>{quote}</div>
      </div>
    </div>
  )
}
