import { RRD_SET_TABLE_DATA, RRD_CHANGE_TABLE_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};


const refundRecordState = (state = initState, action) => {
    switch (action.type) {
        case RRD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RRD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        default:
            return state;
    }
}

export default refundRecordState;