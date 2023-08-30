/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { HTTP_CODES } from '../errors/constants';
import { routes } from '../app/constants';
import { Client } from './interface';
import { HTTPError, httpErrorProps } from '../errors/HTTPError';

export class ClientHTTP implements Client {
    sessionId: string
    private _transport: AxiosInstance

    constructor(){
        this.sessionId = ''
        this._transport = axios.create()
        this._transport.interceptors.response.use(
          (response) => response, 
          async (error: AxiosError) => {
            const originalRequestURL = error.config?.url ?? ''
            if (
              error.response?.status === HTTP_CODES.UNAUTHORIZED &&
              originalRequestURL.indexOf("/auths") === -1
            ) {
              return window.location.replace(routes.LOGIN)
            }
            return Promise.reject(error)
        })
    }

    async put<T>(url: string, body: object, sessionId: string) {
      try {
        const headers = { authorization: sessionId }
        const resp = await this._transport.put<T>(url, body, { headers })
        return resp.data
      }
      catch (err) {
        if(err instanceof AxiosError){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps))
        }
        return Promise.reject(err)
      }
    }

    async post<T>(url: string, body: object, sessionId: string) {
      try {
        const headers = { authorization: sessionId }
        const resp = await this._transport.post<T>(url, body, { headers })
        return resp.data
      }
      catch (err) {
        if(err instanceof AxiosError){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps))
        }
        return Promise.reject(err)
      }
    }

    async delete<T>(url: string, sessionId: string) {
      try {
        const headers = { authorization: sessionId }
        const resp = await this._transport.delete<T>(url, { headers })
        return resp.data
      }
      catch (err) {
        if(err instanceof AxiosError){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps))
        }
        return Promise.reject(err)
      }
    }

    async get<T>(url: string, sessionId: string) {
      try {
        const headers = { authorization: sessionId }
        const resp = await this._transport.get<T>(url, { headers })
        return resp.data
      }
      catch (err) {
        if(err instanceof AxiosError){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return Promise.reject(new HTTPError(err.response?.data?.error as httpErrorProps))
        }
        return Promise.reject(err)
      }
    }
}