import {
    SITE_BLACK_CHANGE_MODAL_VISIBLE,
    SITE_BLACK_CHANGE_TABLE_LOADING,
    SITE_BLACK_SET_TABLE_DATA
} from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false
}


const siteBlackManageState = (state = initState, action) => {
    switch (action.type) {
        case SITE_BLACK_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case SITE_BLACK_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case SITE_BLACK_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        default:
            return state;
    }
};
export default siteBlackManageState;

