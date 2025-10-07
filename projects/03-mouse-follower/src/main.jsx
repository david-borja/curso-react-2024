import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// el strict mode solo funciona en desarrollo. Nos ayuda a validar que los efectos se están limpiando correctamente usando los cleanups
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
