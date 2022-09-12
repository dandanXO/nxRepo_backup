import {
    RIL_SET_TABLE_DATA,
    RIL_CHANGE_TABLE_LOADING,
    RIL_CHANGE_MODAL,
    RIL_CHANGE_DETAIL_MODAL,
    RIL_SET_MODAL_DETAIL,
    RIL_CHANGE_TABLE_ROWID,
    RIL_SET_EXPRESS_COMPANY,
    RIL_SET_REFUSE_REASON
} from './actions';


const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    detailVisible: false,
    detailInfo: {},
    rowId: '',
    expressData: [],
    refuseReason: []
};


const recyclingListState = (state = initState, action) => {
    switch (action.type) {
        case RIL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case RIL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RIL_CHANGE_MODAL:
            return { ...state, visible: action.option };
        case RIL_CHANGE_DETAIL_MODAL:
            return { ...state, detailVisible: action.option };
        case RIL_SET_MODAL_DETAIL:
            return { ...state, detailInfo: action.data };
        case RIL_CHANGE_TABLE_ROWID:
            return { ...state, rowId: action.id };
        case RIL_SET_EXPRESS_COMPANY:
            return { ...state, expressData: action.data };
        case RIL_SET_REFUSE_REASON:
            return { ...state, refuseReason: action.data };
        default:
            return state;
    }
}
export default recyclingListState;