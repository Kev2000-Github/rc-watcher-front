import * as yup from 'yup'
import { AMLFilter } from '../../../services/AML/interface'

export type AMLSchema = AMLFilter

export const amlSchema = yup
  .object({
    name: yup.string()
        .required("El nombre es requerido"),
    country: yup.string(),
  })