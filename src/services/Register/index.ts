import {config} from '../../config'
import {RegisterServiceDummy} from './dummy'
import {RegisterServiceHttp} from './http'
import {RegisterServiceInterface} from './interface'

let registerService: RegisterServiceInterface
if(config.serviceType === 'dummy'){
    registerService = new RegisterServiceDummy()
}
else{
    registerService = new RegisterServiceHttp()
}

export default registerService