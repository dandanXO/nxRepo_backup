import { OR_ED_RRD_CHANGE_TABLE_LOADING, OR_ED_RRD_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};


const overOrderHandleRecordState = (state = initState, action) => {
    switch (action.type) {
        case OR_ED_RRD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case OR_ED_RRD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        default:
            return state;
    }
}

export default overOrderHandleRecordState;