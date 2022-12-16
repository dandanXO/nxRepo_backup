import {

  COLLECT_TEAM_MANAGE_PMG_CHANGE_MODAL_VISIBLE,
  COLLECT_TEAM_MANAGE_PMG_CHANGE_TABLE_LOADING,
  COLLECT_TEAM_MANAGE_PMG_SET_DEPARTMENT_DATA,
  COLLECT_TEAM_MANAGE_PMG_SET_ROLE_DATA,
  COLLECT_TEAM_MANAGE_PMG_SET_TABLE_DATA,
  COLLECT_TEAM_MANAGE_PMG_SET_COLLECT_TEAM_DATA,
  COLLECT_TEAM_MANAGE_PMG_SET_COLLECT_GROUP_DATA,
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


const systemPeopleManageState = (state = initState, action) => {
    switch (action.type) {
        case COLLECT_TEAM_MANAGE_PMG_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case COLLECT_TEAM_MANAGE_PMG_SET_ROLE_DATA:
            return { ...state, roleData: action.data };
        case COLLECT_TEAM_MANAGE_PMG_SET_DEPARTMENT_DATA:
            return { ...state, departmentData: action.data };
        case COLLECT_TEAM_MANAGE_PMG_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case COLLECT_TEAM_MANAGE_PMG_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case COLLECT_TEAM_MANAGE_PMG_SET_COLLECT_TEAM_DATA:
            return { ...state, teamsData: action.data };
        case COLLECT_TEAM_MANAGE_PMG_SET_COLLECT_GROUP_DATA:
            const { data, collectTeamId, collectGroupId } = action.data
            const groupsData = collectTeamId === '' ? [] : data;
            return { ...state, groupsData: groupsData, collectTeamId, collectGroupId };
        default:
            return state;
    }
};
export default systemPeopleManageState;

