/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
import {
    RPL_CHANGE_MODAL_LOADING,
    RPL_CHANGE_MODAL_VISIBLE,
    RPL_CHANGE_TABLE_LOADING,
    RPL_SET_MODAL_DATA,
    RPL_SET_TABLE_DATA,
    RPL_CHANGE_SELECTED_KEY
} from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    modalData: {
        data: [],
        pagination: {}
    },
    visible: false,
    loading: false,
    modalLoading: false,
    selectKeys: [],
};
const repeatLoanState = (state = initState, action) => {
    switch (action.type) {
        case RPL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RPL_CHANGE_MODAL_LOADING:
            return { ...state, modalLoading: action.option };
        case RPL_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case RPL_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case RPL_SET_MODAL_DATA:
            return { ...state, modalData: action.data };
        case RPL_CHANGE_SELECTED_KEY:
            return { ...state, selectKeys: action.data }
        default:
            return state;
    }
};
export default repeatLoanState;