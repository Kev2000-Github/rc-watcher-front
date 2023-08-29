import { User } from '../interface'
import {LoginServiceInterface, loginProps} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

type UserResponse = {
    user: Omit<User, 'sessionId'>,
    session: string
}
export class LoginServiceHttp implements LoginServiceInterface {
    async login(props: loginProps) {
        try{
            const sessionId = getSessionId()
            const data = await client.post<UserResponse>(url.login, props, sessionId)
            const user: User = {...data.user, sessionId: data.session}
            return user
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Login Failed', err.message))
            }
            return Promise.reject(new ServiceError('Login Error', 'error'))
        }
    }

    async logout() {
        try{
            const sessionId = getSessionId()
            await client.delete(url.logout, sessionId)
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Logout Error', err.message))
            }
            return Promise.reject(new ServiceError('Logout Error', 'error'))
        }
    }
}