import { RCCF_SET_TABLE_DATA, RCCF_CHANGE_TABLE_LOADING, RCCF_CHANGE_MODAL_VISIBLE, RCCF_CHANGE_MODAL_INFO } from './actions';


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

const riskControlConfigManage = (state = initState, action) => {
    switch (action.type) {
        case RCCF_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case RCCF_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RCCF_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case RCCF_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default riskControlConfigManage;