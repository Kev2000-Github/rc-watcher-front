import { sleep } from '../../utils/common'
import { User, paginationProps } from '../interface'
import { UserServiceInterface, deleteUserProps, mutateProps, mutateUserProps } from './interface'

export class UserServiceDummy implements UserServiceInterface {
    async getUsers(companyId: string, _: paginationProps) {
        const dummyUser: User = {
            id: '1',
            username: 'Fran',
            fullName: 'Francisco Castillo',
            email: 'Fran@gmail.com',
            Company: {
                id: '1',
                name: 'company Test',
                address: 'address',
                Country: {
                    id: '1',
                    name: 'Venezuela',
                }
            },
            Role: {
                id: '1',
                name: 'admin'
            },
            sessionId: '1'
        }
        await sleep(500)
        return {
            data: [dummyUser],
            page: 1,
            items: 1,
            totalPages: 1
        }
    }

    async updateUser(_: mutateProps<mutateUserProps>) {
        const dummyUser: User = {
            id: '1',
            username: 'Fran',
            fullName: 'Francisco Castillo',
            email: 'Fran@gmail.com',
            Company: {
                id: '1',
                name: 'company Test',
                address: 'address',
                Country: {
                    id: '1',
                    name: 'Venezuela',
                }
            },
            Role: {
                id: '1',
                name: 'admin'
            },
            sessionId: '1'
        }
        await sleep(500)
        return dummyUser
    }

    async deleteUser(_: deleteUserProps){
        const dummyUser: User = {
            id: '1',
            username: 'Fran',
            fullName: 'Francisco Castillo',
            email: 'Fran@gmail.com',
            Company: {
                id: '1',
                name: 'company Test',
                address: 'address',
                Country: {
                    id: '1',
                    name: 'Venezuela',
                }
            },
            Role: {
                id: '1',
                name: 'admin'
            },
            sessionId: '1'
        }
        await sleep(500)
        return dummyUser
    }

    async createUser(_: deleteUserProps){
        const dummyUser: User = {
            id: '1',
            username: 'Fran',
            fullName: 'Francisco Castillo',
            email: 'Fran@gmail.com',
            Company: {
                id: '1',
                name: 'company Test',
                address: 'address',
                Country: {
                    id: '1',
                    name: 'Venezuela',
                }
            },
            Role: {
                id: '1',
                name: 'admin'
            },
            sessionId: '1'
        }
        await sleep(500)
        return dummyUser
    }
}