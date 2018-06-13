import Preact from 'preact'

import WithState from '/hoc/WithState'

class Canvas extends Preact.Component {
  componentDidUpdate () {
    const img = this.props.img

    // Load Image
    const canvas = document.getElementById('camera-canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    // Size Drawing Canvas over top of Image
    const drawCanvas = document.getElementById('draw-canvas')
    const newWidth = img.style.width ? parseInt(img.style.width) : img.width
    const newHeight = img.style.height ? parseInt(img.style.height) : img.height
    drawCanvas.width = newWidth
    drawCanvas.height = newHeight
    drawCanvas.setAttribute(
      'style',
      `left: calc(50% - ${drawCanvas.width / 2}px); top: calc(50% - ${drawCanvas.height / 2}px)`
    )
  }

  render ({img}) {
    console.log('!', img)
    return <div class='page'>
      <div class='layer' id='camera-canvas-wrapper'>
        <canvas id='camera-canvas' />
      </div>
      <div class='layer'>
        <canvas id='draw-canvas' />
      </div>
    </div>
  }
}

export default () =>
  <WithState mapper={({newImage}) => ({newImage})}>
    {({newImage}) => <Canvas img={newImage} />}
  </WithState>
