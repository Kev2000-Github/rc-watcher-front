import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import {Login} from '../pages/Login'
import {ThemeProvider} from '@mui/material'
import {theme} from '../utils/theme/theme.ts'
import './index.scss'
import { Dashboard } from '../pages/Dashboard/index.tsx'
import { routes } from './constants.ts'
import { NotFound } from '../pages/NotFound/index.tsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Routes>
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.DASHBOARD} element={<Dashboard/>} />
            <Route path={routes.NOT_FOUND} element={<NotFound/>} />
          </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
