import { client } from '../../clients'
import { HTTPError } from '../../errors/HTTPError'
import { ServiceError } from '../../errors/ServiceError'
import { getSessionId } from '../../utils/common'
import { url } from '../constants'
import { Paginated, Alert, ResponseHTTP, paginationProps } from '../interface'
import {AlertServiceInterface, AlertFilterProps} from './interface'

export class AlertServiceHttp implements AlertServiceInterface {
    async getAlerts(paginationOpts: paginationProps, filters?: AlertFilterProps) {
        const {limit, page} = paginationOpts
        try{
            const sessionId = getSessionId()
            let link = `${url.alerts}?limit=${limit}&page=${page}`
            if(filters?.state) link = `${link}&state=${filters.state}`
            if(filters?.priority) link = `${link}&priority=${filters.priority}`
            const data = await client.get<Paginated<Alert>>(link, sessionId)
            return data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Alert error', err.message))
            }
            return Promise.reject(new ServiceError('Alert Error', 'error'))
        }
    }
    
}