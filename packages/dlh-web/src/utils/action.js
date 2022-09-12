const GET = 'GET'
const SET = 'SET'
const LOADING = 'LOADING'

export function createRequestActionTypes (base) {
    return [GET, SET, LOADING].reduce((acc, type) => {
        acc[type] = `${type}_${base}`
        return acc
    }, {})
}

