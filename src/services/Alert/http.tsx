import { client } from '../../clients'
import { HTTPError } from '../../errors/HTTPError'
import { ServiceError } from '../../errors/ServiceError'
import { getSessionId } from '../../utils/common'
import { url } from '../constants'
import { Paginated, Alert, ResponseHTTP, paginationProps } from '../interface'
import {AlertServiceInterface, AlertFilterProps, createAlertProps, editAlertProps} from './interface'

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

    async createAlert(body: createAlertProps) {
        try{
            const sessionId = getSessionId()
            const resp = await client.post<ResponseHTTP<Alert>>(url.createAlert, body, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Alert error', err.message))
            }
            return Promise.reject(new ServiceError('Alert Error', 'error'))
        }
    }

    async getAlert(id: string) {
        try{
            const sessionId = getSessionId()
            const link = url.alert.replace(':id', id)
            const resp = await client.get<ResponseHTTP<Alert>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Alert error', err.message))
            }
            return Promise.reject(new ServiceError('Alert Error', 'error'))
        }
    }

    async deleteAlert(id: string) {
        try{
            const sessionId = getSessionId()
            const link = url.deleteAlert.replace(':id', id)
            const resp = await client.delete<ResponseHTTP<boolean>>(link, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Alert error', err.message))
            }
            return Promise.reject(new ServiceError('Alert Error', 'error'))
        }
    }

    async editAlert(id: string, props: editAlertProps) {
        try{
            const sessionId = getSessionId()
            const link = url.editAlert.replace(':id', id)
            const resp = await client.put<ResponseHTTP<Alert>>(link, props, sessionId)
            return resp.data
        }
        catch(err){
            if(err instanceof HTTPError){
                return Promise.reject(new ServiceError('Alert error', err.message))
            }
            return Promise.reject(new ServiceError('Alert Error', 'error'))
        }
    }
    
}