import * as yup from 'yup'
import { registerProps } from '../../../services/Register/interface'

export type RegisterSchema = registerProps & {
    user: {
        confirmPassword: string
    }
}

export const registerSchema = yup.object().shape({
    user: yup.object().shape({
      fullName: yup.string().required('nombre completo requerido'),
      username: yup.string().required('nombre de usuario requerido'),
      email: yup.string().email('email invalido').required('email es requerido'),
      password: yup.string().matches(/^[a-zA-Z0-9_@#$%^*()-]{8,}$/, '8 caracteres minimo, 1+ minuscula, 1+ mayuscula, 1+ caracteres especiales, y alfanumerico').required('Contraseña requerida'),
      confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas no son iguales')
      .required('Confirmar contraseña es requerida'),
    }),
    company: yup.object().shape({
      name: yup.string().required('Nombre de empresa requerida'),
      companyId: yup.string().required('ID de empresa requerida'),
      countryId: yup.string().required('Pais requerido'),
      address: yup.string().required('Direccion requerida'),
    }),
  })