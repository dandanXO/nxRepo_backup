import { OSC_CHANGE_TABLE_LOADING, OSC_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: [],
    loading: false
};

const overdueStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case OSC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case OSC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default overdueStatisticsState;