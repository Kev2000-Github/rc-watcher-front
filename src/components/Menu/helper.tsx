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
        URI: routes.RISKS,
        icon: <Risk/>
    },
    {
        text: 'Alertas',
        URI: routes.ALERTS,
        icon: <Notification/>
    },
    {
        text: 'Soluciones',
        URI: routes.SOLUTIONS,
        icon: <Solution/>
    },
    {
        text: 'Buscador AML - PEP',
        URI: routes.AML,
        icon: <AML/>
    },
    {
        text: 'Usuarios',
        URI: routes.USERS,
        icon: <User/>
    },
    {
        text: 'Reportes',
        URI: routes.REPORTS,
        icon: <Report/>
    },
]

export const operatorMenuItems: MenuItems = [
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
        URI: routes.RISKS,
        icon: <Risk/>
    },
    {
        text: 'Alertas',
        URI: routes.ALERTS,
        icon: <Notification/>
    },
    {
        text: 'Soluciones',
        URI: routes.SOLUTIONS,
        icon: <Solution/>
    },
    {
        text: 'Buscador AML - PEP',
        URI: routes.AML,
        icon: <AML/>
    },
    {
        text: 'Usuarios',
        URI: routes.USERS,
        icon: <User/>
    },
    {
        text: 'Reportes',
        URI: routes.REPORTS,
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