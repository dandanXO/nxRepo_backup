import { ARD_CHANGE_VISIBLE, ARD_SET_TABLE_DATA, ARD_CHANGE_LOADING, ARD_CHANGE_BTN_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    btnLoading: false
};


const addRefundState = (state = initState, action) => {
    switch (action.type) {
        case ARD_CHANGE_LOADING:
            return { ...state, loading: action.option };
        case ARD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case ARD_CHANGE_VISIBLE:
            return { ...state, visible: action.option };
        case ARD_CHANGE_BTN_LOADING:
            return { ...state, btnLoading: action.option };
        default:
            return state;
    }
}
export default addRefundState;