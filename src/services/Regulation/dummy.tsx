import { sleep } from '../../utils/common'
import { Regulation } from '../interface'
import {RegulationServiceInterface} from './interface'

export class RegulationServiceDummy implements RegulationServiceInterface {
    async getRegulations() {
        const regulations: Regulation[] = [
            {
                id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                name: 'AML',
                description: 'AML'
            }
        ]
        await sleep(500)
        return regulations
    }
}