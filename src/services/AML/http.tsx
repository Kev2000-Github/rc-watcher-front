import { AML, ResponseHTTP } from '../interface'
import {AMLFilter, AMLServiceInterface} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class AMLServiceHttp implements AMLServiceInterface {
    async getAML(props: AMLFilter) {
        try{
            const sessionId = getSessionId()
            const formattedName = props.name.replace(' ', '-')
            let link = `${url.AML}?fullName=${formattedName}`
            if(props.country) link = `${link}&country=${props.country}`
            const resp = await client.get<ResponseHTTP<AML>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('AML Error', err.message))
            }
            return Promise.reject(new ServiceError('AML Error', 'error'))
        }
    }
}