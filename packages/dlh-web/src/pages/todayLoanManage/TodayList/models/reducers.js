import {
  TODL_CHANGE_TABLE_LOADING,
  TODL_SET_TABLE_DATA,
  TODL_CHANGE_SEARCH_PARAMS,
  TODL_SET_PERSON,
  TODL_CHANGE_MODAL_VISIBLE,
  TODL_CHANGE_SELECT_KEY,
  TODL_CHANGE_PERSON_TYPE,
  TODL_COLLECTOR_CHANGE_MODAL_LOADING,
  TODL_COLLECTOR_CHANGE_MODAL_VISIBLE,
  TODL_COLLECTOR_SET_MODAL_DATA, TODL_SET_TODAY_COLLECTOR, TODL_SET_COLLECTOR_LIST,
  TODL_SET_PRODUCT_SELECT
} from './actions'
import {normalizeCollector} from "../../../../utils/normalizeCollector";

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
    },
    todayCollector: [],
    collectorList: [],
    productSelect: []
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
        // 催收人紀錄
        case TODL_COLLECTOR_CHANGE_MODAL_LOADING:
          return { ...state, collector: {
              ...state.collector,
              modalLoading: action.option,
            }};
        case TODL_COLLECTOR_CHANGE_MODAL_VISIBLE:
          return { ...state, collector: {
              ...state.collector,
              visible: action.option,
            }};
        case TODL_COLLECTOR_SET_MODAL_DATA:
          return { ...state, collector: {
              ...state.collector,
              modalData: action.data,
            }};
        case TODL_SET_TODAY_COLLECTOR:
        {
          const newData = normalizeCollector(action.data)
          return {
            ...state,
            todayCollector: newData
          };
        }
        case TODL_SET_COLLECTOR_LIST:
        {
          const list = action.data.map(collector => {
            return {
              value: collector.collectorId,
              name: collector.collectorName,
            }
          })
          return {
            ...state,
            collectorList: list,
          };
        }
        case TODL_SET_PRODUCT_SELECT:
            return { ...state, productSelect: action.data };
        default:
            return state;
    }
}
export default todayList;
