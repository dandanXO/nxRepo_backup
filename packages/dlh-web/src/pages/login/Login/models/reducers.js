import { LG_CHANGE_LOADING, LG_CANCEL_TIMER, LG_FIRST_LOGIN, LG_SET_GOOGLE_AUTH_URL} from './actions';

const initState = {
    btnLoading: false,
    isCancelTimer: false,
    firstLoggedIn: false,
    googleAuthUrl: ""
}

const login = (state = initState, action) => {
    switch (action.type) {
        case LG_CHANGE_LOADING:
            return { ...state, btnLoading: action.option };
        case LG_CANCEL_TIMER:
            return { ...state, isCancelTimer: action.option };
        case LG_FIRST_LOGIN:
            return { ...state, firstLoggedIn: action.option};
        case LG_SET_GOOGLE_AUTH_URL:
            return { ...state, googleAuthUrl: action.option};
        default:
            return state;
    }
}
export default login;
