import { DUE_OR_CHANGE_LOADING, DUE_OR_SET_TABLE_DATA, DUE_OR_CHANGE_VISIBLE, DUE_OR_CHANGE_BTN_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    btnLoading: false
};


const overdueReductionState = (state = initState, action) => {
    switch (action.type) {
        case DUE_OR_CHANGE_LOADING:
            return { ...state, loading: action.option };
        case DUE_OR_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case DUE_OR_CHANGE_VISIBLE:
            return { ...state, visible: action.option };
        case DUE_OR_CHANGE_BTN_LOADING:
            return { ...state, btnLoading: action.option };
        default:
            return state;
    }
}
export default overdueReductionState;