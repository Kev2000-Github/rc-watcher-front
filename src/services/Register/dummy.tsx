/* eslint-disable @typescript-eslint/no-unused-vars */
import { ServiceError } from '../../errors/ServiceError'
import { sleep } from '../../utils/common'
import {RegisterServiceInterface, registerProps} from './interface'

export class RegisterServiceDummy implements RegisterServiceInterface {
    async register({user}: registerProps) {
        await sleep(500)
        if(user.fullName == 'error'){
          throw new ServiceError('Title','error')
        }
        return {
          id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
          username: 'user1',
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          Company: {
            id: 'efa9d27c-014c-46e9-91c9-8edf0a972b81',
            name: 'ABC Inc.',
            address: '123 Main St',
            Country: {
              id: '5d5f8e10-14a6-4db7-8ef7-82561f3ea9bb',
              name: 'United States',
            },
          },
          Role: {
            id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
            name: 'admin',
          },
          sessionId: '2e8a80d3-7042-472b-975c-5547be065086',
        }      
    }
}