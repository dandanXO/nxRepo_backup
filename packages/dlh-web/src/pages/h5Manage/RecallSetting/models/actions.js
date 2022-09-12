export const GET_RECALL_SETTING_DATA = 'GET_RECALL_SETTING_DATA';
export const SET_RECALL_SETTING_DATA = 'SET_RECALL_SETTING_DATA';
export const GET_RECALL_CONDITIONS_DATA = 'GET_RECALL_SETTING_CONDITIONS_DATA';
export const SET_RECALL_CONDITIONS_DATA = 'SET_RECALL_SETTING_CONDITIONS_DATA';
export const ADD_RECALL_SETTING = 'ADD_RECALL_SETTING';
export const UPDATE_RECALL_SETTING = 'UPDATE_RECALL_SETTING';
export const UPDATE_RECALL_SETTING_ENABLE = 'UPDATE_RECALL_SETTING_ENABLE';
export const DELETE_RECALL_SETTING = 'DELETE_RECALL_SETTING';
export const CHANGE_RECALL_SETTING_TABLE_LOADING = 'CHANGE_RECALL_SETTING_TABLE_LOADING';
export const CHANGE_RECALL_SETTING_MODAL_VISIBLE = 'CHANGE_RECALL_SETTING_MODAL_VISIBLE';


export const getRecallSetting = (params) => ({ type: GET_RECALL_SETTING_DATA, params });
export const setRecallSetting = (data) => ({ type: SET_RECALL_SETTING_DATA, data });
export const getRecallConditions = (params) => ({ type: GET_RECALL_CONDITIONS_DATA, params });
export const setRecallConditions = (data) => ({ type: SET_RECALL_CONDITIONS_DATA, data });
export const addRecallSetting = (params) => ({ type: ADD_RECALL_SETTING, params });
export const updateRecallSetting = (params) => ({ type: UPDATE_RECALL_SETTING, params });
export const updateRecallSettingEnable = (params) => ({ type: UPDATE_RECALL_SETTING_ENABLE, params });
export const deleteRecallSetting = (params) => ({ type: DELETE_RECALL_SETTING, params });
export const ChangeRecallSettingTableLoading = (option) => ({ type: CHANGE_RECALL_SETTING_TABLE_LOADING, option });
export const ChangeRecallSettingEditModalVisible = (option) => ({ type: CHANGE_RECALL_SETTING_MODAL_VISIBLE, option });



