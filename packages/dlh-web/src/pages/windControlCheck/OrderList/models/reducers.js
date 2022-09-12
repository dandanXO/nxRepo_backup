import {
    ORL_SET_TABLE_DATA,
    ORL_CHANGE_TABLE_LOADING,
    ORL_SET_ORDER_DETAIL,
    ORL_CHANGE_DETAIL_MODAL,
    ORL_CHANGE_AUTH_MODAL,
    ORL_SET_AUTH_DATA
} from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    info: {
        icloud: {}
    },
    authData: [],
    authVisible: false,
    detailVisible: false
}

const orderListManage = (state = initState, action) => {
    switch (action.type) {
        case ORL_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case ORL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case ORL_SET_ORDER_DETAIL:
            return { ...state, info: action.data };
        case ORL_CHANGE_DETAIL_MODAL:
            return { ...state, detailVisible: action.option };
        case ORL_CHANGE_AUTH_MODAL:
            return { ...state, authVisible: action.option };
        case ORL_SET_AUTH_DATA:
            return { ...state, authData: action.data };
        default:
            return state;
    }
}
export default orderListManage;