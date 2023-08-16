
export interface User {
    id: string,
    username: string,
    fullName: string,
    email: string,
    Company: {
        id: string,
        name: string,
        address: string,
        Country: {
            id: string,
            name: string,
        }
    },
    Role: {
        id: string,
        name: string
    }
}