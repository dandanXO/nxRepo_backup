import { LG_CHANGE_LOADING, LG_CANCEL_TIMER, LG_SET_GOOGLE_AUTH, LG_SET_GOOGLE_AUTH_URL} from './actions';

const initState = {
    btnLoading: false,
    isCancelTimer: false,
    needGoogleAuth: false,
    googleAuthUrl: ""
}

const login = (state = initState, action) => {
    switch (action.type) {
        case LG_CHANGE_LOADING:
            return { ...state, btnLoading: action.option };
        case LG_CANCEL_TIMER:
            return { ...state, isCancelTimer: action.option };
        case LG_SET_GOOGLE_AUTH:
            return { ...state, needGoogleAuth: action.option, googleAuthUrl: "" };
        case LG_SET_GOOGLE_AUTH_URL:
            return { ...state, googleAuthUrl: action.option, btnLoading: false };
        default:
            return state;
    }
}
export default login;
