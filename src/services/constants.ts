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
    AML: 'AML'
}

export const mutationKey = {
    QUIZ: 'CREATE_QUIZ',
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
    LOGOUT: 'LOGOUT'
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
    ALL: 'ALL',
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}

export const ALERT_STATE = {
    ALL: 'ALL',
    PENDING: 'pending',
    SOLVED: 'solved',
    CANCELED: 'canceled'
}

export const ALERT_PRIORITY = {
    ALL: 'ALL',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
}

export const RISK = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
}

export const url = {
    login: `${config.backURL}/auths`,
    logout: `${config.backURL}/auths`,
    quizzes: `${config.backURL}/quizzes`,
    quizForm: `${config.backURL}/quizzes/form/:id`,
    answerQuizForm: `${config.backURL}/quizzes/form/:id`,
    roles: `${config.backURL}/roles`,
    regulations: `${config.backURL}/regulations`,
    users: `${config.backURL}/users/:companyId`,
    user: `${config.backURL}/users/:companyId/:userId`,
    updateUser: `${config.backURL}/users/:companyId/:userId`,
    deleteUser: `${config.backURL}/users/:companyId/:userId`,
    createUser: `${config.backURL}/users/:companyId`,
    alerts: `${config.backURL}/alerts`,
    alert: `${config.backURL}/alerts/:id`,
    deleteAlert: `${config.backURL}/alert/:id`,
    editAlert: `${config.backURL}/alert/:id`,
    createAlert: `${config.backURL}/alert`,
    solutions: `${config.backURL}/solutions`,
    solution: `${config.backURL}/solution/:id`,
    editSolution: `${config.backURL}/solution/:id`,
    deleteSolution: `${config.backURL}/solution/:id`,
    createSolution: `${config.backURL}/solution`,
    AML: `${config.backURL}/aml`,
}