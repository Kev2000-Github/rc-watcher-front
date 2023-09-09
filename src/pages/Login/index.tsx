import style from './style.module.scss'
import {LoginForm} from '../../components/Form/Login'
import {LoginSchema, loginSchema} from '../../components/Form/Login/schema'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../app/constants'
import { Card } from '../../components/Card'
import { Logo } from '../../SVG/logo'
import { useMutation } from '@tanstack/react-query'
import { closeNotification, notifyError, notifyLoading } from '../../utils/alert'
import loginService from '../../services/Session'
import { useEffect } from 'react'
import { useUserStore } from '../../store'
import { ServiceError } from '../../errors/ServiceError'
import { ROLES, mutationKey } from '../../services/constants'

export function Login() {
  const {isAuth, setUser, isAdmin, isAuditor, isOperator} = useUserStore()
  const signInMutation = useMutation([mutationKey.LOGIN], loginService.login, {
    onSuccess: (user) => {
      setUser(user)
      if(isAdmin() || isAuditor()){
        navigate(routes.DASHBOARD)
      }
      else if(isOperator()){
        navigate(routes.ALERTS)
      }
      closeNotification()
    }
  })
  const navigate = useNavigate()
  const onSubmit = (data: LoginSchema) => signInMutation.mutate(data)

  useEffect(() => {
    if(isAuth()){
      if(isAdmin() || isAuditor()) navigate(routes.DASHBOARD)
      else if(isOperator()) navigate(routes.ALERTS)
    }
  }, [])

  useEffect(() => {
    if(signInMutation.error){
      const err = signInMutation.error as ServiceError
      notifyError(err.title, err.message)
    }
  }, [signInMutation.error])

  useEffect(() => {
    if(signInMutation.isLoading) notifyLoading()
  }, [signInMutation.isLoading])

  return (
    <div className={style.mainPage}>
        <Logo />
        <h3>Bienvenido</h3>
        <Card>
          <LoginForm 
              onSubmitItem={onSubmit}
              schema={loginSchema}
          />
        </Card>
    </div>
  )
}