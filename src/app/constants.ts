
export const routes = {
    LOGIN: '/',
    REGISTER: '/signup',
    DASHBOARD: '/dashboard',
    QUIZ: '/quiz',
    QUIZ_FORM: '/quiz/:id',
    UPDATE_QUIZ_FORM: '/quiz/edit/:id',
    USERS: '/users',
    ALERTS: '/alerts',
    ALERT: '/alert/:id',
    EDIT_ALERT: '/alert/edit/:id',
    CREATE_ALERT: '/alert',
    SOLUTIONS: '/solutions',
    SOLUTION: '/solution/:id',
    EDIT_SOLUTION: '/solution/edit/:id',
    CREATE_SOLUTION: '/solution',
    AML: '/AML',
    RISKS: '/risks',
    NOT_FOUND: '*',
}

export const pagination = {
    DEFAULT_PAGE: 1,
    LIMIT: 6
}