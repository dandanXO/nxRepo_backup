import { ASSET_DETAIL_SET_TABLE_DATA, ASSET_DETAIL_CHANGE_TABLE_LOADING} from './actions';


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
        case ASSET_DETAIL_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case ASSET_DETAIL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default channelStatistics;