import { ADS_CHANGE_TABLE_LOADING, ADS_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {
    },
    loading: false
};

const allDataStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case ADS_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case ADS_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};

export default allDataStatisticsState;