import * as yup from 'yup'
import { mutateUserProps } from '../../../services/User/interface'

export type UserSchema = Required<mutateUserProps>
export type EditUserSchema = mutateUserProps

export const userSchema = yup
  .object({
    username: yup.string().matches(/^[a-zA-Z0-9_@#$%^*()-]+$/, 'no debe tener espacios al inicio ni final')
        .required("El nombre de usuario es requerido"),
    fullName: yup.string().matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, 'no debe tener caracteres especiales, numeros ni espacios al final ni comienzo')
        .required("El nombre completo es requerido"),
    email: yup.string().email()
        .required("El email es requerido"),
    password: yup.string().matches(/^[a-zA-Z0-9_@#$%^*()-]{8,}$/, '8 caracteres minimo, 1+ minuscula, 1+ mayuscula, 1+ caracteres especiales, y alfanumerico')
        .required("La contraseña es requerida"),
    roleId: yup.string().uuid()
        .required("el Rol es requerido"),
    
  })

  export const editUserSchema = yup
  .object({
    username: yup.string().matches(/^[a-zA-Z0-9_@#$%^*()-]+$/, 'no debe tener espacios al inicio ni final'),
    fullName: yup.string().matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, 'no debe tener caracteres especiales, numeros ni espacios al final ni comienzo'),
    email: yup.string().email(),
    password: yup.string().matches(/^[a-zA-Z0-9_@#$%^*()-]{8,}$/, '8 caracteres minimo, 1+ minuscula, 1+ mayuscula, 1+ caracteres especiales, y alfanumerico'),
    roleId: yup.string().uuid(),
  })