import {
    WCC_SET_TABLE_DATA,
    WCC_CHANGE_TABLE_LOADING,
    // WCC_CHANGE_CHECK_STEP,
    WCC_CHANGE_DETAIL_DATA ,
    WCC_CHANGE_SUBMIT_LOADING,
    WCC_SET_ORDER_ID,
    WCC_SET_PIC_LIST,
    WCC_SET_CURRENT_ORDER,
    WCC_SET_BTN_DISABLED,
    WCC_SET_DEBTS_DATA,
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
    surplusOrder: 0,
    btnDisabled: false
}

const businessRepeatCheckManage = (state = initState, action) => {
    switch (action.type) {
        case WCC_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case WCC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case WCC_CHANGE_DETAIL_DATA:
            return { ...state, allData: action.data };
        // case WCC_SET_DEBTS_DATA:
        //     return { ...state, allData: action.data };
        // case WCC_CHANGE_CHECK_STEP:
        //     return { ...state, current: action.option };
        case WCC_CHANGE_SUBMIT_LOADING:
            return { ...state, submitLoading: action.option };
        case WCC_SET_ORDER_ID:
            return { ...state, orderId: action.id };
        case WCC_SET_PIC_LIST:
            return { ...state, allData: { ...state.allData, data: { ...state.allData.data, picList: action.file }} };
        case WCC_SET_CURRENT_ORDER:
            return { ...state, surplusOrder: action.data };
        case WCC_SET_BTN_DISABLED:
            return { ...state, btnDisabled: action.option };
        default:
            return state;
    }
}
export default businessRepeatCheckManage;