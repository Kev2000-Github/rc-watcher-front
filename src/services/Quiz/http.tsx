import { client } from '../../clients'
import { HTTPError } from '../../errors/HTTPError'
import { ServiceError } from '../../errors/ServiceError'
import { getSessionId } from '../../utils/common'
import { url } from '../constants'
import { Paginated, Quiz, QuizForm, paginationProps } from '../interface'
import {QuizServiceInterface, answerQuizProps, quizFilterProps} from './interface'
type answerSchema = {
    questionId: string,
    selectionId: string,
    document?: {
        name: string,
        content: string|ArrayBuffer
    } | null
}
export class QuizServiceHttp implements QuizServiceInterface {
    async answerQuizForm({id, form}: answerQuizProps) {
        try{
            const sessionId = getSessionId()
            const link = url.answerQuizForm.replace(':id', id ?? '')
            const responses = Object.keys(form).reduce((resp, questionId) => {
                if(typeof form[questionId].selectionId === 'string'){
                    const newItem: answerSchema = {
                        questionId, 
                        selectionId: form[questionId].selectionId as string
                    }
                    if(form[questionId].document) newItem.document = form[questionId].document
                    return [...resp, newItem]
                }
                const checkboxes = (form[questionId].selectionId as string[]).map(
                    (selectionId: string) => ({questionId, selectionId})
                )
                return [...resp, ...checkboxes]
            }, [] as answerSchema[])
            await client.post(link, {responses}, sessionId)
            return true
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Quiz error', err.message))
            }
            return Promise.reject(new ServiceError('Quiz Error', 'error'))
        }
    }

    async getQuizForm(id: string) {
        try{
            const sessionId = getSessionId()
            const link = url.quizForm.replace(':id', id)
            const data = await client.get<{data: QuizForm}>(link, sessionId)
            return data.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Quiz error', err.message))
            }
            return Promise.reject(new ServiceError('Quiz Error', 'error'))
        }
    }

    async getQuizzes(paginationOpts: paginationProps, filters?: quizFilterProps) {
        const {limit, page} = paginationOpts
        try{
            const sessionId = getSessionId()
            let link = `${url.quizzes}?limit=${limit}&page=${page}`
            if(filters?.state) link = `${link}&state=${filters.state}`
            const data = await client.get<Paginated<Quiz>>(link, sessionId)
            return data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Quiz error', err.message))
            }
            return Promise.reject(new ServiceError('Quiz Error', 'error'))
        }
    }
    
}