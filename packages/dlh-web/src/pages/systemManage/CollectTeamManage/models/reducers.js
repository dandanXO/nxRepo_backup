import { SET_COLLECT_TEAM_DATA,SET_COLLECT_GROUP_DATA ,SET_COLLECT_STAGE_DATA} from './actions';

const initState = {
    teamsData: [],
    groupsData:[],
    loading: false,
    stageSelect:[]
};

const collectTeamManageState = (state = initState, action) => {
    switch (action.type) {
        case SET_COLLECT_TEAM_DATA:
            return { ...state, teamsData:action.data };
        case SET_COLLECT_GROUP_DATA:
            return { ...state, groupsData: action.data };
        case SET_COLLECT_STAGE_DATA:
            return { ...state, stageSelect: action.data };
        default:
            return state;
    }
};

export default collectTeamManageState;