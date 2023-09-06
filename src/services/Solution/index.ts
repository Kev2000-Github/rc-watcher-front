import {config} from '../../config'
import {SolutionServiceDummy} from './dummy'
import {SolutionServiceHttp} from './http'
import {SolutionServiceInterface} from './interface'

let solutionService: SolutionServiceInterface
if(config.serviceType === 'dummy'){
    solutionService = new SolutionServiceDummy()
}
else{
    solutionService = new SolutionServiceHttp()
}

export default solutionService