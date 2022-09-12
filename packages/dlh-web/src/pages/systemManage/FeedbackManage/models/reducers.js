import { FBM_CHANGE_TABLE_LOADING, FBM_SET_TABLE_DATA, FBM_SET_TYPE_DATA } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    typeData: []
};

const feedbackManage = (state = initState, action) => {
    switch (action.type) {
        case FBM_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case FBM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case FBM_SET_TYPE_DATA:
            return { ...state, typeData: action.data };
        default:
            return state;
    }
}

export default feedbackManage;