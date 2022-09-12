import { axios } from 'utils';
const api = {
    collectTeamsList: '/hs/admin/collect-team-report/overdue/available',
    // collectReport: '/hs/admin/collect-team-report/overdue',
    // collectReportDownload: '/hs/admin/collect-team-report/overdue/download'
    // v2
    collectReport: '/hs/admin/collect-team-report/overdue/v2',
    collectReportDownload: '/hs/admin/collect-team-report/overdue/v2/download'
};
const getCollectTeamsList = (params) => {
    return axios.get(api.collectTeamsList, params);
}
const getCollectReport = (params) => {
    return axios.get(api.collectReport, { params: { ...params } });
}

const getCollectReportDownload = (params) => {
    return axios.get(api.collectReportDownload, { params: { ...params }, responseType: 'blob' });
}

export { getCollectTeamsList, getCollectReport, getCollectReportDownload };