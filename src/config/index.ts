 
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

interface configuration {
    serviceType: string,
    backURL: string
}

export const config: configuration = {
    serviceType: import.meta.env['VITE_SERVICE_TYPE'],
    backURL: import.meta.env['VITE_APP_URL']
}