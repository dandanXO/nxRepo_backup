import { RFM2_SET_TABLE_DATA, RFM2_CHANGE_TABLE_LOADING ,RFM2_CHANGE_MODAL_VISIBLE ,RFM2_ADD_TABLE_DATA ,RFM2_CHANGE_MODAL_INFO} from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    modalInfo: {
        tradeAmount: '',
        remark: ''
    }
}

const riskFeeDepositManage = (state = initState, action) => {
    switch (action.type) {
        case RFM2_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case RFM2_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case RFM2_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case RFM2_CHANGE_MODAL_INFO:
            return { ...state, modalInfo: action.info };
        default:
            return state;
    }
}
export default riskFeeDepositManage;