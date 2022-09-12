import { SRL_CHANGE_TABLE_LOADING, SRL_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};

const salesReturnListState = (state = initState, action) => {
    switch (action.type) {
        case SRL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case SRL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default salesReturnListState;