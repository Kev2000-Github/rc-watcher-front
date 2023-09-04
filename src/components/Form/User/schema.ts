import * as yup from 'yup'
import { mutateUserProps } from '../../../services/User/interface'

export type UserSchema = Required<mutateUserProps>

export const userSchema = yup
  .object({
    username: yup.string()
        .required("El nombre de usuario es requerido"),
    fullName: yup.string()
        .required("El nombre completo es requerido"),
    email: yup.string()
        .required("El email es requerido"),
    password: yup.string()
        .required("La contraseña es requerida"),
    roleId: yup.string()
        .required("el Rol es requerido"),
    
  })