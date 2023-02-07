import { NOSC_CHANGE_TABLE_LOADING, NOSC_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {},
    loading: false
};

const newOverdueStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case NOSC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case NOSC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default newOverdueStatisticsState;