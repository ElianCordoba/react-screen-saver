import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ScreenSaver } from './components/screenSaver.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScreenSaver>
      <App />
    </ScreenSaver>
  </React.StrictMode>,
)
