import { axios } from 'utils';
const api = {
    recallSetting: 'hs/admin/recallSetting',
    recallConditions: 'hs/admin/recallSetting/recallConditions'
};
const getRecallSettingList = () => {
    return axios.get(`${api.recallSetting}/all`);
}
const addRecallSetting = (params) => {
    return axios.post(api.recallSetting, params);
}
const updateRecallSetting = (params) => {
    return axios.put(api.recallSetting, params);
}

const updateRecallSettingEnable = (params) => {
    return axios.put(`${api.recallSetting}/enable`, params);
}

const deleteRecallSetting = (params) => {
    return axios.request({ url: api.recallSetting, data: params, method: 'delete' });
}

const getRecallConditionsList = (params) => {
    return axios.get(api.recallConditions, params);
}

export {
  getRecallSettingList,
  addRecallSetting,
  updateRecallSetting,
  deleteRecallSetting,
  getRecallConditionsList,
  updateRecallSettingEnable,
};