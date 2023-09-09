import style from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../app/constants'
import { Card } from '../../components/Card'
import { Logo } from '../../SVG/logo'
import { useMutation, useQuery } from '@tanstack/react-query'
import { closeNotification, notifyError, notifyLoading } from '../../utils/alert'
import { useEffect } from 'react'
import { useUserStore } from '../../store'
import { ServiceError } from '../../errors/ServiceError'
import { mutationKey, queryKey } from '../../services/constants'
import registerService from '../../services/Register'
import { RegisterSchema, registerSchema } from '../../components/Form/Register/schema'
import { RegisterForm } from '../../components/Form/Register'
import countryService from '../../services/Country'

export function Register() {
  const {setUser} = useUserStore()
  const registerMutation = useMutation([mutationKey.LOGIN], registerService.register, {
    onSuccess: (user) => {
      setUser(user)
      navigate(routes.DASHBOARD)
      closeNotification()
    }
  })
  const { data: countries } = useQuery({
    queryKey: [queryKey.COUNTRIES],
    queryFn: countryService.getCountries
  })
  const navigate = useNavigate()
  const onSubmit = (data: RegisterSchema) => registerMutation.mutate(data)

  useEffect(() => {
    if(registerMutation.error){
      const err = registerMutation.error as ServiceError
      notifyError(err.title, err.message)
    }
  }, [registerMutation.error])

  useEffect(() => {
    if(registerMutation.isLoading) notifyLoading()
  }, [registerMutation.isLoading])

  return (
    <div className={style.mainPage}>
      {
        countries && 
        <RegisterForm 
          countries={countries}
          onSubmitItem={onSubmit}
          schema={registerSchema}
        />
      }
    </div>
  )
}