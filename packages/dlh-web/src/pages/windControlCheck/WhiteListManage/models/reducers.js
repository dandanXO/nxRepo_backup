import { WLM_SET_TABLE_DATA, WLM_CHANGE_TABLE_LOADING, WLM_CHANGE_MODAL_VISIBLE, WLM_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        userTrueName: '',
        phoneNo: '',
        idcardNo:'',
        reason:''
    }
}

const whiteStatistics = (state = initState, action) => {
    switch (action.type) {
        case WLM_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case WLM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case WLM_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case WLM_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default whiteStatistics;