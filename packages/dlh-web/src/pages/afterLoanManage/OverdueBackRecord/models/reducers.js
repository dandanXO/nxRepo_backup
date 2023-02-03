import { OBR_SET_TABLE_DATA, OBR_CHANGE_TABLE_LOADING, OBR_SET_PAYMENT_DATA } from './actions';


const initState = {
    data: {
        data: [],
        pagination: {}
    },
    loading: false,
    paymentList: []
};

const overdueBackRecord = (state = initState, action) => {
    switch (action.type) {
        case OBR_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case OBR_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case OBR_SET_PAYMENT_DATA:
            return { ...state, paymentList: action.data };
        default:
            return state;
    }
};
export default overdueBackRecord;