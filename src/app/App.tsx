import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import {Login} from '../pages/Login'
import {ThemeProvider} from '@mui/material'
import {theme} from '../utils/theme/theme.ts'
import './index.scss'
import { Dashboard } from '../pages/Dashboard/index.tsx'
import { routes } from './constants.ts'
import { NotFound } from '../pages/NotFound/index.tsx'
import { Quiz } from '../pages/Quiz/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute } from '../components/protectedRoute.tsx'
import { useUserStore } from '../store/index.ts'

const queryClient= new QueryClient()

function App() {
  const { isAdmin, isAuditor } = useUserStore()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
            <Routes>
              <Route path={routes.LOGIN} element={<Login />} />
              <Route element={<ProtectedRoute isAllowed={isAdmin() || isAuditor()}/>}>
                <Route path={routes.DASHBOARD} element={<Dashboard/>} />
                <Route path={routes.QUIZ} element={<Quiz/>} />
              </Route>
              <Route path={routes.NOT_FOUND} element={<NotFound/>} />
            </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
