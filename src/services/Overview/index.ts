import {config} from '../../config'
import {OverviewServiceDummy} from './dummy'
import {OverviewServiceHttp} from './http'
import {OverviewServiceInterface} from './interface'

let overviewService: OverviewServiceInterface
if(config.serviceType === 'dummy'){
    overviewService = new OverviewServiceDummy()
}
else{
    overviewService = new OverviewServiceHttp()
}

export default overviewService