import * as yup from 'yup'
import { createSolutionProps } from '../../../services/Solution/interface'

export type SolutionSchema = Omit<createSolutionProps, 'steps' | 'responsableIds'> & {
    steps: {value: string}[],
    responsableIds: {id: string, username: string}[]
}

const responsableIdsMsg = "Debe asignar al menos un responsable"
const alertIdsMsg = "Debe seleccionar como minimo un alerta"
const stepsMsg = "Debe describir por lo menos un paso"
const stepLengthMsg = "El paso no puede estar vacia"

export const solutionSchema = yup
  .object({
    title: yup.string()
        .required("El titulo es requerido"),
    description: yup.string()
        .required("La descripcion es requerida"),
    responsableIds: yup.array(
        yup.object({
            id: yup.string().required(responsableIdsMsg),
            username: yup.string().required(responsableIdsMsg)
        })
    ).min(1, responsableIdsMsg).required(responsableIdsMsg),
    alertIds: yup.array(
        yup.string().required(alertIdsMsg)
    ).min(1, alertIdsMsg).required(alertIdsMsg),
    steps: yup.array(
        yup.object({
            value: yup.string().required(stepLengthMsg)
        })
    ).min(1, stepsMsg).required(stepsMsg),
  })