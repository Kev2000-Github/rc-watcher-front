import { config } from './../config';
export const selectionType = {
    SIMPLE: 'simple',
    MULTIPLE: 'multiple',
    POSITIVE: 'positive',
    NEGATIVE: 'negative'
}

export const queryKey = {
    QUIZ: 'QUIZ',
    QUIZZES: 'QUIZZES'
}

export const url = {
    login: `${config.backURL}/auths`,
    logout: `${config.backURL}/auths`
}