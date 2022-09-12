import { CS2_CHANGE_TABLE_LOADING, CS2_SET_TABLE_DATA, CS2_SET_SOURCE_DATA } from './actions';


const initState = {
    tableData: {
        data: []
    },
    loading: false,
    sourceData: []
};

const channelStatistics2State = (state = initState, action) => {
    switch (action.type) {
        case CS2_SET_SOURCE_DATA:
            return { ...state, sourceData: action.data };
        case CS2_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case CS2_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default channelStatistics2State;
