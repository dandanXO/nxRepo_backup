import { GLOBAL_SET_TABLE_SIZE } from './actions';

const initState = {
    tableSize: true,
};
const globalSettingState = (state = initState, action) => {
    switch (action.type) {
        case GLOBAL_SET_TABLE_SIZE:
            return { ...state, tableSize: action.data };
        default:
            return state;
    }
}
export default globalSettingState;