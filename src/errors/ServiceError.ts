export class ServiceError extends Error {
    title: string
    message: string
    constructor(title: string, message: string){
        super()
        this.title = title
        this.message = message
    }
}