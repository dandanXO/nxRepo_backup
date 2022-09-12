import { ClS_SET_TABLE_DATA, ClS_CHANGE_TABLE_LOADING, CLS_SET_SOURCE_DATA } from './actions';


const initState = {
    loading: false,
    tableData: {
        data:[]
    },
    sourceData: []
}

const channelStatistics = (state = initState, action) => {
    switch (action.type) {
        case ClS_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case ClS_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CLS_SET_SOURCE_DATA:
            return { ...state, sourceData: action.data };
        default:
            return state;
    }
}
export default channelStatistics;