import {
    TORD_SET_ORDER_DETAIL,
    TORD_CHANGE_MODAL_VISIBLE,
    TORD_SET_URGE_RECORD,
    TORD_CHANGE_RECORD_MODAL,
    TORD_CHANGE_REPAYMENT_MODAL_VISIBLE,
    TORD_SET_MESSAGE_CONTENT,
    TORD_CHANGE_MESSAGE_MODAL_VISIBLE,
    TORD_SET_DETAIL_TAB_CONTROL,
    TORD_SET_ADDRESS_BOOK,
    TORD_SET_SMS_MESSAGE,
} from './actions';

const initState = {
    orderData: {},
    visible: false,
    recordVisible: false,
    repaymentVisible: false,
    recordData: [],
    messageContent: '',
    messageVisible: false,
    detailTabControl:{},
    addressBook: {
        data: [],
        pagination: {},
    },
    smsMessage: {
        data: [],
        pagination: {},
    },
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
        case TORD_SET_DETAIL_TAB_CONTROL:
            return { ...state, detailTabControl: action.data };
        case TORD_SET_ADDRESS_BOOK:
            return { ...state, addressBook: action.data };
        case TORD_SET_SMS_MESSAGE:
            return { ...state, smsMessage: action.data };
        default:
            return state;
    }
};
export default todayOrderDetailState;
