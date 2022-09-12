import { LRS_CHANGE_TABLE_LOADING, LRS_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: []
    },
    loading: false
};

const loanRecycleStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case LRS_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case LRS_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};

export default loanRecycleStatisticsState;