import { axios } from 'utils';
const api = {
    overdueStatisic2: '/hs/admin/statistics/overdueStatistic2',
    overdueStatisic2TimingDistribution: '/hs/admin/statistics/overdueStatistic2overdueTimingDistribution'
};

const getOverdueStatisic2Data = (params) => {
    return axios.get(api.overdueStatisic2, { params });
}

const getOverdueStatisic2TimingDistribution = (params) => {
    return axios.get(api.overdueStatisic2TimingDistribution, { params });
}


export { getOverdueStatisic2Data, getOverdueStatisic2TimingDistribution };