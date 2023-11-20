import {
  useGetMailCountMutation,
  useGetSignInConfigMutation,
  useGetVIPInfoMutation, useLazyGetBalanceQuery,
  useLazyGetUserVIPAllInfoQuery
} from "../../external";
import {useEffect, useState} from "react";
import {AppLocalStorage} from "../../persistant/localstorage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";
import {useLocation} from "react-router";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";

type IUseAutoUpdateBalance = {
  autoWindowFocusRefresh?: boolean;
}
export const useAutoUpdateBalance = (props?: IUseAutoUpdateBalance) => {
  const windowFocusRefresh = typeof props?.autoWindowFocusRefresh === "undefined" ? true : false;

  const dispatch = useDispatch();
  const {isLogin} = useSelector((state: RootState) => state.app)
  // console.log("isLogin", isLogin);
  const location = useLocation();

  const [triggerGetBalance, {data,isLoading: isGetBalanceLoading}] = useLazyGetBalanceQuery();

  // const [triggerGetSignConfig, { data: signInConfig }] = useGetSignInConfigMutation();
  const [triggerGetUserVIPInfo, {data: vipAllInfo, isLoading: isGetVIPInfoLoading}] = useGetVIPInfoMutation();
  const [triggerGetMailCount, { data: messageData }] = useGetMailCountMutation();

  const isValidToken = () => {
    if(!isLogin) return false;
    const token =  AppLocalStorage.getItem("token")
    if(token && token !== "" && token !== "undefined") {
      return true
    } else {
      return false;
    }
  }
  const updateBalance = () => {
    if(isValidToken()) {
      triggerGetBalance({
        token: AppLocalStorage.getItem("token") || "",
      })
    }
  }

  const updateVIPInfo = () => {
    if(isValidToken() && location.pathname !== PageOrModalPathEnum.VIPGradePage) {
      triggerGetUserVIPInfo({
        token: AppLocalStorage.getItem("token") || ""
      });
    }
  }

  const updateMailCount = () => {
    if(isValidToken()) {
      triggerGetMailCount({ token: AppLocalStorage.getItem('token') || '' })
    }
  }

  useEffect(() => {
    const isLoading = isGetBalanceLoading || isGetVIPInfoLoading
    dispatch(appSlice.actions.setIsUserMoneyStatusLoading(isLoading));
  }, [isGetBalanceLoading, isGetVIPInfoLoading])

  useEffect(() => {
    if (messageData) {
      dispatch(appSlice.actions.setMessageCount(messageData?.mailCount || 0));
    }
  }, [messageData]);

  // NOTE: login change
  // useEffect(() => {
  //   if(!isLogin) return;
  //   updateBalance();
  //   updateVIPInfo();
  //   updateMailCount();
  // }, [isLogin])

  // NOTE: window focus change
  useEffect(() => {
    if(!isLogin) return;
    if(!windowFocusRefresh) return ;
    // console.log("[window] location.pathname", location.pathname);

    const handler = () => {
      updateBalance();
      updateVIPInfo();
      // updateMailCount();
    }
    window.addEventListener("focus", () => {
      console.log("[window] add focus")
      handler();
    })
    return () => {
      if(!windowFocusRefresh) return;
      console.log("[window] remove focus")
      window.removeEventListener("focus", handler)
    }
  }, [isLogin, windowFocusRefresh])

  // NOTE: window focus change, location changes
  const [prevLocation, setPrevLocation] = useState<any>();
  useEffect(() => {
    console.log("[window] location.pathname", location?.pathname);
    if(!isLogin) return;
    if(!windowFocusRefresh) return ;
    if(prevLocation?.pathname !== location.pathname) {
      console.log("[window] location.pathname change update");
      updateBalance();
      updateVIPInfo();
    }
    setPrevLocation(location);
  }, [isLogin, location.pathname])


  // NOTE: update redux for balance
  const userData = useSelector((state: RootState) => state.app?.userStore)
  useEffect(() => {
    if(data && data.data && data.data.balances && userData) {
      dispatch(appSlice.actions.setUserStore({
        ...userData,
        balances: {
          type1: parseFloat((data?.data?.balances[0]?.amount/100).toFixed(2)),
          type2: parseFloat((data?.data?.balances[1]?.amount/100).toFixed(2)),
          type3: parseFloat((data?.data?.balances[2]?.amount/100).toFixed(2)),
        }
      }))
    }
  }, [data])

  // NOTE: update redux for vip level
  useEffect(() => {
    if(vipAllInfo && vipAllInfo.data && vipAllInfo.data.vip_level) {
      dispatch(appSlice.actions.setUserVIPLevel(vipAllInfo.data.vip_level));
    }
  }, [vipAllInfo])

  const update = () => {
    updateBalance();
    updateVIPInfo();
  }
  return {
    update,
    updateBalance,
    // updateVIPInfo,
    // updateMailCount,
  }
}
