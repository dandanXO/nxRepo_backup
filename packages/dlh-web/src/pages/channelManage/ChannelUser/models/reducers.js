import { CHL_U_SET_TABLE_DATA, CHL_U_CHANGE_TABLE_LOADING, CHL_U_CHANGE_MODAL_VISIBLE, CHL_U_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        userName:'', 
        userPhone:'' , 
        channelId:'',
        state:'',
        pass:'',
        showField:''
    }
}

const channelUserStatistics = (state = initState, action) => {
    switch (action.type) {
        case CHL_U_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case CHL_U_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CHL_U_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case CHL_U_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default channelUserStatistics;