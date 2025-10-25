import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'  // Ajoutez cette ligne
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
