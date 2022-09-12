import { DTM_CHANGE_MODAL_VISIBLE, DTM_CHANGE_TABLE_LOADING, DTM_SET_TABLE_DATA, DTM_SET_PERSON_DATA } from './actions';

const initState = {
    tableData: [],
    loading: false,
    visible: false,
    personData: []
};

const departmentManageState = (state = initState, action) => {
    switch (action.type) {
        case DTM_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case DTM_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case DTM_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case DTM_SET_PERSON_DATA:
            return { ...state, personData: action.data };
        default:
            return state;
    }
}

export default departmentManageState;