import { WFW_CHANGE_MODAL_VISIBLE, WFW_CHANGE_TABLE_LOADING, WFW_SET_TABLE_DATA, WFW_CHANGE_ROWID } from './actions';


const initState = {
    tableData: {
        data: [
            {
                time: '2018-5-10'
            }
        ],
        pagination: {}
    },
    loading: false,
    visible: false,
    rowId: ''
};

const waitFollowState = (state = initState, action) => {
    switch (action.type) {
        case WFW_SET_TABLE_DATA:
            return { ...state, tableData: action.data};
        case WFW_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case WFW_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case WFW_CHANGE_ROWID:
            return { ...state, rowId: action.id };
        default:
            return state;
    }
}
export default waitFollowState;