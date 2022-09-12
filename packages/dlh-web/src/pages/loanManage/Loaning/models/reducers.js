import { LOI_SET_TABLE_DATA, LOI_CHANGE_TABLE_LOADING } from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    }
}

const userInfoManage = (state = initState, action) => {
    switch (action.type) {
        case LOI_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case LOI_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
}
export default userInfoManage;