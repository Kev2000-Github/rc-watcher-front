export interface httpErrorProps {
    code: string,
    message: string,
    status: number
}
const defaultProps: httpErrorProps = {
    code: 'default_error',
    message: 'Error',
    status: 10
}

export class HTTPError extends Error {
    code: string
    message: string
    status: number
    constructor(props?: httpErrorProps){
        super()
        const data = {...defaultProps, ...props}
        this.code = data.code
        this.message = data.message
        this.status = data.status
    }
}