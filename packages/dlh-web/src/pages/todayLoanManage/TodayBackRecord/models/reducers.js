import { TOBR_SET_TABLE_DATA, TOBR_CHANGE_TABLE_LOADING ,TOBR_SET_PAYMENT_DATA} from './actions';


const initState = {
    data: {
        data: [],
        pagination: {}
    },
    loading: false,
    paymentList: []
};

const todayBackRecord = (state = initState, action) => {
    switch (action.type) {
        case TOBR_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TOBR_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case TOBR_SET_PAYMENT_DATA:
            return { ...state, paymentList: action.data };
        default:
            return state;
    }
};
export default todayBackRecord;