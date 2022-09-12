import { CRD_SET_TABLE_DATA, CRD_CHANGE_TABLE_LOADING, CRD_SET_OPERATOR } from './actions';


const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    operatorData: []
};



const checkRecordState = (state = initState, action) => {
    switch (action.type) {
        case CRD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CRD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case CRD_SET_OPERATOR:
            return { ...state, operatorData: action.data };
        default:
            return state;
    }
};

export default checkRecordState;
