import { MMG_SET_TABLE_DATA, MMG_CHANGE_TABLE_LOADING, MMG_CHANGE_MODAL_VISIBLE } from './actions';

const initState = {
    tableData: [],
    loading: false,
    visible: false
};

const menuManageState = (state = initState, action) => {
    switch (action.type) {
        case MMG_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case MMG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case MMG_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        default:
            return state;
    }
};

export default menuManageState;


