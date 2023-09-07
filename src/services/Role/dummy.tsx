import { sleep } from '../../utils/common'
import {RoleServiceInterface} from './interface'

export class RoleServiceDummy implements RoleServiceInterface {
    async getRoles() {
        await sleep(500)
        return [
            {
              id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
              name: 'admin',
            },
            {
              id: 'b88a3027-ff78-4a5d-9cd1-462b2f3b0d3e',
              name: 'operador',
            },
            {
              id: '1f2f45ed-1a1e-4eb5-94c6-6ca16f29d350',
              name: 'auditor',
            },
          ]          
    }
}