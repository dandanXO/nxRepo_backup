import {
    ULC_SET_TABLE_DATA,
    ULC_CHANGE_TABLE_LOADING,
    // ULC_CHANGE_CHECK_STEP,
    ULC_CHANGE_DETAIL_DATA ,
    ULC_CHANGE_SUBMIT_LOADING,
    ULC_CHANGE_BUTTON_LOADING,
    ULC_SET_USER_ID,
    ULC_SET_CURRENT_USER
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
    surplusUser: 0
}

const userLastCheckManage = (state = initState, action) => {
    switch (action.type) {
        case ULC_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case ULC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case ULC_CHANGE_DETAIL_DATA:
            return { ...state, allData: action.data };
        // case ULC_CHANGE_CHECK_STEP:
        //     return { ...state, current: action.option };
        case ULC_CHANGE_SUBMIT_LOADING:
            return { ...state, submitLoading: action.option };
        case ULC_CHANGE_BUTTON_LOADING:
                return { ...state, btnLoading: action.option };
        case ULC_SET_USER_ID:
            return { ...state, userId: action.id };
        case ULC_SET_CURRENT_USER:
            return { ...state, surplusUser: action.data };
        default:
            return state;
    }
}
export default userLastCheckManage;