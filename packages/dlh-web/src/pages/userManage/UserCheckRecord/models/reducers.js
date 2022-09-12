import { UCRD_SET_TABLE_DATA, UCRD_CHANGE_TABLE_LOADING, UCRD_SET_OPERATOR } from './actions';


const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    operatorData: []
};



const userCheckRecordState = (state = initState, action) => {
    switch (action.type) {
        case UCRD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case UCRD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case UCRD_SET_OPERATOR:
            return { ...state, operatorData: action.data };
        default:
            return state;
    }
};

export default userCheckRecordState;
