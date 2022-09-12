import { MLE_CHANGE_LOADING, MLE_SET_TABLE_DATA, MLE_CHANGE_VISIBLE, MLE_CHANGE_BTN_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    btnLoading: false
};


const addMLoanExtendState = (state = initState, action) => {
    switch (action.type) {
        case MLE_CHANGE_LOADING:
            return { ...state, loading: action.option };
        case MLE_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case MLE_CHANGE_VISIBLE:
            return { ...state, visible: action.option };
        case MLE_CHANGE_BTN_LOADING:
            return { ...state, btnLoading: action.option };
        default:
            return state;
    }
}
export default addMLoanExtendState;