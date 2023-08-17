import { getRandomNumber, sleep } from '../../utils/common'
import { Paginated, Quiz, paginationProps } from '../interface'
import {QuizServiceInterface} from './interface'

export class QuizServiceDummy implements QuizServiceInterface {
    async getQuizzes(paginationOpts: paginationProps) {
        const MIN = 100
        const MAX = 1
        const TOTAL_QUIZZES = 100
        const {limit, page} = paginationOpts
        const result: Paginated<Quiz> = {
            data: [
                {
                    id: '1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    name: `Taxes ${page}`,
                    isCompleted: false,
                    questionCount: 10,
                    Regulation: {
                        id: '1',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
                {
                    id: '2',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum.',
                    name: `Taxes ${page}`,
                    isCompleted: false,
                    questionCount: 10,
                    Regulation: {
                        id: '2',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
                {
                    id: '3',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus.',
                    name: `Taxes ${page}`,
                    isCompleted: false,
                    questionCount: 10,
                    Regulation: {
                        id: '3',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                }
            ],
            page,
            items: limit,
            totalPages: Math.floor(TOTAL_QUIZZES/limit)
        }
        await sleep(500)
        console.log(`got ${page}`)
        return result
    }
    
}