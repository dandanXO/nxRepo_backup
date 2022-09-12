import { HLL_SET_TABLE_DATA, HLL_CHANGE_MODAL_VISIBLE, HLL_SET_UPLOAD_FILE } from './actions';


const initState = {
    tableData: [],
    visible: false,
    uploadFile: {}
};

const h5LoanListState = (state = initState, action) => {
    switch (action.type) {
        case HLL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case HLL_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case HLL_SET_UPLOAD_FILE:
            return { ...state, uploadFile: action.data };
        default:
            return state;
    }
}
export default h5LoanListState;