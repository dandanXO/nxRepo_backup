import { OL_ARD_CHANGE_LOADING, OL_ARD_SET_TABLE_DATA, OL_ARD_CHANGE_VISIBLE, OL_ARD_CHANGE_BTN_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    btnLoading: false
};


const addOlRefundState = (state = initState, action) => {
    switch (action.type) {
        case OL_ARD_CHANGE_LOADING:
            return { ...state, loading: action.option };
        case OL_ARD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case OL_ARD_CHANGE_VISIBLE:
            return { ...state, visible: action.option };
        case OL_ARD_CHANGE_BTN_LOADING:
            return { ...state, btnLoading: action.option };
        default:
            return state;
    }
}
export default addOlRefundState;