import style from './style.module.scss'
import {LoginForm} from '../../components/Form/Login'
import {LoginSchema, loginSchema} from '../../components/Form/Login/schema'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../app/constants'
import { Card } from '../../components/Card'
import { Logo } from '../../SVG/logo'
import { useMutation } from '@tanstack/react-query'
import { closeNotification, notifyError, notifyLoading } from '../../utils/alert'
import loginService from '../../services/Login'
import { useEffect } from 'react'
import { ServiceError } from '../../errors/ServiceError'

export function Login() {
  const signInMutation = useMutation(['hola'], loginService.login, {
    onSuccess: () => {
      navigate(routes.DASHBOARD)
      closeNotification()
    },
    onError: (err: ServiceError) => notifyError(err.title, err.message)
  })
  const navigate = useNavigate()
  const onSubmit = (data: LoginSchema) => signInMutation.mutate(data)

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