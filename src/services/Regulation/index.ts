import {config} from '../../config'
import {RegulationServiceDummy} from './dummy'
import {RegulationServiceHttp} from './http'
import {RegulationServiceInterface} from './interface'

let regulationService: RegulationServiceInterface
if(config.serviceType === 'dummy'){
    regulationService = new RegulationServiceDummy()
}
else{
    regulationService = new RegulationServiceHttp()
}

export default regulationService