import { WRM_SET_TABLE_DATA, WRM_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    }
}

const waitRepayment = (state = initState, action) => {
    switch (action.type) {
        case WRM_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case WRM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default waitRepayment;