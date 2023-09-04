import {config} from '../../config'
import {RoleServiceDummy} from './dummy'
import {RoleServiceHttp} from './http'
import {RoleServiceInterface} from './interface'

let roleService: RoleServiceInterface
if(config.serviceType === 'dummy'){
    roleService = new RoleServiceDummy()
}
else{
    roleService = new RoleServiceHttp()
}

export default roleService