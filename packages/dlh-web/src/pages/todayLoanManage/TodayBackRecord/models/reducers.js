import { TOBR_SET_TABLE_DATA, TOBR_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    data: {
        data: [],
        pagination: {}
    },
    loading: false
};

const todayBackRecord = (state = initState, action) => {
    switch (action.type) {
        case TOBR_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TOBR_SET_TABLE_DATA:
            return { ...state, data: action.data };
        default:
            return state;
    }
};
export default todayBackRecord;