import { sleep } from '../../utils/common'
import { User } from '../interface'
import {LoginServiceInterface, loginProps} from './interface'

export class LoginServiceHttp implements LoginServiceInterface {
    async login(props: loginProps) {
        //TODO: PENDING REAL IMPLEMENTATION...
        const dummyUser: User = {
            id: '1',
            username: 'Fran',
            fullName: 'Francisco Landaeta',
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
            }
        }
        await sleep(500)
        return dummyUser
    }

    async logout() {
        //TODO: PENDING REAL IMPLEMENTATION...
        await sleep(500)
    }
}