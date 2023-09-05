import { Paginated, ResponseHTTP, User, paginationProps } from '../interface'
import {UserServiceInterface, createProps, deleteUserProps, mutateProps, mutateUserProps} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class UserServiceHttp implements UserServiceInterface {
    async getUsers(companyId: string, paginationOpts: paginationProps) {
        const {limit, page} = paginationOpts
        try{
            const sessionId = getSessionId()
            let link = `${url.users}`.replace(':companyId', companyId) 
            link = `${link}?limit=${limit}&page=${page}`
            const resp = await client.get<Paginated<User>>(link, sessionId)
            return resp
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Users Failed', err.message))
            }
            return Promise.reject(new ServiceError('Users Error', 'error'))
        }
    }

    async getUser(companyId: string, userId: string) {
        try{
            const sessionId = getSessionId()
            const link = `${url.user}`.replace(':companyId', companyId).replace(':userId', userId)
            const resp = await client.get<ResponseHTTP<User>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Users Failed', err.message))
            }
            return Promise.reject(new ServiceError('Users Error', 'error'))
        }
    }

    async updateUser({companyId, userId, body}: mutateProps<mutateUserProps>) {
        try{
            const sessionId = getSessionId()
            const link = `${url.updateUser}`.replace(':companyId', companyId).replace(':userId', userId)
            if(body.email) delete body.email
            const resp = await client.put<ResponseHTTP<User>>(link, body, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Users Failed', err.message))
            }
            return Promise.reject(new ServiceError('Users Error', 'error'))
        }
    }

    async deleteUser({companyId, userId}: deleteUserProps){
        try{
            const sessionId = getSessionId()
            const link = `${url.deleteUser}`.replace(':companyId', companyId).replace(':userId', userId)
            const resp = await client.delete<ResponseHTTP<User>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Users Failed', err.message))
            }
            return Promise.reject(new ServiceError('Users Error', 'error'))
        }
    }

    async createUser({companyId, body}: createProps<mutateUserProps>){
        try{
            const sessionId = getSessionId()
            const link = `${url.createUser}`.replace(':companyId', companyId)
            const resp = await client.post<ResponseHTTP<User>>(link, body, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Users Failed', err.message))
            }
            return Promise.reject(new ServiceError('Users Error', 'error'))
        }
    }

}