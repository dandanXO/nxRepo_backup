import { SETTLE_MCH_SET_TABLE_DATA, SETTLE_MCH_CHANGE_TABLE_LOADING, SETTLE_MCH_CHANGE_MODAL_VISIBLE, SETTLE_MCH_CHANGE_MODAL_INFO } from './actions';


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
        case SETTLE_MCH_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case SETTLE_MCH_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case SETTLE_MCH_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case SETTLE_MCH_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default channelStatistics;