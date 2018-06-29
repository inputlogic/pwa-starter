import loadImage from '/util/loadImage'
import WithState from '/hoc/WithState'
import {setState} from '/store'

export default () =>
  <WithState mapper={({newImage}) => ({newImage})}>
    {({newImage}) =>
      newImage
        ? null
        : <div className='actions layout-center'>
          <div class='file-input'>
            <input type='file' id='input-photo' accept='image/*' onChange={onPhotoInputChange} />
            <label for='input-photo'>+</label>
          </div>
        </div>
    }
  </WithState>

function onPhotoInputChange (ev) {
  const cameraCanvas = document.getElementById('camera-canvas')
  if (!cameraCanvas) {
    console.error('Could not find cameraCanvas!')
    return
  }

  console.log('Min width and height', cameraCanvas.width, cameraCanvas.height)

  const options = {
    maxWidth: cameraCanvas.width,
    maxHeight: cameraCanvas.height,
    contain: true,
    orientation: true,
    canvas: true,
    pixelRatio: window.devicePixelRatio
  }

  loadImage(ev.target.files[0], newImage => {
    if (newImage.type === 'error') {
      console.error('Error loading image', newImage)
    } else {
      console.log('Generated canvas width and height', newImage, newImage.width, newImage.height)
      setState({newImage})
    }
  }, options)
}
