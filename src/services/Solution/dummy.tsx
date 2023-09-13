/* eslint-disable @typescript-eslint/no-unused-vars */
import { ellipsisText, sleep } from '../../utils/common'
import { Paginated, Solution, paginationProps } from '../interface'
import {SolutionServiceInterface, createSolutionProps, editSolutionProps} from './interface'

export class SolutionServiceDummy implements SolutionServiceInterface {
    async getSolutions(paginationOpts: paginationProps) {
        const TOTAL_SOLUTIONS = 100
        const {limit, page} = paginationOpts
        const result: Paginated<Solution> = {
            data: [
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05abb',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    state: 'inactive',
                    title: 'title',
                    CreatedBy: {
                        id: '1',
                        email: 'fran@gmail.com',
                        fullName: 'Francisco Castillo',
                        username: 'fran123'
                    },
                    Responsables: [
                        {
                            id: '1',
                            email: 'fran@gmail.com',
                            fullName: 'Francisco Castillo',
                            username: 'fran123'
                        }
                    ],
                    Alerts: [
                        {
                            id: '1',
                            description: 'Lorem Ipsum',
                            priority: 'high',
                            Regulation: {
                                id: '1',
                                description: 'regulation',
                                name: 'regulation'
                            },
                            state: 'pending',
                            title: 'gran problema'
                        },
                        {
                            id: '2',
                            description: 'Lorem Ipsum',
                            priority: 'high',
                            Regulation: {
                                id: '1',
                                description: 'regulation',
                                name: 'regulation'
                            },
                            state: 'pending',
                            title: 'gran problema'
                        },
                        {
                            id: '3',
                            description: 'Lorem Ipsum',
                            priority: 'high',
                            Regulation: {
                                id: '1',
                                description: 'regulation',
                                name: 'regulation'
                            },
                            state: 'pending',
                            title: 'gran problema'
                        }
                    ],
                    Steps: [
                        {
                            id: '1',
                            description: 'hola'
                        }
                    ]
                },
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05abd',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    state: 'pending',
                    title: 'title',
                    CreatedBy: {
                        id: '1',
                        email: 'fran@gmail.com',
                        fullName: 'Francisco Castillo',
                        username: 'fran123'
                    },
                    Responsables: [
                        {
                            id: '1',
                            email: 'fran@gmail.com',
                            fullName: 'Francisco Castillo',
                            username: 'fran123'
                        }
                    ],
                    Alerts: [
                        {
                            id: '1',
                            description: 'Lorem Ipsum',
                            priority: 'high',
                            Regulation: {
                                id: '1',
                                description: 'regulation',
                                name: 'regulation'
                            },
                            state: 'pending',
                            title: 'gran problema'
                        }
                    ],
                    Steps: [
                        {
                            id: '1',
                            description: 'hola'
                        }
                    ]
                },
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05aba',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    state: 'pending',
                    title: 'title',
                    CreatedBy: {
                        id: '1',
                        email: 'fran@gmail.com',
                        fullName: 'Francisco Castillo',
                        username: 'fran123'
                    },
                    Responsables: [
                        {
                            id: '1',
                            email: 'fran@gmail.com',
                            fullName: 'Francisco Castillo',
                            username: 'fran123'
                        }
                    ],
                    Alerts: [
                        {
                            id: '1',
                            description: 'Lorem Ipsum',
                            priority: 'high',
                            Regulation: {
                                id: '1',
                                description: 'regulation',
                                name: 'regulation'
                            },
                            state: 'pending',
                            title: 'gran problema'
                        }
                    ],
                    Steps: [
                        {
                            id: '1',
                            description: 'hola'
                        }
                    ]
                },
            ],
            page,
            items: limit,
            totalPages: Math.floor(TOTAL_SOLUTIONS/limit)
        }
        result.data = result.data.map(solution => ({
            ...solution,
            description: ellipsisText(solution.description, 180)
        }))
        await sleep(500)
        return result
    }

    async createSolution(_props: createSolutionProps) {
        const result = {
            id: 'ecebc955-80f4-4aca-915f-461e15e05aba',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
            state: 'pending',
            title: 'title',
            CreatedBy: {
                id: '1',
                email: 'fran@gmail.com',
                fullName: 'Francisco Castillo',
                username: 'fran123'
            },
            Responsables: [
                {
                    id: '1',
                    email: 'fran@gmail.com',
                    fullName: 'Francisco Castillo',
                    username: 'fran123'
                }
            ],
            Alerts: [
                {
                    id: '1',
                    description: 'Lorem Ipsum',
                    priority: 'high',
                    Regulation: {
                        id: '1',
                        description: 'regulation',
                        name: 'regulation'
                    },
                    state: 'pending',
                    title: 'gran problema'
                }
            ],
            Steps: [
                {
                    id: '1',
                    description: 'hola'
                }
            ]
        }
        await sleep(500)
        return result
    }

    async getSolution(_id: string) {
        const result = {
            id: 'ecebc955-80f4-4aca-915f-461e15e05aba',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
            state: 'active',
            title: 'title',
            CreatedBy: {
                id: '1',
                email: 'fran@gmail.com',
                fullName: 'Francisco Castillo',
                username: 'fran123'
            },
            Responsables: [
                {
                    id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
                    username: 'user1',
                    fullName: 'John Doe',
                    email: 'john.doe@example.com',
                  }
            ],
            Alerts: [
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05abb',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    state: 'pending',
                    priority: 'high',
                    title: 'title 1',
                    Regulation: {
                        id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05abc',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    state: 'pending',
                    priority: 'high',
                    title: 'title 2',
                    Regulation: {
                        id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
            ],
            Steps: [
                {
                    id: '1',
                    description: 'hola'
                }
            ]
        }
        await sleep(500)
        return result
    }

    async editSolution(_id: string, _props: editSolutionProps) {
        const result = {
            id: 'ecebc955-80f4-4aca-915f-461e15e05aba',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
            state: 'pending',
            title: 'title',
            CreatedBy: {
                id: '1',
                email: 'fran@gmail.com',
                fullName: 'Francisco Castillo',
                username: 'fran123'
            },
            Responsables: [
                {
                    id: '1',
                    email: 'fran@gmail.com',
                    fullName: 'Francisco Castillo',
                    username: 'fran123'
                }
            ],
            Alerts: [
                {
                    id: '1',
                    description: 'Lorem Ipsum',
                    priority: 'high',
                    Regulation: {
                        id: '1',
                        description: 'regulation',
                        name: 'regulation'
                    },
                    state: 'pending',
                    title: 'gran problema'
                }
            ],
            Steps: [
                {
                    id: '1',
                    description: 'hola'
                }
            ]
        }
        await sleep(500)
        return result
    }

    async deleteSolution(_id: string) {
        await sleep(500)
        return true
    }

    async updateSolutionState(_id: string, _state: string) {
        await sleep(500)
        return true
    }
    
}