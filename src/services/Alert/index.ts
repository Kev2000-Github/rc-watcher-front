import {config} from '../../config'
import {AlertServiceDummy} from './dummy'
import {AlertServiceHttp} from './http'
import {AlertServiceInterface} from './interface'

let alertService: AlertServiceInterface
if(config.serviceType === 'dummy'){
    alertService = new AlertServiceDummy()
}
else{
    alertService = new AlertServiceHttp()
}

export default alertService