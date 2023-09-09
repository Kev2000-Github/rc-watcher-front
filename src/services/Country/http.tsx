import { Country, Paginated } from '../interface'
import {CountryServiceInterface} from './interface'
import { client } from '../../clients'
import { url } from '../constants'
import { ServiceError } from '../../errors/ServiceError'
import { HTTPError } from '../../errors/HTTPError'
import { getSessionId } from '../../utils/common'

export class CountryServiceHttp implements CountryServiceInterface {
    async getCountries() {
        try{
            const sessionId = getSessionId()
            const link = `${url.countries}?limit=300`
            const resp = await client.get<Paginated<Country>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Country Error', err.message))
            }
            return Promise.reject(new ServiceError('Country Error', 'error'))
        }
    }
}