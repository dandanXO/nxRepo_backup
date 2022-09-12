import { OR_ED_CHANGE_LOADING, OR_ED_SET_TABLE_DATA, OR_ED_CHANGE_VISIBLE, OR_ED_CHANGE_BTN_LOADING } from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    btnLoading: false
};


const overOrderHandleState = (state = initState, action) => {
    switch (action.type) {
        case OR_ED_CHANGE_LOADING:
            return { ...state, loading: action.option };
        case OR_ED_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case OR_ED_CHANGE_VISIBLE:
            return { ...state, visible: action.option };
        case OR_ED_CHANGE_BTN_LOADING:
            return { ...state, btnLoading: action.option };
        default:
            return state;
    }
}
export default overOrderHandleState;