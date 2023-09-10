import { Paginated, Risk, paginationProps } from '../interface'
import {RiskServiceInterface} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class RiskServiceHttp implements RiskServiceInterface {
    async getRisks(paginationOpts: paginationProps) {
        const {limit, page} = paginationOpts
        try{
            const sessionId = getSessionId()
            const link = `${url.risks}?limit=${limit}&page=${page}`
            const resp = await client.get<Paginated<Risk>>(link, sessionId)
            return resp
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Risk Error', err.message))
            }
            return Promise.reject(new ServiceError('Risk Error', 'error'))
        }
    }
}