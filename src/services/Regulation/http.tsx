import { Paginated, Regulation, User } from '../interface'
import {RegulationServiceInterface} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class RegulationServiceHttp implements RegulationServiceInterface {
    async getRegulations() {
        try{
            const sessionId = getSessionId()
            const link = `${url.regulations}`
            const resp = await client.get<Paginated<Regulation>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Regulation Error', err.message))
            }
            return Promise.reject(new ServiceError('Regulation Error', 'error'))
        }
    }
}