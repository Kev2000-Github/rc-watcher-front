import { client } from '../../clients'
import { HTTPError } from '../../errors/HTTPError'
import { ServiceError } from '../../errors/ServiceError'
import { getSessionId } from '../../utils/common'
import { url } from '../constants'
import { Paginated, Solution, ResponseHTTP, paginationProps } from '../interface'
import {SolutionServiceInterface, SolutionFilterProps, createSolutionProps} from './interface'

export class SolutionServiceHttp implements SolutionServiceInterface {
    async getSolutions(paginationOpts: paginationProps, filters?: SolutionFilterProps) {
        const {limit, page} = paginationOpts
        try{
            const sessionId = getSessionId()
            let link = `${url.solutions}?limit=${limit}&page=${page}`
            if(filters?.state) link = `${link}&state=${filters.state}`
            const data = await client.get<Paginated<Solution>>(link, sessionId)
            return data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Solution error', err.message))
            }
            return Promise.reject(new ServiceError('Solution Error', 'error'))
        }
    }

    async createSolution(body: createSolutionProps) {
        try{
            const sessionId = getSessionId()
            const resp = await client.post<ResponseHTTP<Solution>>(url.createSolution, body, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Solution error', err.message))
            }
            return Promise.reject(new ServiceError('Solution Error', 'error'))
        }
    }

    async getSolution(id: string) {
        try{
            const sessionId = getSessionId()
            const link = url.solution.replace(':id', id)
            const resp = await client.get<ResponseHTTP<Solution>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Solution error', err.message))
            }
            return Promise.reject(new ServiceError('Solution Error', 'error'))
        }
    }
    
}