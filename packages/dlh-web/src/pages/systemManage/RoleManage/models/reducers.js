import { RLM_SET_MENU_LIST, RLM_CHANGE_MODAL_VISIBLE, RLM_CHANGE_TABLE_LOADING, RLM_SET_TABLE_DATA } from './actions';


const initState = {
    tableData: [],
    loading: false,
    visible: false,
    menuList: []
};

const roleManageState = (state = initState, action) => {
    switch (action.type) {
        case RLM_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case RLM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RLM_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case RLM_SET_MENU_LIST:
            return { ...state, menuList: action.data };
        default:
            return state;
    }
};

export default roleManageState;