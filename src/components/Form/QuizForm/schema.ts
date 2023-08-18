/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as yup from 'yup'
import { QuizForm } from '../../../services/interface'
import { selectionType } from '../../../services/constants'

export interface QuizFormSchema {
    [id: string]: {
        selectionId: string[]|string|undefined,
        document?: {
            name: string
            content: string|ArrayBuffer
        } | null
    }
}

export type DynamicSchema = yup.ObjectSchema<QuizFormSchema, yup.AnyObject, {
    [id: string]: undefined;
}, "">

const validationMessage = (num: number) => `Falta responder la pregunta ${num}`

export const quizFormSchemaBuilder = (quiz: QuizForm) => {
    const validationSchema: yup.ObjectShape = {}
    for(let i = 0; i < quiz.Questions.length; i++){
        const question = quiz.Questions[i]
        const questionValidation : yup.ObjectShape = {}
        if(question.isMultiple){
            questionValidation['selectionId'] = yup
                .array().of(yup.string().required()).min(1, validationMessage(i + 1))
        }
        else{
            questionValidation['selectionId'] = yup.string().required(validationMessage(i + 1))
        }
        if(question.hasDoc){
            const positiveSelectionId = question.Selections.find(s => s.type === selectionType.POSITIVE)?.id
            questionValidation['document'] = yup.object().when(`selectionId`, {
                is: (selectionId: string) => {
                    return selectionId === positiveSelectionId
                },
                then: (schema) => schema.required(`Falta subir el documento para la pregunta ${i + 1}`),
                otherwise: (schema) => schema.optional().nullable()
            })
        }
        validationSchema[question.id] = yup.object(questionValidation)
    }
    return yup.object(validationSchema) as DynamicSchema
}