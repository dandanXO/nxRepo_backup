import {
    BLC_SET_TABLE_DATA,
    BLC_CHANGE_TABLE_LOADING,
    // BLC_CHANGE_CHECK_STEP,
    BLC_CHANGE_DETAIL_DATA ,
    BLC_CHANGE_SUBMIT_LOADING,
    BLC_CHANGE_BUTTON_LOADING,
    BLC_SET_ORDER_ID,
    BLC_SET_CURRENT_ORDER
} from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    allData: {
        info: {},
        message: {},
        data: {}
    },
    current: 0,
    submitLoading: false,
    orderId: '',
    surplusOrder: 0
}

const businessLastCheckManage = (state = initState, action) => {
    switch (action.type) {
        case BLC_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case BLC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case BLC_CHANGE_DETAIL_DATA:
            return { ...state, allData: action.data };
        // case BLC_CHANGE_CHECK_STEP:
        //     return { ...state, current: action.option };
        case BLC_CHANGE_SUBMIT_LOADING:
            return { ...state, submitLoading: action.option };
        case BLC_CHANGE_BUTTON_LOADING:
                return { ...state, btnLoading: action.option };
        case BLC_SET_ORDER_ID:
            return { ...state, orderId: action.id };
        case BLC_SET_CURRENT_ORDER:
            return { ...state, surplusOrder: action.data };
        default:
            return state;
    }
}
export default businessLastCheckManage;