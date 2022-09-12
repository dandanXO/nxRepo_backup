import { IST_CHANGE_TABLE_LOADING, IST_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {
    },
    loading: false
};

const indexStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case IST_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case IST_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};

export default indexStatisticsState;