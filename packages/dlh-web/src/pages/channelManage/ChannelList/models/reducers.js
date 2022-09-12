import { CHL_SET_TABLE_DATA, CHL_CHANGE_TABLE_LOADING, CHL_CHANGE_MODAL_VISIBLE,CHL_SET_ROLE_DATA, CHL_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        name: '',
        url: '',
        modelName:'',
        campaign:''
    },
    roleData: []
}

const channelStatistics = (state = initState, action) => {
    switch (action.type) {
        case CHL_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case CHL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CHL_SET_ROLE_DATA:
            return { ...state, roleData: action.data };    
        case CHL_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case CHL_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default channelStatistics;