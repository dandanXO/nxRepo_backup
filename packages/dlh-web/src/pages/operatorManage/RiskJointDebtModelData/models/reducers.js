import { RJMD_CHANGE_TABLE_LOADING, RJMD_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};

const riskJointDebtModelDataState = (state = initState, action) => {
    switch (action.type) {
        case RJMD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case RJMD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};

export default riskJointDebtModelDataState;