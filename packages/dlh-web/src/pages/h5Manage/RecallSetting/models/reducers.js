import {
    SET_RECALL_SETTING_DATA,
    SET_RECALL_CONDITIONS_DATA,
    CHANGE_RECALL_SETTING_TABLE_LOADING,
    CHANGE_RECALL_SETTING_MODAL_VISIBLE
} from './actions';

const initState = {
    tableData: [],
    conditionsData: [],
    loading: false,
    editModalVisible: false,
}

const recallSettingState = (state = initState, action) => {
    switch (action.type) {
        case SET_RECALL_SETTING_DATA:
            return { ...state, tableData: action.data };
        case SET_RECALL_CONDITIONS_DATA:
            return { ...state, conditionsData: action.data };
        case CHANGE_RECALL_SETTING_TABLE_LOADING:
            return { ...state, loading: action.option };
        case CHANGE_RECALL_SETTING_MODAL_VISIBLE:
            return { ...state, editModalVisible: action.option };
        default:
            return state;
    }
};
export default recallSettingState;

