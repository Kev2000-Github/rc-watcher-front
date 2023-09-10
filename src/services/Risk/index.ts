import {config} from '../../config'
import {RiskServiceDummy} from './dummy'
import {RiskServiceHttp} from './http'
import {RiskServiceInterface} from './interface'

let riskService: RiskServiceInterface
if(config.serviceType === 'dummy'){
    riskService = new RiskServiceDummy()
}
else{
    riskService = new RiskServiceHttp()
}

export default riskService