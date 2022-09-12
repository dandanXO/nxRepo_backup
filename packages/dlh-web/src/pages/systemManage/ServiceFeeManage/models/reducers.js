import { CSF_SET_TABLE_DATA, CSF_CHANGE_TABLE_LOADING, CSF_CHANGE_MODAL_VISIBLE, CSF_CHANGE_MODAL_INFO } from './actions';


const initState = {
    loading: false,
    data: {
        data:[]
    },
    visible: false,
    modalInfo: {
        name: ''
    }
}

const serviceFeeManage = (state = initState, action) => {
    switch (action.type) {
        case CSF_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case CSF_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CSF_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case CSF_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default serviceFeeManage;