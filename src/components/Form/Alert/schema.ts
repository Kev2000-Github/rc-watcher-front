import * as yup from 'yup'
import { createAlertProps } from '../../../services/Alert/interface'

export type AlertSchema = createAlertProps

export const alertSchema = yup
  .object({
    title: yup.string()
        .required("El titulo es requerido"),
    description: yup.string()
        .required("La descripcion es requerida"),
    priority: yup.string()
        .required("La prioridad es requerida"),
    regulationId: yup.string()
        .required("La regulacion es requerida")
  })