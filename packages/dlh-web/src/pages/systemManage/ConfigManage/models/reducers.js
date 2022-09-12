import { CF_SET_SYSTEM_CONFIG_DATA } from './actions';

const initState = {
    data: {
        configList: []
    },
}

const configManage = (state = initState, action) => {
    switch (action.type) {
        case CF_SET_SYSTEM_CONFIG_DATA:
            return { ...state, configList: action.data };
        default:
            return state;
    }
}
export default configManage;