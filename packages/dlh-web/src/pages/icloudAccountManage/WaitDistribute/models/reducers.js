import { WDB_CHANGE_MODAL_LOADING, WDB_CHANGE_MODAL_VISIBLE, WDB_SET_TABLE_DATA, WDB_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    visible: false,
    modalBtnLoading: false,
    loading: false,
    data: {
        data:[],
        pagination: {},
    }
}

const waitDistributeState = (state = initState , action) => {

    switch (action.type) {
        case WDB_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case WDB_CHANGE_MODAL_LOADING:
            return { ...state, modalBtnLoading: action.option };
        case WDB_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case WDB_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default waitDistributeState;
