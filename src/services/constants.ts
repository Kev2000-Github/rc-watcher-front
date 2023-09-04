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
    ROLES: 'ROLES'
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

export const url = {
    login: `${config.backURL}/auths`,
    logout: `${config.backURL}/auths`,
    quizzes: `${config.backURL}/quizzes`,
    quizForm: `${config.backURL}/quizzes/form/:id`,
    answerQuizForm: `${config.backURL}/quizzes/form/:id`,
    roles: `${config.backURL}/roles`,
    users: `${config.backURL}/users/:companyId`,
    updateUser: `${config.backURL}/users/:companyId/:userId`
}