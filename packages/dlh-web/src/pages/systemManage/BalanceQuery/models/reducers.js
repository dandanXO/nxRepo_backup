import { SET_BALANCE_QUERY_DATA } from './actions';

const initState = {
    balanceQueryData:[],
}

const balanceQueryManage = (state = initState, action) => {
    switch (action.type) {
        case SET_BALANCE_QUERY_DATA:
            return { ...state, balanceQueryData: action.data };
        default:
            return state;
    }
}
export default balanceQueryManage;