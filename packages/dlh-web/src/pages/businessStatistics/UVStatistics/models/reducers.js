import { UV_STATISTIC_CHANGE_TABLE_LOADING, UV_STATISTIC_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {
        data:[],
        pagination: {}
    },
    loading: false
};

const UVStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case UV_STATISTIC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case UV_STATISTIC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default UVStatisticsState;