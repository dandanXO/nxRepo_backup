import {
    TODL_CHANGE_TABLE_LOADING,
    TODL_SET_TABLE_DATA,
    TODL_CHANGE_SEARCH_PARAMS,
    TODL_SET_PERSON,
    TODL_CHANGE_MODAL_VISIBLE,
    TODL_CHANGE_SELECT_KEY,
    TODL_CHANGE_PERSON_TYPE
} from './actions'

const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {
            pageSize: 10,
            current: 1
        }
    },
    params: {
        time: [],
        phoneNo: '',
        name: '',
        orderNo: '',
        orderStatus: '0',
        person: ''
    },
    personData: [],
    selectKeys: [],
    visible: false,
    personType: ''
}

const todayList = (state = initState, action) => {
    switch (action.type) {
        case TODL_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case TODL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TODL_CHANGE_SEARCH_PARAMS:
            return { ...state, params: action.params };
        case TODL_SET_PERSON:
            return { ...state, personData: action.data };
        case TODL_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case TODL_CHANGE_SELECT_KEY:
            return { ...state, selectKeys: action.data };
        case TODL_CHANGE_PERSON_TYPE:
            return { ...state, personType: action.option };
        default:
            return state;
    }
}
export default todayList;