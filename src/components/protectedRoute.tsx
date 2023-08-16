import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { routes } from '../app/constants'

interface Props {
    isAllowed: boolean,
    children?: ReactNode
}

export const ProtectedRoute = ({children, isAllowed}: Props) => {
    if(!isAllowed) return <Navigate to={routes.LOGIN} />
    return children ? children : <Outlet/>
}