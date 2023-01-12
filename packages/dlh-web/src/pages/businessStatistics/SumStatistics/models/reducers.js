
import { SUM_CHANGE_TABLE_LOADING, SUM_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: [],
    loading: false
};

const atosStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case SUM_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case SUM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};
export default atosStatisticsState;