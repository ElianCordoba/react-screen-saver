import { useState } from 'react'
import './App.css'
import { Dropdown, DropdownOption } from './components/dropdown'

const screensavers: DropdownOption[] = [
  {
    displayText: 'DVD style',
    value: 'dvd'
  },
  {
    displayText: 'Tunnel',
    value: 'tunnel'
  }
]

function App() {
  const [currentScreensaver, setCurrentScreensaver] = useState(screensavers[0])

  return (
    <>
      <div>
        Pick a screensaver and wait!
        <Dropdown options={screensavers} onOptionSelected={setCurrentScreensaver} />
        <br />
        <br />
        <br />
        <br />

        current screensaver {currentScreensaver.displayText}
      </div>
    </>
  )
}

export default App
