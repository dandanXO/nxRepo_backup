import { DL_SET_TABLE_DATA, DL_CHANGE_TABLE_LOADING, DL_CHANGE_FORM_DATA, DL_CHANGE_MODAL_VISIBLE } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    formData: {
        deviceType: '',
        memoryNum: '',
        maxAmount: '',
        isUse: false
    },
    visible: false
}

const userInfoManage = (state = initState, action) => {
    switch (action.type) {
        case DL_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case DL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case DL_CHANGE_FORM_DATA:
            return {...state, formData: action.data};
        case DL_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option }
        default:
            return state;
    }
}
export default userInfoManage;