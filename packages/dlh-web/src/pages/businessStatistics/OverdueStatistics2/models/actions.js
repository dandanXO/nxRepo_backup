export const OSC2_GET_TABLE_DATA = 'OSC2_GET_TABLE_DATA';
export const OSC2_SET_TABLE_DATA = 'OSC2_SET_TABLE_DATA';
export const OSC2_CHANGE_TABLE_LOADING = 'OSC2_CHANGE_TABLE_LOADING';
export const OSC2_GET_TIMING_DISTRUBUTION = 'OSC2_GET_TIMING_DISTRUBUTION';
export const OSC2_SET_TIMING_DISTRUBUTION= 'OSC2_SET_TIMING_DISTRUBUTION';
export const OSC2_CHANGE_TIMING_DISTRUBUTION_LOADING = 'OSC2_CHANGE_TIMING_DISTRUBUTION_LOADING';

export const osc2GetTableData = (params) => ({ type: OSC2_GET_TABLE_DATA, params });
export const osc2SetTableData = (data) => ({ type: OSC2_SET_TABLE_DATA, data });
export const osc2ChangeTableLoading = (option) => ({ type: OSC2_CHANGE_TABLE_LOADING, option });

export const osc2GetTimingDistribution = (params) => ({ type: OSC2_GET_TIMING_DISTRUBUTION, params });
export const osc2SetTimingDistribution = (data) => ({ type: OSC2_SET_TIMING_DISTRUBUTION, data });
export const osc2ChangeTimingDistributionLoading = (option) => ({ type: OSC2_CHANGE_TIMING_DISTRUBUTION_LOADING, option });
