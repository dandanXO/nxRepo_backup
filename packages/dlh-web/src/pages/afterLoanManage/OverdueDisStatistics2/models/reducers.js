import { DSD_OSC_SET_TABLE_DATA, DSD_OSC_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    tableData: [],
    loading: false
};

const overdueDisStatistics2State = (state = initState, action) => {
    switch (action.type) {
        case DSD_OSC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case DSD_OSC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default overdueDisStatistics2State;