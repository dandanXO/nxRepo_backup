import { LG_CHANGE_LOADING, LG_CANCEL_TIMER } from './actions';

const initState = {
    btnLoading: false,
    isCancelTimer: false
}

const login = (state = initState, action) => {
    switch (action.type) {
        case LG_CHANGE_LOADING:
            return { ...state, btnLoading: action.option };
        case LG_CANCEL_TIMER:
            return { ...state, isCancelTimer: action.option };
        default:
            return state;
    }
}
export default login;