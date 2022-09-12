import {
    PAY_SET_STATISTIC_TABLE_DATA,
    PAY_CHANGE_STATISTIC_TABLE_LOADING
} from './actions';

const initState = {
    tableData: [],
    loading: false
}

const PaymentStatistic = (state = initState, action) => {
    switch (action.type) {
        case PAY_SET_STATISTIC_TABLE_DATA:
            return { ...state, tableData: action.data };
        case PAY_CHANGE_STATISTIC_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default PaymentStatistic;