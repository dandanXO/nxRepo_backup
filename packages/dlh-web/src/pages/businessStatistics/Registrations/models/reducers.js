
import { REG_SET_TABLE_DATA, REG_SET_SOURCE_DATA, REG_CHANGE_TABLE_LOADING } from "./actions";

const initState = {
    tableData: [],
    sourceData : [],
    loading: false,
};

const registrationsState = (state = initState, action) => {
    switch (action.type) {
        case REG_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case REG_SET_SOURCE_DATA:
            return {...state, sourceData: action.data};
        case REG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};
export default registrationsState;