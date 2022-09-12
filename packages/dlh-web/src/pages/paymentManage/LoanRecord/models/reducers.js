import { LRD_SET_TABLE_DATA, LRD_CHANGE_TABLE_LOADING, LRD_SET_MODAL_DATA, LRD_CHANGE_MODAL_LOADING, LRD_CHANGE_MODAL_VISIBLE } from './actions';

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


const loanRecordState = (state = initState, action) => {
    switch (action.type) {
        case LRD_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case LRD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case LRD_SET_MODAL_DATA:
            return { ...state, modalData: action.data };
        case LRD_CHANGE_MODAL_LOADING:
            return { ...state, modalLoading: action.option };
        case LRD_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        default:
            return state;
    }
}

export default loanRecordState;