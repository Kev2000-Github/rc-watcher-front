import { ReactNode } from 'react'
import Risk from '@mui/icons-material/ReportProblemRounded';
import Dashboard from '@mui/icons-material/DashboardRounded';
import Form from '@mui/icons-material/FactCheckRounded';
import Notification from '@mui/icons-material/NotificationsActiveRounded';
import Solution from '@mui/icons-material/TipsAndUpdatesRounded';
import AML from '@mui/icons-material/FindInPageRounded';
import User from '@mui/icons-material/PersonRounded';
import Report from '@mui/icons-material/DescriptionRounded';
import Logout from '@mui/icons-material/Logout';
import { routes } from '../../app/constants'

interface MenuItem {
    text: string,
    URI: string,
    icon: ReactNode
}

type MenuItems = Array<MenuItem>

export const menuItems: MenuItems = [
    {
        text: 'Dashboard',
        URI: routes.DASHBOARD,
        icon: <Dashboard/>
    },
    {
        text: 'Encuestas',
        URI: routes.QUIZ,
        icon: <Form/>
    },
    {
        text: 'Riesgos',
        URI: '/on-construction...',
        icon: <Risk/>
    },
    {
        text: 'Alertas',
        URI: routes.ALERTS,
        icon: <Notification/>
    },
    {
        text: 'Soluciones',
        URI: '/on-construction...',
        icon: <Solution/>
    },
    {
        text: 'Buscador AML - PEP',
        URI: '/on-construction...',
        icon: <AML/>
    },
    {
        text: 'Usuarios',
        URI: routes.USERS,
        icon: <User/>
    },
    {
        text: 'Reportes',
        URI: '/on-construction...',
        icon: <Report/>
    },
]

export const menuLastItems: MenuItems = [
    {
        text: 'Cerrar Sesion',
        URI: routes.LOGIN,
        icon: <Logout/>
    }
]