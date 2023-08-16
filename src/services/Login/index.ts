import {config} from '../../config'
import {LoginServiceDummy} from './dummy'
import {LoginServiceHttp} from './http'
import {LoginServiceInterface} from './interface'

let loginService: LoginServiceInterface
if(config.env === 'development'){
    loginService = new LoginServiceDummy()
}
else{
    loginService = new LoginServiceHttp()
}

export default loginService