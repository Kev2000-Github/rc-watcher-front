import { QuizFormSchema } from '../../components/Form/QuizForm/schema'
import { sleep } from '../../utils/common'
import { selectionType } from '../constants'
import { Paginated, Quiz, QuizForm, paginationProps } from '../interface'
import {QuizServiceInterface} from './interface'

export class QuizServiceHttp implements QuizServiceInterface {
    async answerQuizForm(data: QuizFormSchema) {
        //TODO: PENDING REAL IMPLEMENTATION
        await sleep(500)
        return true
    }

    async getQuizForm(id: string) {
        //TODO: PENDING REAL IMPLEMENTATION
        const result: QuizForm = {
            id,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
            name: `Taxes 1`,
            Regulation: {
                id: '1',
                description: 'Taxes',
                name: 'Taxes'
            },
            Questions: [
                {
                    id: '1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                    hasDoc: false,
                    isMultiple: false,
                    Risk: {
                        id: '1',
                        name: 'risk'
                    },
                    Selections: [
                        {
                            id: '1',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.SIMPLE
                        }
                    ]
                }
            ]
        }
        await sleep(500)
        return result
    }

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