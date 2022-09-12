export const SJ_GET_TABLE_DATA = 'SJ_GET_TABLE_DATA';
export const SJ_SET_TABLE_DATA = 'SJ_SET_TABLE_DATA';
export const SJ_CHANGE_TABLE_LOADING = 'SJ_CHANGE_TABLE_LOADING';
export const SJ_CHANGE_MODAL_VISIBLE = 'SJ_CHANGE_MODAL_VISIBLE';
export const SJ_ADD_SCHEDULE_JOB_LIST = 'SJ_ADD_SCHEDULE_JOB_LIST';
export const SJ_UPDATE_SCHEDULE_JOB_LIST = 'SJ_UPDATE_SCHEDULE_JOB_LIST';
export const SJ_DEL_SCHEDULE_JOB_LIST = 'SJ_DEL_SCHEDULE_JOB_LIST';
export const SJ_EXECUTE_SCHEDULE_JOB = 'SJ_EXECUTE_SCHEDULE_JOB';

export const sjGetTableData = (params) => ({ type: SJ_GET_TABLE_DATA, params });
export const sjSetTableData = (data) => ({ type: SJ_SET_TABLE_DATA, data });
export const sjChangeTableLoading = (option) => ({ type: SJ_CHANGE_TABLE_LOADING, option });
export const sjChangeModalVisible = (option) => ({ type: SJ_CHANGE_MODAL_VISIBLE, option });
export const sjAddScheduleJobList = (params, callback) => ({ type: SJ_ADD_SCHEDULE_JOB_LIST, params, callback });
export const sjUpdateScheduleJobList = (params, callback) => ({ type: SJ_UPDATE_SCHEDULE_JOB_LIST, params, callback });
export const sjDelScheduleJobList = (params, callback) => ({ type: SJ_DEL_SCHEDULE_JOB_LIST, params, callback });
export const sjExecuteScheduleJob = (params, callback) => ({ type: SJ_EXECUTE_SCHEDULE_JOB, params, callback });