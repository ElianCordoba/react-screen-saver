import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
  const [currentScreensaver, setCurrentScreensaver] = useState(screensavers)

  function handleOptionSelected(selectedScreensaver: DropdownOption) {
    console.log('SELETED', selectedScreensaver)
  }

  return (
    <>
      <div>
        Pick a screensaver and wait!
        <Dropdown options={screensavers} onOptionSelected={handleOptionSelected} />
      </div>
    </>
  )
}

export default App
