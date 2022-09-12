import { RFM_SET_TABLE_DATA, RFM_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    }
}

const riskFeeListManage = (state = initState, action) => {
    switch (action.type) {
        case RFM_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case RFM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default riskFeeListManage;