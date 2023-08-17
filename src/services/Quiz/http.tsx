import { sleep } from '../../utils/common'
import { Paginated, Quiz, paginationProps } from '../interface'
import {QuizServiceInterface} from './interface'

export class QuizServiceHttp implements QuizServiceInterface {
    async getQuizzes(paginationOpts: paginationProps) {
        //TODO: PENDING REAL IMPLEMENTATION
        const TOTAL_QUIZZES = 100
        const {limit, page} = paginationOpts
        const result: Paginated<Quiz> = {
            data: [],
            page,
            items: limit,
            totalPages: Math.floor(TOTAL_QUIZZES/limit)
        }
        await sleep(500)
        return result
    }
    
}