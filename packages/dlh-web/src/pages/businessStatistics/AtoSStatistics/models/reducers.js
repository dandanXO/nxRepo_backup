/**
 * @description
 * @author zs
 * @date 2018/8/20
 *
 */
import { ASS_CHANGE_TABLE_LOADING, ASS_SET_TABLE_DATA } from './actions';

const initState = {
    tableData: [],
    loading: false
};

const atosStatisticsState = (state = initState, action) => {
    switch (action.type) {
        case ASS_SET_TABLE_DATA:
            return { ...state, tableData: action.data };
        case ASS_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        default:
            return state;
    }
};
export default atosStatisticsState;