import { OL_RRD_CHANGE_TABLE_LOADING, OL_RRD_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};


const olRefundRecordState = (state = initState, action) => {
    switch (action.type) {
        case OL_RRD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case OL_RRD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        default:
            return state;
    }
}

export default olRefundRecordState;