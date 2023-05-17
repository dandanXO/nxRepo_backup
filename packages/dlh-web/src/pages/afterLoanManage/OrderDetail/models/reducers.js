import {
    ORD_SET_ORDER_DETAIL,
    ORD_CHANGE_MODAL_VISIBLE,
    ORD_SET_URGE_RECORD,
    ORD_CHANGE_RECORD_MODAL,
    ORD_CHANGE_REPAYMENT_MODAL_VISIBLE,
    ORD_SET_MESSAGE_CONTENT,
    ORD_CHANGE_MESSAGE_MODAL_VISIBLE,
    ORD_SET_DETAIL_TAB_CONTROL,
    ORD_SET_ADDRESS_BOOK,
    ORD_SET_SMS_MESSAGE,
} from './actions';

const initState = {
    orderData: {},
    visible: false,
    recordVisible: false,
    repaymentVisible: false,
    recordData: [],
    messageContent: '',
    messageVisible: false,
    detailTabControl: {},
    addressBook: {
        data: [],
        pagination: {},
    },
    smsMessage: {
        data: [],
        pagination: {},
    },
};
const orderDetailState = (state = initState, action) => {
    switch (action.type) {
        case ORD_SET_ORDER_DETAIL:
            return { ...state, orderData: action.data };
        case ORD_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case ORD_CHANGE_RECORD_MODAL:
            return { ...state, recordVisible: action.option };
        case ORD_SET_URGE_RECORD:
            return { ...state, recordData: action.data };
        case ORD_CHANGE_REPAYMENT_MODAL_VISIBLE:
            return { ...state, repaymentVisible: action.option };
        case ORD_SET_MESSAGE_CONTENT:
            return { ...state, messageContent: action.data };
        case ORD_CHANGE_MESSAGE_MODAL_VISIBLE:
            return { ...state, messageVisible: action.option };
        case ORD_SET_DETAIL_TAB_CONTROL:
            return { ...state, detailTabControl: action.data };
        case ORD_SET_ADDRESS_BOOK:
            return { ...state, addressBook: action.data };
        case ORD_SET_SMS_MESSAGE:
            return { ...state, smsMessage: action.data };
        default:
            return state;
    }
};
export default orderDetailState;
