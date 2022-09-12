import { ADB_SET_TABLE_DATA, ADB_CHANGE_TABLE_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false
};

const alreadyAccountManageState = (state = initState, action) => {
    switch (action.type) {
        case ADB_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case ADB_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        default:
            return state;
    }
}

export default alreadyAccountManageState;