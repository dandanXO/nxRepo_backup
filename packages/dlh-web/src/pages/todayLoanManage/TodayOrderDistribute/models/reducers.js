import {
  TOOD_SET_PERSON_DATA,
  TOOD_CHANGE_MODAL_VISIBLE,
  TOOD_CHANGE_TABLE_LOADING,
  TOOD_SET_TABLE_DATA,
  TOOD_CHANGE_SELECT_KEY,
  TOOD_CHANGE_PERSON_TYPE, TOOD_SET_TODAY_COLLECTOR
} from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    personData: [],
    selectKeys: [],
    personType: '',
    todayCollector: [],
}

const TodayderDistribute = (state = initState, action) => {
    switch (action.type) {
        case TOOD_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case TOOD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TOOD_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case TOOD_SET_PERSON_DATA:
            return { ...state, personData: action.data };
        case TOOD_CHANGE_SELECT_KEY:
            return { ...state, selectKeys: action.data };
        case TOOD_CHANGE_PERSON_TYPE:
            return { ...state, personType: action.option };
        case TOOD_SET_TODAY_COLLECTOR:
            return { ...state, todayCollector: action.data };
        default:
            return state;
    }
}
export default TodayderDistribute;
