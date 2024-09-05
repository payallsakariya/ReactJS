import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import our custom CSS
import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert';
// or, specify which plugins you need:
import { Tooltip, Toast, Popover } from 'bootstrap';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)