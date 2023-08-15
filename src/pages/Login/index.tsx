import logoLong from '../../assets/logo_long.jpg'
import style from './style.module.scss'
import {LoginForm} from '../../components/Form/Login'
import {LoginSchema, loginSchema} from '../../components/Form/Login/schema'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../app/constants'
import { Card } from '../../components/Card'
import { Logo } from '../../SVG/logo'


export function Login() {
    const navigate = useNavigate()
    const onSubmit = (data: LoginSchema) => {
        console.log(data)
        navigate(routes.DASHBOARD)
    }

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