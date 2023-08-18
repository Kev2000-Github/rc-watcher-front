import { QuizFormSchema } from '../../components/Form/QuizForm/schema'
import { sleep } from '../../utils/common'
import { selectionType } from '../constants'
import { Paginated, Quiz, QuizForm, paginationProps } from '../interface'
import {QuizServiceInterface} from './interface'

export class QuizServiceDummy implements QuizServiceInterface {
    async answerQuizForm(data: QuizFormSchema) {
        await sleep(500)
        return true
    }

    async getQuizForm(id: string) {
        console.log(`get id: ${id}`)
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
                        },
                        {
                            id: '2',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.SIMPLE
                        }
                    ]
                },
                {
                    id: '2',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                    hasDoc: false,
                    isMultiple: true,
                    Risk: {
                        id: '1',
                        name: 'risk'
                    },
                    Selections: [
                        {
                            id: 'a1',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.MULTIPLE
                        },
                        {
                            id: 'a2',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.MULTIPLE
                        }
                    ]
                },
                {
                    id: '3',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                    hasDoc: true,
                    isMultiple: false,
                    Risk: {
                        id: '1',
                        name: 'risk'
                    },
                    Selections: [
                        {
                            id: 'b1',
                            description: 'Si',
                            riskScore: 0.1,
                            type: selectionType.POSITIVE
                        },
                        {
                            id: 'b2',
                            description: 'No',
                            riskScore: 0.9,
                            type: selectionType.NEGATIVE
                        }
                    ]
                },
            ]
        }
        await sleep(500)
        return result
    }
    
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