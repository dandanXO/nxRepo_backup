import {
    PMG_CHANGE_MODAL_VISIBLE,
    PMG_CHANGE_TABLE_LOADING,
    PMG_SET_DEPARTMENT_DATA,
    PMG_SET_ROLE_DATA,
    PMG_SET_TABLE_DATA,
    PMG_SET_COLLECT_TEAM_DATA,
    PMG_SET_COLLECT_GROUP_DATA
} from './actions';

const initState = {
    tableData: {
        data: [],
        pagination: {}
    },
    loading: false,
    visible: false,
    departmentData: [],
    roleData: [],
    teamsData: [],
    groupsData: [],
    collectTeamId:'',
    collectGroupId:''
}


const peopleManageState = (state = initState, action) => {
    switch (action.type) {
        case PMG_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case PMG_SET_ROLE_DATA:
            return { ...state, roleData: action.data };
        case PMG_SET_DEPARTMENT_DATA:
            return { ...state, departmentData: action.data };
        case PMG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case PMG_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case PMG_SET_COLLECT_TEAM_DATA:
            return { ...state, teamsData: action.data };
        case PMG_SET_COLLECT_GROUP_DATA:
            const { data, collectTeamId, collectGroupId } = action.data
            const groupsData = collectTeamId === '' ? [] : data;
            return { ...state, groupsData: groupsData, collectTeamId, collectGroupId };
        default:
            return state;
    }
};
export default peopleManageState;

