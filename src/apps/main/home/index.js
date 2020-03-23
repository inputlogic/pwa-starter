import { useMappedState } from '@app-elements/use-mapped-state'
import { showNotification } from '@app-elements/notification'

import Avatar from '@app-elements/avatar'
import Carousel from '@app-elements/carousel'
import { DatePicker, DateRangePicker } from '@app-elements/date-picker'
import Dropdown from '@app-elements/dropdown'
import Image from '@app-elements/image'
import LoadingIndicator from '@app-elements/loading-indicator'
import Tooltip from '@app-elements/tooltip'

import { Checkbox } from '/elements/checkbox'
import { Radio } from '/elements/radio'
import { Select } from '/elements/select'
import { TextArea } from '/elements/textarea'
import { TextInput } from '/elements/text-input'

import { ElementHolder } from './elements/element-holder'

import store from '/store'

import './home.less'

const anchors = [
  'Avatar',
  'Button',
  'Carousel',
  'Dropdown',
  'DatePicker',
  'DateRangePicker',
  'Form',
  'Loading',
  'Modal',
  'Notification',
  'Tooltip'
]

const Anchors = () => {
  const currentHash = useMappedState(store, ({ currentHash }) => currentHash)
  return (
    <ul>
      {anchors.map(anchor =>
        <li>
          <a
            data-external-link
            key={anchor}
            href={`#${anchor}`}
            onClick={(ev) => {
              ev.preventDefault()
              store.setState({ currentHash: anchor })
              window.location.hash = '#' + anchor
            }}
            className={`anchor ${currentHash === anchor ? 'active' : ''}`}
          >
            {anchor}
          </a>
        </li>
      )}
    </ul>
  )
}

export default function Home () {
  const {
    selectedDate,
    startDate,
    endDate
  } = useMappedState(store, state => ({
    selectedDate: state.selectedDate,
    startDate: state.startDate,
    endDate: state.endDate
  }))
  const onDateRange = ({ startDate, endDate }) => {
    if (startDate != null) {
      store.setState({ startDate: startDate.getTime() })
    } else if (endDate != null) {
      store.setState({ endDate: endDate.getTime() })
    } else if (startDate == null && endDate == null) {
      store.setState({ startDate, endDate })
    }
  }
  const openModal = (ev) => {
    ev.preventDefault()
    store.setState({ modal: 'ExampleModal' })
  }
  return (
    <div className='container'>
      <div className='elements-wrapper'>
        <div className='legend'>
          <Anchors />
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

          <ElementHolder heading='Dropdown'>
            <Dropdown uid='home-example'>
              <ul>
                <li><a href='#'>Account</a></li>
                <li><a href='#'>Settings</a></li>
                <li><a href='#'>Log Out</a></li>
              </ul>
            </Dropdown>
          </ElementHolder>

          <ElementHolder heading='DatePicker'>
            <div style={{ maxWidth: 400 }}>
              <DatePicker
                selectedDate={selectedDate}
                onChange={day => store.setState({ selectedDate: day.getTime() })}
              />
            </div>
          </ElementHolder>

          <ElementHolder heading='DateRangePicker'>
            <div style={{ maxWidth: 400 }}>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onChange={onDateRange}
              />
            </div>
          </ElementHolder>

          <ElementHolder heading='Form'>
            <form>
              <TextInput label='Text Input' />
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

          <ElementHolder heading='Notification'>
            <button className='btn' onClick={ev => showNotification({ message: 'You Look Nice Today!' })}>Notify Me!</button>
          </ElementHolder>

          <ElementHolder heading='Tooltip'>
            <div className='demo-tooltips'>
              <Tooltip up text='This is your tooltip'>top</Tooltip>
              <Tooltip right text='This is your tooltip'>right</Tooltip>
              <Tooltip down text='This is your tooltip'>bottom</Tooltip>
              <Tooltip left text='This is your tooltip'>left</Tooltip>
            </div>
          </ElementHolder>

        </div>
      </div>
    </div>
  )
}
