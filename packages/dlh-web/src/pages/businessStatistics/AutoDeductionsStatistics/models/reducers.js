import { ADSC_CHANGE_TABLE_LOADING, ADSC_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {
        data:[],
        pagination: {}
    },
    loading: false
};

const autoDeductionsStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case ADSC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case ADSC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default autoDeductionsStatisticsState;