import {
    SJ_CHANGE_MODAL_VISIBLE,
    SJ_CHANGE_TABLE_LOADING,
    SJ_SET_TABLE_DATA
} from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false
}


const scheduleJobManageState = (state = initState, action) => {
    switch (action.type) {
        case SJ_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case SJ_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case SJ_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        default:
            return state;
    }
};
export default scheduleJobManageState;

