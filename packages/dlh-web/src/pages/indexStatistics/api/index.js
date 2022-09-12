/*
* api
* */
import { axios } from 'utils';
const api = {
    statisticsData: '/hs/admin/statistics/firstStatistic'
};
const getStatisticsData = (params) => {
    return axios.post(api.statisticsData, params);
}

export { getStatisticsData };