import {config} from '../../config'
import {AMLServiceDummy} from './dummy'
import {AMLServiceHttp} from './http'
import {AMLServiceInterface} from './interface'

let amlService: AMLServiceInterface
if(config.serviceType === 'dummy'){
    amlService = new AMLServiceDummy()
}
else{
    amlService = new AMLServiceHttp()
}

export default amlService