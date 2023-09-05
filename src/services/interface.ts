
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

export interface ResponseHTTP<T> {
    data: T
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
    Role: Role,
    sessionId: string
}

export interface Role {
    id: string,
    name: string
}

export interface Regulation {
    id: string,
    name: string,
    description: string
}

export interface Quiz {
    id: string,
    name: string,
    description: string,
    isCompleted: boolean,
    questionCount: number,
    Regulation: Regulation
}

export interface Alert {
    id: string,
    title: string,
    description: string,
    priority: string,
    state: string,
    Regulation: Regulation
}

export interface QuizForm {
    id: string,
    name: string,
    description: string,
    Regulation: Regulation,
    Questions: Question[]
}

export interface Question {
    id: string,
    description: string,
    hasDoc: boolean,
    isMultiple: boolean,
    Risk: {
        id: string,
        name: string
    }
    Selections: {
        id: string,
        description: string,
        riskScore: number,
        type: string
    }[]
}