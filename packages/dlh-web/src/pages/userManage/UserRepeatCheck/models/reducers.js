import {
    URC_SET_TABLE_DATA,
    URC_CHANGE_TABLE_LOADING,
    // URC_CHANGE_CHECK_STEP,
    URC_CHANGE_DETAIL_DATA ,
    URC_CHANGE_SUBMIT_LOADING,
    URC_SET_USER_ID,
    URC_SET_PIC_LIST,
    URC_SET_CURRENT_USER,
    URC_SET_BTN_DISABLED,
    URC_SET_DEBTS_DATA,
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
    userId: '',
    surplusUser: 0,
    btnDisabled: false
}

const userRepeatCheckManage = (state = initState, action) => {
    switch (action.type) {
        case URC_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case URC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case URC_CHANGE_DETAIL_DATA:
            return { ...state, allData: action.data };
        // case URC_SET_DEBTS_DATA:
        //     return { ...state, allData: action.data };
        // case URC_CHANGE_CHECK_STEP:
        //     return { ...state, current: action.option };
        case URC_CHANGE_SUBMIT_LOADING:
            return { ...state, submitLoading: action.option };
        case URC_SET_USER_ID:
            return { ...state, userId: action.id };
        case URC_SET_PIC_LIST:
            return { ...state, allData: { ...state.allData, data: { ...state.allData.data, picList: action.file }} };
        case URC_SET_CURRENT_USER:
            return { ...state, surplusUser: action.data };
        case URC_SET_BTN_DISABLED:
            return { ...state, btnDisabled: action.option };
        default:
            return state;
    }
}
export default userRepeatCheckManage;