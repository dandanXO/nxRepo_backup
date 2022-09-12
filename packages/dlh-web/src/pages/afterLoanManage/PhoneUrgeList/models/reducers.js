import { PUL_SET_TABLE_DATA, PUL_CHANGE_TABLE_LOADING, PUL_CHANGE_SEARCH_PARAMS } from './actions';


const initState = {
    tableData: {
        data: [],
        pagination: {
            pageSize: 10,
            current: 1
        }
    },
    loading: false,
    params: {
        time: [],
        phoneNo: '',
        name: '',
        orderNo: '',
        orderStatus: '0'
    }
}

const phoneUrgeListState = (state = initState, action) => {
    switch (action.type) {
        case PUL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case PUL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case PUL_CHANGE_SEARCH_PARAMS:
            return { ...state, params: action.params };
        default:
            return state;
    }
}
export default phoneUrgeListState;