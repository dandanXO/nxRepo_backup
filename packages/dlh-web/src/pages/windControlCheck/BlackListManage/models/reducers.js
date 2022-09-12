import { BLM_SET_TABLE_DATA, BLM_CHANGE_TABLE_LOADING, BLM_CHANGE_MODAL_VISIBLE } from './actions';


const initState = {
    loading: false,
    data: {
        data: [],
        pagination: {},
    },
    visible: false,
}

const blackListManage = (state = initState, action) => {
    switch (action.type) {
        case BLM_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case BLM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case BLM_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        default:
            return state;
    }
}
export default blackListManage;