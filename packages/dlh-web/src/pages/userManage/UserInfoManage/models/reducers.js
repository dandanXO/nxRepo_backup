import {
    UIM_SET_TABLE_DATA,
    UIM_CHANGE_TABLE_LOADING,
    UIM_CHANGE_VISIBLE,
    UIM_CHANGE_ADD_MODAL_VISIBLE,
    UIM_SET_DETAIL_DATA,
    UIM_DETAIL_VISIBLE,
    UIM_SET_APPLY_DATA,
    UIM_SET_CONTACTS_DATA,
    UIM_SET_OPERATOR_DATA,
    UIM_CHANGE_MODAL_LOADING,
    UIM_SET_SMS_LOG_DATA
} from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    addModalVisible: false,
    infoVisible: false,
    info: {
        userInfo: {},
        applyData: [],
        operatorData: [],
        contactsData: [],
        smsLogData: [],
    },
    modalLoading: false
}

const userInfoManage = (state = initState, action) => {
    switch (action.type) {
        case UIM_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case UIM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case UIM_CHANGE_VISIBLE:
            return { ...state, visible: action.option };   
        case UIM_CHANGE_ADD_MODAL_VISIBLE:
            return { ...state, addModalVisible: action.option };   
        case UIM_DETAIL_VISIBLE:
            return { ...state, infoVisible: action.option };
        case UIM_SET_DETAIL_DATA:
            return { ...state, info: { ...state.info, userInfo: action.data } };
        case UIM_SET_APPLY_DATA:
            return { ...state, info: { ...state.info, applyData: action.data } };
        case UIM_SET_OPERATOR_DATA:
            return { ...state, info: { ...state.info, operatorData: action.data } };
        case UIM_SET_CONTACTS_DATA:
            return { ...state, info: { ...state.info, contactsData: action.data } };
        case UIM_SET_SMS_LOG_DATA:
            return { ...state, info: { ...state.info, smsLogData: action.data } };
        case UIM_CHANGE_MODAL_LOADING:
            return { ...state, modalLoading: action.option };
        default:
            return state;
    }
}
export default userInfoManage;