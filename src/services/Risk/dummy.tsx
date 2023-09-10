import { sleep } from '../../utils/common'
import { paginationProps } from '../interface'
import {RiskServiceInterface} from './interface'

export class RiskServiceDummy implements RiskServiceInterface {
    async getRisks(paginationOpts: paginationProps) {
        await sleep(500)
        const TOTAL_ALERTS = 100
        const {limit, page} = paginationOpts
        return {
          data: [
            {
              id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
              name: 'riesgo 1',
              Regulation: {
                id: '1',
                name: 'name',
                description: 'hola como estas'
              },
              score: 1
            },
            {
              id: 'b88a3027-ff78-4a5d-9cd1-462b2f3b0d3e',
              name: 'riesgo 2',
              Regulation: {
                id: '1',
                name: 'name',
                description: 'hola como estas'
              },
              score: 1
            },
            {
              id: '1f2f45ed-1a1e-4eb5-94c6-6ca16f29d350',
              name: 'riesgo 3',
              Regulation: {
                id: '1',
                name: 'name',
                description: 'hola como estas'
              },
              score: 1
            },
          ],
          page,
          items: limit,
          totalPages: Math.floor(TOTAL_ALERTS/limit)
        }
    }
}