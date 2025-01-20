const baseURL = 'http://localhost:8080'

export const api_routes={
    baseURL: baseURL,
    login: baseURL + '/auth/login',
    register: baseURL + '/user',
    user: baseURL + '/user',
    tasks: baseURL + '/tasks'
}