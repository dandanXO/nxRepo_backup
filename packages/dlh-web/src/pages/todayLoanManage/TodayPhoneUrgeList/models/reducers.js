import { TPUL_SET_TABLE_DATA, TPUL_CHANGE_TABLE_LOADING, TPUL_CHANGE_SEARCH_PARAMS } from './actions';


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

const todayPhoneUrgeListState = (state = initState, action) => {
    switch (action.type) {
        case TPUL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case TPUL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TPUL_CHANGE_SEARCH_PARAMS:
            return { ...state, params: action.params };
        default:
            return state;
    }
}
export default todayPhoneUrgeListState;