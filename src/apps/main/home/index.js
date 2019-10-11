import { setState } from '/store'

export default function Home () {
  const openModal = (ev) => {
    ev.preventDefault()
    setState({ modal: 'ExampleModal' })
  }
  return (
    <div>
      <h1>PWA Starter</h1>
      <p>
        <button onClick={openModal}>Open Modal</button>
      </p>
      <img
        src='https://camo.githubusercontent.com/974ab5e63b58eb0bb51ca21eb1b047e64ee0ea6d/68747470733a2f2f692e696d6775722e636f6d2f6b4a37673457472e6a7067'
        alt='PWA Starter'
      />
    </div>
  )
}
