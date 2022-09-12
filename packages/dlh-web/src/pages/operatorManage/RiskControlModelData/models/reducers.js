import { RCMD_CHANGE_TABLE_LOADING, RCMD_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};

const riskControlModelDataState = (state = initState, action) => {
    switch (action.type) {
        case RCMD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case RCMD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};

export default riskControlModelDataState;