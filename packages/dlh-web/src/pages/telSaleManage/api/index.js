import { axios } from 'utils';

const api = {

    // page - 電銷分配
    telSaleDistribute: '/hs/admin/tel-sale/list',
    importPhoneNumbers: '/hs/admin/tel-sale/import-phone-numbers',
    deleteTelSale:'/hs/admin/tel-sale',

    // 分配電銷
    personOrGroup: '/hs/admin/tel-sale/get-distribution-person-or-group',
    distributeTelSale: '/hs/admin/tel-sale/distribution',

    // 電銷備註 (新客 or 老客)
    collectionRecord: (status) => `/hs/admin/tel-sale/assigned/${status}-guest/collection-record`,
    addCollectionRecord: (status) => `/hs/admin/tel-sale/assigned/${status}-guest/collection-record`,

    // page - 新客电销列表 / 老客电销列表
    telSaleList: (status) => `/hs/admin/tel-sale/assigned/${status}-guest/list`,

    // 個人訊息&訂單 (新客 or 老客)
    guestInfo: (status) => `/hs/admin/tel-sale/assigned/${status}-guest/personal-info`,
    userContacts: '/hs/admin/user/contacts',

    // 逾期记录列表
    overdueCollection: '/hs/admin/tel-sale/assigned/old-guest/overdue-collection/list',

    // page - 電銷統計
    telSaleStatistics:'/hs/admin/tel-sale/statistics/list',

    // 電銷員下拉選單 (新客、老客、統計)
    collectors:'/hs/admin/tel-sale/statistics/distribuion-names',

    // 電銷團隊下拉選單
    groups: '/hs/admin/tel-sale/statistics/group-names',

};

const getTelSaleDistribute = ({params}) => axios.get(api.telSaleDistribute, { params });
const importPhoneNumbers = (params) => axios.post(api.importPhoneNumbers, params);
const deletePhoneNumbers = (params) => axios.request({ url: api.deleteTelSale, data: params, method: 'delete' });
const getPersonOrGroup = (params) => axios.get(api.personOrGroup, params);
const distributeTelSale = (params) => axios.post(api.distributeTelSale, params);
const getCollectionRecord = ({params,status}) => axios.get(api.collectionRecord(status), { params  });
const addCollectionRecord = ({params,status}) => axios.post(api.addCollectionRecord(status), params );
const getTelSaleList = ({ params, status }) => axios.get(api.telSaleList(status), { params });
const getGuestInfo = ({ params, status }) => axios.get(api.guestInfo(status), { params });
const getUserContacts = (params) => axios.post(api.userContacts, params);
const getOverdueCollection = ({ params }) => axios.get(api.overdueCollection, { ...params });
const getTelSaleStatistics = ({params}) => axios.get(api.telSaleStatistics, { params });
const getCollectors = (params) => axios.get(api.collectors, params);
const getGroups = (params) => axios.get(api.groups, params);

export {
    getTelSaleDistribute,
    importPhoneNumbers,
    deletePhoneNumbers,
    getPersonOrGroup,
    distributeTelSale,
    getCollectionRecord,
    addCollectionRecord,
    getTelSaleList,
    getGuestInfo,
    getUserContacts,
    getOverdueCollection,
    getTelSaleStatistics,
    getCollectors,
    getGroups,
};
