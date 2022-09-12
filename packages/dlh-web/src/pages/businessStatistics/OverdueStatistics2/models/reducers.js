import {
  OSC2_CHANGE_TABLE_LOADING,
  OSC2_SET_TABLE_DATA,
  OSC2_SET_TIMING_DISTRUBUTION,
  OSC2_CHANGE_TIMING_DISTRUBUTION_LOADING,
} from "./actions";

const initState = {
    tableData: [],
    loading: false,
    timingDistribution: [],
    timingDistributionLoading: false
};

const overdueStatistics2State = (state = initState, action) => {
    switch (action.type) {
        case OSC2_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case OSC2_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case OSC2_SET_TIMING_DISTRUBUTION:
            return { ...state, timingDistribution: action.data };
        case OSC2_CHANGE_TIMING_DISTRUBUTION_LOADING:
            return { ...state, timingDistributionLoading: action.option };
        default:
            return state;
    }
};

export default overdueStatistics2State;
