import { QCL_CHANGE_TABLE_LOADING, QCL_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};

const qualityCheckList = (state = initState, action) => {
    switch (action.type) {
        case QCL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case QCL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};
export default qualityCheckList;