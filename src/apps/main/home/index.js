import { setState } from '/store'
import Avatar from '@app-elements/avatar'
import Carousel from '@app-elements/carousel'
import LoadingIndicator from '@app-elements/loading-indicator'

import { ElementHolder } from '/elements/element-holder'

export default function Home () {
  const openModal = (ev) => {
    ev.preventDefault()
    setState({ modal: 'ExampleModal' })
  }
  return (
    <div className='container'>
      <div className='elements-wrapper'>
        <div className='legend'>
          <ul>
            <li><a data-external-link href='#Avatar'>Avatar</a></li>
            <li><a data-external-link href='#Carousel'>Carousel</a></li>
            <li><a data-external-link href='#Form'>Form</a></li>
            <li><a data-external-link href='#Loading'>Loading</a></li>
            <li><a data-external-link href='#Modal'>Modal</a></li>
            <li><a data-external-link href='#Dropdown'>Dropdown</a></li>
            <li><a data-external-link href='#Tooltip'>Tooltip</a></li>
          </ul>
        </div>
        <div className='elements-content'>

          <ElementHolder heading='Avatar'>
            <div className='row'>
              <Avatar
                src='/images/_temp/avatar.png'
                fullName='John Smith'
                size='170'
              />
              <Avatar
                fullName='John Smith'
                size='170'
              />
            </div>
          </ElementHolder>

          <ElementHolder heading='Carousel'>

            <Carousel withDots>
              <img src='https://source.unsplash.com/1600x900/?mountain' alt='' />
              <img src='https://source.unsplash.com/1600x900/?nature' alt='' />
              <img src='https://source.unsplash.com/1600x900/?water' alt='' />
              <img src='https://source.unsplash.com/1600x900/?river' alt='' />
              <img src='https://source.unsplash.com/1600x900/?creek' alt='' />
            </Carousel>

          </ElementHolder>

          <ElementHolder heading='Form'>
            cool
          </ElementHolder>

          <ElementHolder heading='Loading'>
            <LoadingIndicator />
          </ElementHolder>

          <ElementHolder heading='Modal'>
            <button className='btn' onClick={openModal}>Open Modal</button>
          </ElementHolder>

          <ElementHolder heading='Dropdown'>
            cool
          </ElementHolder>

          <ElementHolder heading='Tooltip'>
            cool
          </ElementHolder>

        </div>
      </div>
    </div>
  )
}
