import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'
import { ContactProvider } from './context/contacts.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContactProvider>
      <App />
    </ContactProvider>
  </React.StrictMode>,
)