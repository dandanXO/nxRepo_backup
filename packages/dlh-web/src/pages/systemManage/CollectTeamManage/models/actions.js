export const GET_COLLECT_TEAM_DATA = 'GET_COLLECT_TEAM_DATA';
export const SET_COLLECT_TEAM_DATA = 'SET_COLLECT_TEAM_DATA';
export const ADD_COLLECT_TEAM = 'ADD_COLLECT_TEAM';
export const UPDATE_COLLECT_TEAM = 'UPDATE_COLLECT_TEAM';
export const DELETE_COLLECT_TEAM = 'DELETE_COLLECT_TEAM';
export const GET_COLLECT_GROUP_DATA = 'GET_COLLECT_GROUP_DATA';
export const SET_COLLECT_GROUP_DATA = 'SET_COLLECT_GROUP_DATA';
export const ADD_COLLECT_GROUP = 'ADD_COLLECT_GROUP';
export const UPDATE_COLLECT_GROUP = 'UPDATE_COLLECT_GROUP';
export const DELETE_COLLECT_GROUP = 'DELETE_COLLECT_GROUP';
export const GET_COLLECT_STAGE_DATA = 'GET_COLLECT_STAGE_DATA';
export const SET_COLLECT_STAGE_DATA = 'SET_COLLECT_STAGE_DATA';


export const getCollectTeam = (params) => ({ type: GET_COLLECT_TEAM_DATA, params });
export const setCollectTeam = (data) => ({ type: SET_COLLECT_TEAM_DATA, data });
export const addCollectTeam = (params) => ({ type: ADD_COLLECT_TEAM, params });
export const updateCollectTeam = (params) => ({ type: UPDATE_COLLECT_TEAM, params });
export const deleteCollectTeam = (params) => ({ type: DELETE_COLLECT_TEAM, params });
export const getCollectGroup = (params) => ({ type: GET_COLLECT_GROUP_DATA, params });
export const setCollectGroup = (data) => ({ type: SET_COLLECT_GROUP_DATA, data });
export const addCollectGroup = (params) => ({ type: ADD_COLLECT_GROUP, params });
export const updateCollectGroup = (params) => ({ type: UPDATE_COLLECT_GROUP, params });
export const deleteCollectGroup = (params) => ({ type: DELETE_COLLECT_GROUP, params });
export const getCollectStage = (params) => ({ type: GET_COLLECT_STAGE_DATA, params });
export const setCollectStage = (data) => ({ type: SET_COLLECT_STAGE_DATA, data });