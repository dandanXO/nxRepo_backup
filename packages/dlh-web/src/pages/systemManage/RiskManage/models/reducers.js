import { CFR_SET_TABLE_DATA, CFR_CHANGE_TABLE_LOADING, CFR_CHANGE_MODAL_VISIBLE, CFR_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        name: ''
    }
}

const riskManage = (state = initState, action) => {
    switch (action.type) {
        case CFR_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case CFR_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CFR_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case CFR_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default riskManage;