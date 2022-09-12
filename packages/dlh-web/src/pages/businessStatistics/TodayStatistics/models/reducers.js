import { TD_CHANGE_TABLE_LOADING, TD_SET_TABLE_DATA, TD_SET_COLLECTOR_DATA, TD_CHANGE_COLLECTOR_LOADING } from './actions';

const initState = {
    tableData: [],
    loading: false,
    collectorData: [],
    collectorLoading: false
};

const todayStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case TD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case TD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TD_SET_COLLECTOR_DATA:
            return { ...state, collectorData: action.data };
        case TD_CHANGE_COLLECTOR_LOADING:
            return { ...state, collectorLoading: action.option };
        default:
            return state;
    }
};
export default todayStatisticsState;