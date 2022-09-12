import { RISK_S_SET_TABLE_DATA, RISK_S_CHANGE_TABLE_LOADING, RISK_S_CHANGE_MODAL_VISIBLE, RISK_S_CHANGE_MODAL_INFO } from './actions';


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

const riskSwitchManage = (state = initState, action) => {
    switch (action.type) {
        case RISK_S_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case RISK_S_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RISK_S_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case RISK_S_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default riskSwitchManage;