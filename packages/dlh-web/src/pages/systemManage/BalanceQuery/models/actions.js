export const GET_ALL_BALANCE_QUERY_DATA = 'GET_ALL_BALANCE_QUERY_DATA';
export const GET_BALANCE_QUERY_DATA = 'GET_BALANCE_QUERY_DATA';
export const SET_BALANCE_QUERY_DATA = 'SET_BALANCE_QUERY_DATA';

export const getAllBalanceQuery = (params) => ({ type: GET_ALL_BALANCE_QUERY_DATA, params });
export const getBalanceQuery = (params) => ({ type: GET_BALANCE_QUERY_DATA, params });

export const setBalanceQuery = (data) => ({ type: SET_BALANCE_QUERY_DATA, data });

