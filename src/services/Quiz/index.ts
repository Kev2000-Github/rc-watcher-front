import {config} from '../../config'
import {QuizServiceDummy} from './dummy'
import {QuizServiceHttp} from './http'
import {QuizServiceInterface} from './interface'

let quizService: QuizServiceInterface
if(config.serviceType === 'dummy'){
    quizService = new QuizServiceDummy()
}
else{
    quizService = new QuizServiceHttp()
}

export default quizService