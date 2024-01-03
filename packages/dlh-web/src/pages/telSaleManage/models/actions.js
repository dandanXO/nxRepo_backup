

import { utilAction } from 'utils';
const { createRequestActionTypes } = utilAction;

 // page - 電銷分配
export const DISTRIBUTELIST = createRequestActionTypes('TEL_SALE_DISTRIBUTE_LIST');
export const distributeList = {
    get: (params) => ({ type: DISTRIBUTELIST['GET'], params }),
    set: (data) => ({ type: DISTRIBUTELIST['SET'], data }),
    loading: (option) => ({ type: DISTRIBUTELIST['LOADING'], option }),
}

export const IMPORT_TEL_SALE_PHONE_NUMBERS = 'IMPORT_TEL_SALE_PHONE_NUMBERS';
export const CHANGE_TEL_SALE_IMPORT_MODAL_VISIBLE = 'CHANGE_TEL_SALE_IMPORT_MODAL_VISIBLE';
export const DELETE_TEL_SALE_PHONE_NUMBERS = 'DELETE_TEL_SALE_PHONE_NUMBERS';
export const importTelSalePhoneNumbers = (params) => ({ type: IMPORT_TEL_SALE_PHONE_NUMBERS, params });
export const changeTelSaleImportModalVisible = (option) => ({ type: CHANGE_TEL_SALE_IMPORT_MODAL_VISIBLE, option });
export const deleteTelSalePhoneNumbers = (params) => ({ type: DELETE_TEL_SALE_PHONE_NUMBERS, params });

 // 分配電銷
export const PERSON_OR_GROUP_LIST = createRequestActionTypes('PERSON_OR_GROUP_LIST');
export const personOrGroupList = {
    get: (params) => ({ type: PERSON_OR_GROUP_LIST['GET'], params }),
    set: (data) => ({ type: PERSON_OR_GROUP_LIST['SET'], data }),
    loading: (option) => ({ type: PERSON_OR_GROUP_LIST['LOADING'], option }),
}

export const CHANGE_TEL_SALE_URGEPERSON_MODAL_VISIBLE = 'CHANGE_TEL_SALE_URGEPERSON_MODAL_VISIBLE';
export const DISTRIBUTE_TEL_SALE = 'DISTRIBUTE_TEL_SALE';
export const changeUrgePersonModalVisible = (option) => ({ type: CHANGE_TEL_SALE_URGEPERSON_MODAL_VISIBLE, option });
export const distributeTelSaleData = (params) => ({ type: DISTRIBUTE_TEL_SALE, params });



// 電銷備註 (新客 or 老客)
export const RECORDLIST = createRequestActionTypes('TEL_SALE_LIST_COLLECTION_RECORD_DATA');
export const recordList = {
    get: (params, status) => ({ type: RECORDLIST['GET'], params, status }),
    set: (data) => ({ type: RECORDLIST['SET'], data }),
    loading: (option) => ({ type: RECORDLIST['LOADING'], option }),
}

export const TEL_SALE_LIST_ADD_COLLECTION_RECORD_DATA = 'TEL_SALE_LIST_ADD_COLLECTION_RECORD_DATA';
export const addCollectionRecordData = (params,status) => ({ type: TEL_SALE_LIST_ADD_COLLECTION_RECORD_DATA, params,status });


// page - 新客电销列表 / 老客电销列表
export const TEL_SALE_LIST = createRequestActionTypes('TEL_SALE_LIST');
export const telSaleList = {
    get: (params, status) => ({ type: TEL_SALE_LIST['GET'], params, status }),
    set: (data) => ({ type: TEL_SALE_LIST['SET'], data }),
    loading: (option) => ({ type: TEL_SALE_LIST['LOADING'], option }),
}


// 個人訊息&訂單 (新客 or 老客)
export const GUEST_INFO = createRequestActionTypes('TEL_SALE_DETAIL_GUEST_INFO');
export const guestInfo = {
    get: (params, status) => ({ type: GUEST_INFO['GET'], params, status }),
    set: (data) => ({ type: GUEST_INFO['SET'], data }),
    loading: (option) => ({ type: GUEST_INFO['LOADING'], option }),
}

export const USER_CONTACTS = createRequestActionTypes('USER_CONTACTS');
export const userContacts = {
    get: (params) => ({ type: USER_CONTACTS['GET'], params }),
    set: (data) => ({ type: USER_CONTACTS['SET'], data }),
    loading: (option) => ({ type: USER_CONTACTS['LOADING'], option }),
}

export const OVERDUE_COLLECTION = createRequestActionTypes('OVERDUE_COLLECTION');
export const overdueCollection = {
    get: (params) => ({ type: OVERDUE_COLLECTION['GET'], params }),
    set: (data) => ({ type: OVERDUE_COLLECTION['SET'], data }),
    loading: (option) => ({ type: OVERDUE_COLLECTION['LOADING'], option }),
}

export const CHANGE_OVERDUE_COLLECTION_MODAL_VISIBLE = 'CHANGE_OVERDUE_COLLECTION_MODAL_VISIBLE';
export const changeOverdueCollectionModalVisible = (option) => ({ type: CHANGE_OVERDUE_COLLECTION_MODAL_VISIBLE, option });


// 電銷統計
export const STATISTICS_LIST = createRequestActionTypes('STATISTICS_LIST');
export const statisticsList = {
    get: (params) => ({ type: STATISTICS_LIST['GET'], params }),
    set: (data) => ({ type: STATISTICS_LIST['SET'], data }),
    loading: (option) => ({ type: STATISTICS_LIST['LOADING'], option }),
}

// 電銷員下拉選單 (新客、老客、統計)
export const TEL_SALE_COLLECTOR_LIST = createRequestActionTypes('TEL_SALE_COLLECTOR_LIST');
export const telSaleCollectorList = {
    get: (params, status) => ({ type: TEL_SALE_COLLECTOR_LIST['GET'], params, status }),
    set: (data) => ({ type: TEL_SALE_COLLECTOR_LIST['SET'], data }),
    loading: (option) => ({ type: TEL_SALE_COLLECTOR_LIST['LOADING'], option }),
}

// 電銷團隊下拉選單
export const TEL_SALE_GROUP_LIST = createRequestActionTypes('TEL_SALE_GROUP_LIST');
export const telSaleGroupList = {
  get: (params, status) => ({ type: TEL_SALE_GROUP_LIST['GET'], params, status }),
  set: (data) => ({ type: TEL_SALE_GROUP_LIST['SET'], data }),
  loading: (option) => ({ type: TEL_SALE_GROUP_LIST['LOADING'], option }),
}
