import { CFY_SET_TABLE_DATA, CFY_CHANGE_TABLE_LOADING, CFY_CHANGE_MODAL_VISIBLE, CFY_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        name: ''
    }
}

const yysManage = (state = initState, action) => {
    switch (action.type) {
        case CFY_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case CFY_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CFY_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case CFY_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default yysManage;