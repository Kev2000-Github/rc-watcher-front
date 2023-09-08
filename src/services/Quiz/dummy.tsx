/* eslint-disable @typescript-eslint/no-unused-vars */
import { sleep } from '../../utils/common'
import { selectionType } from '../constants'
import { Paginated, Quiz, QuizForm, paginationProps } from '../interface'
import {QuizServiceInterface, answerQuizProps} from './interface'

export class QuizServiceDummy implements QuizServiceInterface {
    async answerQuizForm(_props: answerQuizProps) {
        await sleep(500)
        return true
    }

    async getQuizForm(id: string) {
        const result: QuizForm = {
            id,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
            name: `Taxes 1`,
            Regulation: {
                id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                description: 'Taxes',
                name: 'Taxes'
            },
            Questions: [
                {
                    id: '6801c574-83d0-4986-9109-998833158589',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                    hasDoc: false,
                    isMultiple: false,
                    Risk: {
                        id: '4da7265a-a06a-4388-9139-b6357ccf53fc',
                        name: 'risk'
                    },
                    Selections: [
                        {
                            id: 'da1bc58e-dde3-4f58-89fb-63dbe8c8054e',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.SIMPLE
                        },
                        {
                            id: '9e798c76-dedb-49bf-8bbd-b01cf9691332',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.SIMPLE
                        }
                    ]
                },
                {
                    id: '97b828c7-a9be-4914-b27a-64b5b56f91d1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                    hasDoc: false,
                    isMultiple: true,
                    Risk: {
                        id: '4da7265a-a06a-4388-9139-b6357ccf53fc',
                        name: 'risk'
                    },
                    Selections: [
                        {
                            id: '6981f586-9fcf-44a8-b94a-da21c8f6cef1',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.MULTIPLE
                        },
                        {
                            id: '0979027f-944a-4c31-aa9b-30be895e0aaa',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                            riskScore: 0.1,
                            type: selectionType.MULTIPLE
                        }
                    ]
                },
                {
                    id: '343f0507-6619-4dcc-a19c-31cae7af84e1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel ',
                    hasDoc: true,
                    isMultiple: false,
                    Risk: {
                        id: '4da7265a-a06a-4388-9139-b6357ccf53fc',
                        name: 'risk'
                    },
                    Selections: [
                        {
                            id: '8f11d756-8c78-4981-b2f4-0709cf36aa24',
                            description: 'Si',
                            riskScore: 0.1,
                            type: selectionType.POSITIVE
                        },
                        {
                            id: 'aa2af5ba-98e4-4c88-b24d-3c2612351425',
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
        const TOTAL_QUIZZES = 100
        const {limit, page} = paginationOpts
        const result: Paginated<Quiz> = {
            data: [
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05abb',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    name: `Taxes ${page}`,
                    isCompleted: true,
                    questionCount: 10,
                    Regulation: {
                        id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
                {
                    id: '3d20a283-f145-4976-a6b1-ad03aa07ed18',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum.',
                    name: `Taxes ${page}`,
                    isCompleted: false,
                    questionCount: 10,
                    Regulation: {
                        id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
                {
                    id: '83c8ebbe-0d97-4a55-bc63-141ab307e029',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus.',
                    name: `Taxes ${page}`,
                    isCompleted: false,
                    questionCount: 10,
                    Regulation: {
                        id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
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
        return result
    }
    
}