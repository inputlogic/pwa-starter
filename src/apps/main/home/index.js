import { setState } from '/store'
import Avatar from '@app-elements/avatar'
import Carousel from '@app-elements/carousel'
import Image from '@app-elements/image'
import LoadingIndicator from '@app-elements/loading-indicator'

import { ElementHolder } from '/elements/element-holder'
import { Input } from '/elements/input'
import { TextArea } from '/elements/textarea'
import { Radio } from '/elements/radio'
import { Checkbox } from '/elements/checkbox'
import { Select } from '/elements/select'

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
            <li><a data-external-link href='#Button'>Button</a></li>
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
                fullName='Chris Smith'
                size='170'
              />
              <Avatar
                fullName='Chris Smith'
                size='170'
              />
            </div>
          </ElementHolder>

          <ElementHolder heading='Button'>
            <div className='button-group'>
              <button className='btn'>Primary</button>
              <button className='btn btn-secondary'>Secondary</button>
              <button className='btn btn-ghost'>Ghost</button>
              <button className='btn btn-text'>Text</button>

            </div>
          </ElementHolder>

          <ElementHolder heading='Carousel'>

            <Carousel withDots>

              <Image
                srcs={[
                  'https://source.unsplash.com/WLUHO9A_xik/200x133',
                  'https://source.unsplash.com/WLUHO9A_xik/1200x800'
                ]}
              />

              <Image
                srcs={[
                  'https://source.unsplash.com/WLUHO9A_xik/200x133',
                  'https://source.unsplash.com/WLUHO9A_xik/1200x800'
                ]}
              />

            </Carousel>

          </ElementHolder>

          <ElementHolder heading='Form'>
            <form>
              <Input label='Text Input' />
              <Select name='select' label='Select'>
                <option value='volvo'>Volvo</option>
                <option value='saab'>Saab</option>
                <option value='mercedes'>Mercedes</option>
                <option value='audi'>Audi</option>
              </Select>
              <TextArea label='Textarea' />

              <div className='form-row'>
                <Radio label='Yes' name='name' id='cool' value='cool' />
                <Radio label='No' name='name' id='cool1' value='cool1' />
              </div>
              <Checkbox label='Checkbox' name='nameo' id='x1' value='v3' />
            </form>
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
