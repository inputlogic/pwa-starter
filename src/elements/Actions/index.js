import loadImage from '/util/loadImage'
import {set} from '/store'

export default () =>
  <div className='actions layout-center'>
    <div class='file-input'>
      <input type='file' id='input-photo' accept='image/*' onChange={onPhotoInputChange} />
      <label for='input-photo'>+</label>
    </div>
  </div>

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

  loadImage(ev.target.files[0], result => {
    if (result.type === 'error') {
      console.error('Error loading image', result)
    } else {
      console.log('Generated canvas width and height', result, result.width, result.height)
      set('newImage', result)
    }
  }, options)
}
