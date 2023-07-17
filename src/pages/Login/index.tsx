import logoLong from '../../assets/logo_long.jpg'
import style from './style.module.scss'
import {LoginForm} from '../../components/Form/Login'
import {LoginSchema, loginSchema} from '../../components/Form/Login/schema'

export function Login() {
    const onSubmit = (data: LoginSchema) => {
        console.log(data)
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