import { RVB_REMOVE_BILL } from './actions';

const initState = {
  disabled: false
};

const removeBillState = (state = initState, action) => {
    switch (action.type) {
        case RVB_REMOVE_BILL:
            return { ...state, disabled: action.option };
        default:
            return state;
    }
}
export default removeBillState;