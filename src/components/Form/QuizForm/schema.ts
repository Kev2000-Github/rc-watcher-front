/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as yup from 'yup'
import { QuizForm } from '../../../services/interface'

export interface QuizFormSchema {
    [id: string]: {
        selectionId: string[]|string|undefined
    }
}

export type DynamicSchema = yup.ObjectSchema<{
    [id: string]: { selectionId: string | string[] | undefined; };
}, yup.AnyObject, {
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
        if(question.hasDoc) questionValidation['document'] = yup.string().optional()
        validationSchema[question.id] = yup.object(questionValidation)
    }
    return yup.object(validationSchema) as DynamicSchema
}