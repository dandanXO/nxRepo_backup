import { OSR_CHANGE_TABLE_LOADING, OSR_SET_TABLE_DATA } from './actions';


const initState = {
    data: {
        data: [],
        pagination: {}
    },
    loading: false
}

const OverdueStandOverRecord = (state = initState, action) => {
    switch (action.type) {
        case OSR_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case OSR_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}


export default OverdueStandOverRecord;