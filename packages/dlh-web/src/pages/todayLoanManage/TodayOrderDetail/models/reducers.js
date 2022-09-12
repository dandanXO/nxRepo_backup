import { TORD_SET_ORDER_DETAIL, TORD_CHANGE_MODAL_VISIBLE, TORD_SET_URGE_RECORD, TORD_CHANGE_RECORD_MODAL, TORD_CHANGE_REPAYMENT_MODAL_VISIBLE,TORD_SET_MESSAGE_CONTENT,TORD_CHANGE_MESSAGE_MODAL_VISIBLE } from './actions';

const initState = {
    orderData: {},
    visible: false,
    recordVisible: false,
    repaymentVisible: false,
    recordData: [],
    messageContent:'',
    messageVisible:false
};
const todayOrderDetailState = (state = initState, action) => {
    switch (action.type) {
        case TORD_SET_ORDER_DETAIL:
            return { ...state, orderData: action.data };
        case TORD_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case TORD_CHANGE_RECORD_MODAL:
            return { ...state, recordVisible: action.option };
        case TORD_SET_URGE_RECORD:
            return { ...state, recordData: action.data };
        case TORD_CHANGE_REPAYMENT_MODAL_VISIBLE:
            return { ...state, repaymentVisible: action.option };
        case TORD_SET_MESSAGE_CONTENT:
            return { ...state, messageContent: action.data };
        case TORD_CHANGE_MESSAGE_MODAL_VISIBLE:
            return { ...state, messageVisible: action.option };
        default:
            return state;
    }
}
export default todayOrderDetailState;