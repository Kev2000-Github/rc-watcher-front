import { sleep } from '../../utils/common'
import { Regulation } from '../interface'
import {RegulationServiceInterface} from './interface'

export class RegulationServiceDummy implements RegulationServiceInterface {
    async getRegulations() {
        const regulations: Regulation[] = [
            {
                id: '1',
                name: 'regulacion',
                description: 'regulacion'
            }
        ]
        await sleep(500)
        return regulations
    }
}