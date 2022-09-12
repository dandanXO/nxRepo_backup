import { ADM_SET_AD_RECORD_DATA, ADM_SET_DISPLAY_SWITCH, ADM_SET_VIEW_DATA, ADM_TABLE_LOADING } from './actions';

const initState = {
    loading: false,
    viewData: {
        page: {
            records: []
        },
        pageInfo: {
            total: 0
        }
    }
};

const adManageState = (state = initState, action) => {
    switch (action.type) {
        case ADM_TABLE_LOADING:
            return { ...state, loading: action.option };
        case ADM_SET_VIEW_DATA:
            return {
                ...state,
                viewData: {
                    page: action.data.page,
                    pageInfo: {
                        total: action.data.page.totalRecords
                    }
                },
                displayAdSwitch: action.data.displayAdSwitch
            };
        case ADM_SET_DISPLAY_SWITCH:
            return { ...state, displayAdSwitch: action.option };
        case ADM_SET_AD_RECORD_DATA:
            return {
                ...state,
                viewData: {
                    page: action.data.page,
                    pageInfo: {
                        total: action.data.page.totalRecords
                    }
                }
            };
        default:
            return state;
    }
}
export default adManageState;