import logoLong from '../../assets/logo_long.jpg'
import style from './style.module.scss'
import {LoginForm} from '../../components/Form/Login'
import {LoginSchema, loginSchema} from '../../components/Form/Login/schema'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../app/constants'

export function Login() {
    const navigate = useNavigate()
    const onSubmit = (data: LoginSchema) => {
        console.log(data)
        navigate(routes.DASHBOARD)
    }

  return (
    <div className={style.mainPage}>
        <img src={logoLong} alt='Company Logo'/>
        <h3>Bienvenido</h3>
        <LoginForm 
            onSubmitItem={onSubmit}
            schema={loginSchema}
        />
    </div>
  )
}