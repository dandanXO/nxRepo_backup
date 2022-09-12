import { CHANNEL_USER_UV_STATISTIC_CHANGE_TABLE_LOADING, CHANNEL_USER_UV_STATISTIC_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {
        data:[],
        pagination: {}
    },
    loading: false
};

const channelUserUVStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case CHANNEL_USER_UV_STATISTIC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case CHANNEL_USER_UV_STATISTIC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default channelUserUVStatisticsState;