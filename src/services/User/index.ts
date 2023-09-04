import {config} from '../../config'
import {UserServiceDummy} from './dummy'
import {UserServiceHttp} from './http'
import {UserServiceInterface} from './interface'

let userService: UserServiceInterface
if(config.serviceType === 'dummy'){
    userService = new UserServiceDummy()
}
else{
    userService = new UserServiceHttp()
}

export default userService