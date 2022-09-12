/*
* api
* */
import { axios } from 'utils';
const api = {
    deviceListData: '/news'
};
const getDeviceListData = (params) => {
    return axios.get(api.deviceListData, { params });
}

export { getDeviceListData };