import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import {Login} from '../pages/Login'
import {ThemeProvider} from '@mui/material'
import {theme} from '../utils/theme/theme.ts'
import './index.scss'
import { Dashboard } from '../pages/Dashboard/index.tsx'
import { routes } from './constants.ts'
import { NotFound } from '../pages/NotFound/index.tsx'
import { QuizListPage } from '../pages/Quiz/list/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute } from '../components/protectedRoute.tsx'
import { useUserStore } from '../store/index.ts'
import { QuizFormPage } from '../pages/Quiz/form/index.tsx'
import { Users } from '../pages/Users/index.tsx'
import { AlertListPage } from '../pages/Alerts/list/index.tsx'
import { CreateAlert } from '../pages/Alerts/create/index.tsx'
import { SolutionListPage } from '../pages/Solutions/list/index.tsx'
import { CreateSolution } from '../pages/Solutions/create/index.tsx'
import { AML } from '../pages/AML/index.tsx'
import { AlertViewPage } from '../pages/Alerts/view/index.tsx'
import { EditAlert } from '../pages/Alerts/edit/index.tsx'
import { SolutionViewPage } from '../pages/Solutions/view/index.tsx'
import { EditSolution } from '../pages/Solutions/edit/index.tsx'

const queryClient= new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  }
})

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
                <Route path={routes.QUIZ} element={<QuizListPage/>} />
                <Route path={routes.QUIZ_FORM} element={<QuizFormPage/>} />
                <Route path={routes.USERS} element={<Users/>} />
                <Route path={routes.ALERTS} element={<AlertListPage/>} />
                <Route path={routes.AML} element={<AML/>} />
                <Route path={routes.SOLUTIONS} element={<SolutionListPage/>} />
                <Route path={routes.CREATE_SOLUTION} element={<CreateSolution/>} />
                <Route path={routes.EDIT_SOLUTION} element={<EditSolution/>} />
                <Route path={routes.SOLUTION} element={<SolutionViewPage/>} />
                <Route path={routes.ALERT} element={<AlertViewPage/>} />
                <Route path={routes.EDIT_ALERT} element={<EditAlert/>} />
                <Route path={routes.CREATE_ALERT} element={<CreateAlert/>} />
              </Route>
              <Route path={routes.NOT_FOUND} element={<NotFound/>} />
            </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
