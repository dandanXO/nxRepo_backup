import { ORS_CHANGE_TABLE_LOADING, ORS_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};


const olsOrderStatisticstate = (state = initState, action) => {
    switch (action.type) {
        case ORS_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case ORS_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        default:
            return state;
    }
}

export default olsOrderStatisticstate;