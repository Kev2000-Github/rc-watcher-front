import { User } from '../interface'
import {RegisterServiceInterface, registerProps} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

type registerResponse = {
    user: User,
    session: string
}

export class RegisterServiceHttp implements RegisterServiceInterface {
    async register(props: registerProps) {
        try{
            const sessionId = getSessionId()
            const link = `${url.register}`
            const resp = await client.post<registerResponse>(link, props, sessionId)
            const user: User = {...resp.user, sessionId: resp.session}
            return user
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Register Error', err.message))
            }
            return Promise.reject(new ServiceError('Register Error', 'error'))
        }
    }
}