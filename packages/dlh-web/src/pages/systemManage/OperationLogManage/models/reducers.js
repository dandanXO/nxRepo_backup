import {
    OLMG_CHANGE_TABLE_LOADING,
    OLMG_SET_MAPPING_LIST_DATA,
    OLMG_SET_TABLE_DATA ,
} from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    departmentData: [],
    roleData: []
}


const operationLogManageState = (state = initState, action) => {
    switch (action.type) {
        case OLMG_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case OLMG_SET_MAPPING_LIST_DATA:
            return { ...state, mappingListData: action.data };
        case OLMG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};
export default operationLogManageState;

