import { FWL_CHANGE_TABLE_LOADING, FWL_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};

const followListState = (state = initState, action) => {
    switch (action.type) {
        case FWL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case FWL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default followListState;
