import {
    ODL_CHANGE_TABLE_LOADING,
    ODL_SET_TABLE_DATA,
    ODL_CHANGE_SEARCH_PARAMS,
    ODL_SET_PERSON,
    ODL_CHANGE_MODAL_VISIBLE,
    ODL_CHANGE_SELECT_KEY,
    ODL_CHANGE_PERSON_TYPE,
    ODL_COLLECTOR_CHANGE_MODAL_LOADING,
    ODL_COLLECTOR_CHANGE_MODAL_VISIBLE,
    ODL_COLLECTOR_SET_MODAL_DATA,
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
    personType: '',
    // 催收人紀錄
    collector: {
      modalLoading: false,
      visible: false,
      modalData: [],
    }
}

const overdueList = (state = initState, action) => {
    switch (action.type) {
        case ODL_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case ODL_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case ODL_CHANGE_SEARCH_PARAMS:
            return { ...state, params: action.params };
        case ODL_SET_PERSON:
            return { ...state, personData: action.data };
        case ODL_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case ODL_CHANGE_SELECT_KEY:
            return { ...state, selectKeys: action.data };
        case ODL_CHANGE_PERSON_TYPE:
            return { ...state, personType: action.option };
        // 催收人紀錄
        case ODL_COLLECTOR_CHANGE_MODAL_LOADING:
          return { ...state, collector: {
              ...state.collector,
              modalLoading: action.option,
            }};
        case ODL_COLLECTOR_CHANGE_MODAL_VISIBLE:
          return { ...state, collector: {
              ...state.collector,
              visible: action.option,
            }};
        case ODL_COLLECTOR_SET_MODAL_DATA:
          return { ...state, collector: {
              ...state.collector,
              modalData: action.data,
            }};
        default:
            return state;
    }
}
export default overdueList;
