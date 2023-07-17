import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import '@fontsource/poppins/latin-200.css'
import '@fontsource/poppins/latin-800.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-400.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
