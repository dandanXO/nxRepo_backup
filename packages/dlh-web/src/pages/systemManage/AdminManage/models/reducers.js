import { AMG_SET_TABLE_DATA, AMG_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    }
}

const adminManage = (state = initState, action) => {
    switch (action.type) {
        case AMG_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case AMG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default adminManage;