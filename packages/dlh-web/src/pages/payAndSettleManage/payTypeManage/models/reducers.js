import { PAY_TYPE_SET_TABLE_DATA, PAY_TYPE_CHANGE_TABLE_LOADING, PAY_TYPE_CHANGE_MODAL_VISIBLE, PAY_TYPE_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        name: '',
        url: ''
    }
}

const channelStatistics = (state = initState, action) => {
    switch (action.type) {
        case PAY_TYPE_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case PAY_TYPE_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case PAY_TYPE_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case PAY_TYPE_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default channelStatistics;