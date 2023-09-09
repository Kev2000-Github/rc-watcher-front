import { ServiceError } from '../../errors/ServiceError'
import { sleep } from '../../utils/common'
import { User } from '../interface'
import {LoginServiceInterface, loginProps} from './interface'

export class LoginServiceDummy implements LoginServiceInterface {
    async login(props: loginProps) {
        if(props.username === 'error'){
            throw new ServiceError('error title', 'a')
        }
        if(props.username === 'operator'){
            return {
                id: '1',
                username: 'Jose',
                fullName: 'Jose Fernandez',
                email: 'Jose@gmail.com',
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
                    name: 'operativo'
                },
                sessionId: '1'
            } 
        }
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

    async logout() {
        //TODO: GLOBAL VARIABLES MANAGEMENT PENDING...
        await sleep(500)
    }
}