
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

interface UserBasic {
    id: string,
    username: string,
    fullName: string,
    email: string
}

export interface User extends UserBasic {
    Company: {
        id: string,
        name: string,
        address: string,
        Country: Country
    },
    Role: Role,
    sessionId: string
}

export interface Country {
    id: string,
    name: string
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

export interface Solution {
    id: string,
    title: string,
    description: string,
    state: string,
    CreatedBy: UserBasic,
    Responsables: UserBasic[],
    Alerts: Alert[],
    Steps: SolutionStep[]
}

export interface SolutionStep {
    id: string,
    description: string,
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
        type: string,
        selected?: boolean
    }[],
    Document?: Document
}

export interface Document {
    id: string,
    name: string,
    type: string,
    file: string
}

export interface AML {
    id: string,
    fullName: string,
    birthdate: Date,
    country: string,
    riskLevel: string,
    riskPoints: number,
    picture: string,
    sanctions: {
        content: string
    }[],
    articles: {
        content: string,
        link: string
    }[]
}

export interface Risk {
    id: string,
    name: string,
    Regulation: Regulation,
    score: number
}

export interface Overview {
    complianceScore: number,
    pendingQuizCount: number,
    affectingRiskCount: number,
    solutionCount: number,
    alertCount: number,
    topAlerts: Alert[],
    topRisks: Risk[]
}