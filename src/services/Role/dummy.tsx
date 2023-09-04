import { ServiceError } from '../../errors/ServiceError'
import { sleep } from '../../utils/common'
import { User } from '../interface'
import {RoleServiceInterface} from './interface'

export class RoleServiceDummy implements RoleServiceInterface {
    async getRoles() {
        await sleep(500)
        return [{id: '1', name: 'admin'}]
    }
}