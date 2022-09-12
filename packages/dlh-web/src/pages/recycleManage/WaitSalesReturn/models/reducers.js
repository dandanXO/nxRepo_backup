import { WSR_SET_TABLE_DATA, WSR_CHANGE_TABLE_LOADING, WSR_CHANGE_MODAL_VISIBLE, WSR_CHANGE_ROWID } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    rowId: ''
};

const waitSalesReturn = (state =initState, action) => {
    switch (action.type) {
        case WSR_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case WSR_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case WSR_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case WSR_CHANGE_ROWID:
            return { ...state, rowId: action.id };
        default:
            return state;
    }
};
export default waitSalesReturn;