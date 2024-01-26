import {clearLoginLocalStorage} from "../persistant/setLoginLocalStorage";
import {appSlice} from "../reduxStore/appSlice";
import {appStore, RootState} from "../reduxStore";
import {push} from "@lagunovsky/redux-react-router";
import {PageOrModalPathEnum} from "../ui/PageOrModalPathEnum";

// note: data flow
export const userLogout = () => {
  const isLogin = (appStore.getState() as RootState)?.app?.isLogin;
  console.log("userLogout.isLogin:", isLogin);
  if(isLogin) {
    // NOTICE: 重構統一管理 key
    clearLoginLocalStorage();
    appStore.dispatch(appSlice.actions.setIsLogin(false));
    appStore.dispatch(push(PageOrModalPathEnum.IndexPage));
    appStore.dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    // // NOTICE: 暫時 reload
    // window.location.reload();
  }
}

