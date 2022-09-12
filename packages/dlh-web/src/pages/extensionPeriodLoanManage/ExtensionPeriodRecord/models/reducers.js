import { EP_RED_CHANGE_TABLE_LOADING, EP_RED_SET_TABLE_DATA, EP_RED_SET_MODAL_DATA, EP_RED_CHANGE_MODAL_LOADING, EP_RED_CHANGE_MODAL_VISIBLE } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    modalLoading: false,
    modalData: {
        data: [],
        pagination: {}
    },
    visible: false
};


const epRecordStateState = (state = initState, action) => {
    switch (action.type) {
        case EP_RED_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case EP_RED_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case EP_RED_SET_MODAL_DATA:
            return { ...state, modalData: action.data };
        case EP_RED_CHANGE_MODAL_LOADING:
            return { ...state, modalLoading: action.option };
        case EP_RED_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        default:
            return state;
    }
}

export default epRecordStateState;