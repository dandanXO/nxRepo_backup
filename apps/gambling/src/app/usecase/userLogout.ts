import {clearLoginLocalStorage} from "../persistant/setLoginLocalStorage";
import {appSlice} from "../reduxStore/appSlice";
import {appStore, RootState} from "../reduxStore";
import {push} from "@lagunovsky/redux-react-router";
import {PageOrModalPathEnum} from "../ui/PageOrModalPathEnum";

// note: data flow
export const userLogout = () => {
  const isLogin = (appStore.getState() as RootState)?.app?.isLogin;
  if(isLogin) {
    console.log("userLogout")
    clearLoginLocalStorage();
    appStore.dispatch(appSlice.actions.setIsLogin(false));
    appStore.dispatch(push(PageOrModalPathEnum.IndexPage));
  }
}
