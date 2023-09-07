import { Paginated, Role } from '../interface'
import {RoleServiceInterface} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class RoleServiceHttp implements RoleServiceInterface {
    async getRoles() {
        try{
            const sessionId = getSessionId()
            const link = `${url.roles}?level=2`
            const resp = await client.get<Paginated<Role>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Role Error', err.message))
            }
            return Promise.reject(new ServiceError('Role Error', 'error'))
        }
    }
}