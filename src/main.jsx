import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PasswordLock from './components/PasswordLock'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordLock>
      <App />
    </PasswordLock>
  </StrictMode>,
)
