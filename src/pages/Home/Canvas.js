import Preact from 'preact'

export default class Canvas extends Preact.Component {
  componentDidUpdate () {
    const img = this.props.img

    if (!img) return

    // Load Image
    const canvas = document.getElementById('camera-canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    const newWidth = img.style.width ? parseInt(img.style.width) : img.width
    const newHeight = img.style.height ? parseInt(img.style.height) : img.height

    canvas.setAttribute(
      'style',
      `width: ${newWidth}px; height: ${newHeight}px;`
    )

    // Size Drawing Canvas over top of Image
    const drawCanvas = document.getElementById('draw-canvas')
    drawCanvas.width = newWidth
    drawCanvas.height = newHeight
    drawCanvas.setAttribute(
      'style',
      `width: ${newWidth}px; height: ${newHeight}px;`
    )
  }

  render ({img}) {
    console.log('Canvas', img && img.width)
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
