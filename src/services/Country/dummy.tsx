/* eslint-disable @typescript-eslint/no-unused-vars */
import { sleep } from '../../utils/common'
import {CountryServiceInterface} from './interface'

export class CountryServiceDummy implements CountryServiceInterface {
    async getCountries() {
        await sleep(500)
        return [
          {
            id: '1',
            name: 'Venezuela'
          },
          {
            id: '1',
            name: 'Argentina'
          },
          {
            id: '1',
            name: 'Colombia'
          },
        ]  
    }
}