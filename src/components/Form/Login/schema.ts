import * as yup from 'yup'

export interface LoginSchema {
    username: string;
    password: string;
    companyId: string
}

export const loginSchema = yup
  .object({
    username: yup.string()
        .required("El nombre de usuario es requerido"),
    password: yup.string()
        .required("La contraseña es requerida"),
    companyId: yup.string()
        .required("El ID de la empresa es requerida")
  })