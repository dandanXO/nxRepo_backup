import {
  OOD_SET_PERSON_DATA,
  OOD_CHANGE_MODAL_VISIBLE,
  OOD_CHANGE_TABLE_LOADING,
  OOD_SET_TABLE_DATA,
  OOD_CHANGE_SELECT_KEY,
  OOD_CHANGE_PERSON_TYPE,
  OOD_SET_OVERDUE_COLLECTOR,
} from './actions';
import {normalizeCollector} from "../../../../utils/normalizeCollector";

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
    overdueCollector: [],
}

const OverdueOrderDistribute = (state = initState, action) => {
    switch (action.type) {
        case OOD_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case OOD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case OOD_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case OOD_SET_PERSON_DATA:
            return { ...state, personData: action.data };
        case OOD_CHANGE_SELECT_KEY:
            return { ...state, selectKeys: action.data };
        case OOD_CHANGE_PERSON_TYPE:
            return { ...state, personType: action.option };
        case OOD_SET_OVERDUE_COLLECTOR:
        {
          const newData = normalizeCollector(action.data)
          return {
            ...state,
            overdueCollector: newData
          };
        }
        default:
          return state;

    }
}
export default OverdueOrderDistribute;
