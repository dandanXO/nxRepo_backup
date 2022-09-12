import { DSC_OSC_SET_TABLE_DATA, DSC_OSC_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    tableData: [],
    loading: false
};

const overdueDisStatistics1State = (state = initState, action) => {
    switch (action.type) {
        case DSC_OSC_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case DSC_OSC_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}

export default overdueDisStatistics1State;