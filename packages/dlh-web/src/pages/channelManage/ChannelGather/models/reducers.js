import { CG_SET_TABLE_DATA, CG_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    }
}

const channelGather = (state = initState, action) => {
    switch (action.type) {
        case CG_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case CG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default channelGather;