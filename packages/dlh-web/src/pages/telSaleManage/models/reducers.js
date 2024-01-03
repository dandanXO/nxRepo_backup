import {
  DISTRIBUTELIST,
  CHANGE_TEL_SALE_IMPORT_MODAL_VISIBLE,
  PERSON_OR_GROUP_LIST,
  CHANGE_TEL_SALE_URGEPERSON_MODAL_VISIBLE,
  RECORDLIST,
  TEL_SALE_LIST,
  GUEST_INFO,
  USER_CONTACTS,
  OVERDUE_COLLECTION,
  CHANGE_OVERDUE_COLLECTION_MODAL_VISIBLE,
  STATISTICS_LIST,
  TEL_SALE_COLLECTOR_LIST, TEL_SALE_GROUP_LIST
} from "./actions";

import { utilReducer } from 'utils';
const { stateTypes, createPageInitState } = utilReducer;
const { pagination, tableData, visible } = stateTypes;
const distributeListState = createPageInitState('distributeList', pagination);
const importModalVisibleState = createPageInitState('importModal', visible);
const personOrGroupState = createPageInitState('personOrGroup', tableData);
const distributeModalVisibleState = createPageInitState('urgePersonModal', visible);
const recordListState = createPageInitState('recordList', pagination);
const telSaleListState = createPageInitState('telSaleList', tableData);
const guestInfoState = createPageInitState('guestInfo', tableData);
const userContactsState=createPageInitState('userContacts', tableData);
const overdueCollectionState = createPageInitState('overdueCollection', tableData, true);
const statisticsListState=createPageInitState('statisticsList', tableData);
const telSaleCollectorListState=createPageInitState('telSaleCollectorList', tableData);
const telSaleGroupListState=createPageInitState('telSaleGroupList', tableData)

const initState = {
    ...distributeListState,
    ...importModalVisibleState,
    ...personOrGroupState,
    ...distributeModalVisibleState,
    ...recordListState,
    ...telSaleListState,
    ...guestInfoState,
    ...userContactsState,
    ...overdueCollectionState,
    ...statisticsListState,
    ...telSaleCollectorListState,
    ...telSaleGroupListState
};

const telSaleState = (state = initState, action) => {
    switch (action.type) {
        case DISTRIBUTELIST['SET']:
            return { ...state, distributeListData: action.data };
        case DISTRIBUTELIST['LOADING']:
            return { ...state, distributeListLoading: action.option };
        case CHANGE_TEL_SALE_IMPORT_MODAL_VISIBLE:
            return { ...state, importModalVisible: action.option };
        case PERSON_OR_GROUP_LIST['SET']:
            return { ...state, personOrGroupData: action.data };
        case CHANGE_TEL_SALE_URGEPERSON_MODAL_VISIBLE:
            return { ...state, urgePersonModalVisible: action.option };
        case RECORDLIST['SET']:
            return { ...state, recordListData: action.data };
        case TEL_SALE_LIST['SET']:
            return { ...state, telSaleListData: action.data };
        case TEL_SALE_LIST['LOADING']:
            return { ...state, telSaleListLoading: action.option };
        case GUEST_INFO['SET']:
            return { ...state, guestInfoData: action.data };
        case USER_CONTACTS['SET']:
            return { ...state, userContactsData: action.data };
        case OVERDUE_COLLECTION['SET']:
            return { ...state, overdueCollectionData: action.data };
        case CHANGE_OVERDUE_COLLECTION_MODAL_VISIBLE:
            return { ...state, overdueCollectionModalVisible: action.option };
        case STATISTICS_LIST['SET']:
            return { ...state, statisticsListData: action.data };
        case STATISTICS_LIST['LOADING']:
            return { ...state, statisticsListLoading: action.option };
        case TEL_SALE_COLLECTOR_LIST['SET']:
            return { ...state, telSaleCollectorListData: action.data };
        case TEL_SALE_GROUP_LIST['SET']:
            return { ...state, telSaleGroupListData: action.data };
        default:
            return state;
    }
};

export default telSaleState;
