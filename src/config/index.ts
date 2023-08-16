/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

interface configuration {
    env: 'development'|'production',
    backURL: string
}

export const config: configuration = {
    env: import.meta.env['VITE_NODE_ENV'] === 'development' ? 'development' : 'production',
    backURL: import.meta.env['VITE_APP_URL'] ?? ''
}