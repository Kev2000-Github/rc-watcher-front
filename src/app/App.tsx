import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import {Login} from '../pages/Login'
import {ThemeProvider} from '@mui/material'
import {theme} from '../utils/theme/theme.ts'
import './index.scss'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
