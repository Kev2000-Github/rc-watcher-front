import { config } from './../config';
export const selectionType = {
    SIMPLE: 'simple',
    MULTIPLE: 'multiple',
    POSITIVE: 'positive',
    NEGATIVE: 'negative'
}

export const queryKey = {
    QUIZ: 'QUIZ',
    QUIZZES: 'QUIZZES', 
    USERS: 'USERS',
    USER: 'USER',
    ROLES: 'ROLES',
    ALERTS: 'ALERTS',
    ALERT: 'ALERT',
    SOLUTIONS: 'SOLUTIONS',
    SOLUTION: 'SOLUTION',
    REGULATIONS: 'REGULATIONS',
    OVERVIEW: 'OVERVIEW',
    AML: 'AML',
    COUNTRIES: 'COUNTRIES',
    RISKS: 'RISKS'
}

export const mutationKey = {
    QUIZ: 'CREATE_QUIZ',
    UPDATE_QUIZ: 'UPDATE_QUIZ',
    USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
    ALERT: 'CREATE_ALERT',
    EDIT_ALERT: 'EDIT_ALERT',
    DELETE_ALERT: 'DELETE_ALERT',
    SOLUTION: 'CREATE_SOLUTION',
    EDIT_SOLUTION: 'EDIT_SOLUTION',
    DELETE_SOLUTION: 'DELETE_SOLUTION',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER'
}

export const quizListFilter = {
    state: {
        ALL: 'all',
        COMPLETED: 'completed',
        PENDING: 'pending'
    },
    include: {
        TAXES: 'Impuestos',
        SECURITY: 'Seguridad',
        AML: 'AML',
    }
}

export const SOLUTION_STATE = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}

export const SOLUTION_STATE_FILTER = {
    ALL: 'ALL',
    ...SOLUTION_STATE
}

export const ALERT_STATE = {
    PENDING: 'pending',
    SOLVED: 'solved',
    CANCELED: 'canceled'
}

export const ALERT_PRIORITY = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
}

export const ALERT_STATE_FILTER = {
    ALL: 'ALL',
    ...ALERT_STATE
}

export const ALERT_PRIORITY_FILTER = {
    ALL: 'ALL',
    ...ALERT_PRIORITY
}

export const RISK = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
}

export const ROLES = {
    ADMIN: 'admin',
    OPERATOR: 'operativo',
    AUDITOR: 'auditor'
}

export const url = {
    login: `${config.backURL}/auths`,
    logout: `${config.backURL}/auths`,
    register: `${config.backURL}/registrations`,
    quizzes: `${config.backURL}/quizzes`,
    quizForm: `${config.backURL}/quizzes/form/:id`,
    answerQuizForm: `${config.backURL}/quizzes/form/:id`,
    roles: `${config.backURL}/roles`,
    overview: `${config.backURL}/overviews`,
    regulations: `${config.backURL}/regulations`,
    users: `${config.backURL}/users/:companyId`,
    user: `${config.backURL}/users/:companyId/:userId`,
    updateUser: `${config.backURL}/users/:companyId/:userId`,
    deleteUser: `${config.backURL}/users/:companyId/:userId`,
    createUser: `${config.backURL}/users/:companyId`,
    alerts: `${config.backURL}/alerts`,
    alert: `${config.backURL}/alerts/:id`,
    deleteAlert: `${config.backURL}/alerts/:id`,
    editAlert: `${config.backURL}/alerts/:id`,
    createAlert: `${config.backURL}/alerts`,
    solutions: `${config.backURL}/solutions`,
    solution: `${config.backURL}/solutions/:id`,
    editSolution: `${config.backURL}/solutions/:id`,
    deleteSolution: `${config.backURL}/solutions/:id`,
    createSolution: `${config.backURL}/solutions`,
    AML: `${config.backURL}/amlProfiles`,
    countries: `${config.backURL}/countries`,
    document: `${config.backURL}/quizzes/document/:id`,
    risks: `${config.backURL}/risks`
}