import { WQC_CHANGE_TABLE_LOADING, WQC_SET_TABLE_DATA, WQC_CHANGE_MODAL_VISIBLE, WQC_CHANGE_ROWID } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {

        }
    },
    loading: false,
    visible: false,
    rowId: ''
};

const waitQualityCheckState = (state = initState, action) => {
    switch (action.type) {
        case WQC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case WQC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case WQC_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case WQC_CHANGE_ROWID:
            return { ...state, rowId: action.id };
        default:
            return state;
    }
};
export default waitQualityCheckState;