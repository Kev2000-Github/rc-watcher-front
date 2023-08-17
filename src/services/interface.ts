
export interface paginationProps {
    limit: number,
    page: number
}

export interface Paginated<T> {
    data: Array<T>,
    page: number,
    items: number,
    totalPages: number
}

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

export interface Quiz {
    id: string,
    name: string,
    description: string,
    isCompleted: boolean,
    questionCount: number,
    Regulation: {
        id: string,
        name: string,
        description: string
    }
}