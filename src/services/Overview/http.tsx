import { Overview, ResponseHTTP } from '../interface'
import {OverviewServiceInterface} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class OverviewServiceHttp implements OverviewServiceInterface {
    async getOverview() {
        try{
            const sessionId = getSessionId()
            const link = `${url.roles}`
            const resp = await client.get<ResponseHTTP<Overview>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Overview Error', err.message))
            }
            return Promise.reject(new ServiceError('Overview Error', 'error'))
        }
    }
}