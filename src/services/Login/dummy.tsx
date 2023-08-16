import { sleep } from '../../utils/common'
import { User } from '../interface'
import {LoginServiceInterface, loginProps} from './interface'

export class LoginServiceDummy implements LoginServiceInterface {
    async login(props: loginProps) {
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
}