import loadImage from '/util/loadImage'
import WithState from '/hoc/WithState'
import {setState} from '/store'

export default () =>
  <WithState mapper={({newImage}) => ({newImage})}>
    {({newImage}) =>
      newImage
        ? <div className='actions layout-center'>
          <button>x</button>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <button>✓</button>
        </div>
        : <div className='actions layout-center'>
          <div class='file-input'>
            <input type='file' id='input-photo' accept='image/*' onChange={onPhotoInputChange} />
            <label for='input-photo'>+</label>
          </div>
        </div>
    }
  </WithState>

function onPhotoInputChange (ev) {
  if (!ev.target.files || !ev.target.files.length) {
    console.error('Missing files!', ev)
    return
  }

  loadImage(ev.target.files[0], (err, newImage) => {
    if (err) {
      console.error('Error loading image', err, newImage)
    } else {
      console.log('loadImage', ev.target.files[0])
      setState({newImage})
    }
  })
}
