import {config} from '../../config'
import {CountryServiceDummy} from './dummy'
import {CountryServiceHttp} from './http'
import {CountryServiceInterface} from './interface'

let countryService: CountryServiceInterface
if(config.serviceType === 'dummy'){
    countryService = new CountryServiceDummy()
}
else{
    countryService = new CountryServiceHttp()
}

export default countryService