import {
  useGetMailCountMutation,
  useLazyGetBalanceQuery,
  useLazyGetVIPInfoQuery
} from "../../external";
import {useEffect, useState} from "react";
import {AppLocalStorage} from "../../persistant/localstorage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";
import {useLocation} from "react-router";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";

import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";
import {getLocalStorageObjectByKey} from "../../persistant/getLocalStorageObjectByKey";
import {setLocalStorageObjectByKey} from "../../persistant/setLocalStorageObjectByKey";
import { GetVIPInfoResponse } from "../../external/UserEndpoint";

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


  // NOTICE: get or set by LocalStorage
  const [triggerGetUserVIPInfo, { data: userVIPInfoResponseData, isUninitialized, isLoading: isGetUserVIPInfoLoading }] = useLazyGetVIPInfoQuery();
  const prevUserVIPInfo = getLocalStorageObjectByKey<GetVIPInfoResponse>(AppLocalStorageKey.useGetVIPInfoMutation);
  const [vipAllInfo, setVipAllInfo] = useState<GetVIPInfoResponse>(prevUserVIPInfo)
  useEffect(() => {
    if(!isUninitialized && !isGetUserVIPInfoLoading && userVIPInfoResponseData && userVIPInfoResponseData.code === 200) {
      setLocalStorageObjectByKey(AppLocalStorageKey.useGetVIPInfoMutation, userVIPInfoResponseData);
      setVipAllInfo(userVIPInfoResponseData);
    }
  }, [isUninitialized, isGetUserVIPInfoLoading, userVIPInfoResponseData])

  const [triggerGetMailCount, { data: messageData }] = useGetMailCountMutation();

  const isValidToken = () => {
    if(!isLogin) return false;
    const token =  AppLocalStorage.getItem(AppLocalStorageKey.token)
    if(token && token !== "" && token !== "undefined") {
      return true
    } else {
      return false;
    }
  }
  const updateBalance = () => {
    if(isValidToken()) {
      triggerGetBalance({
        token: AppLocalStorage.getItem(AppLocalStorageKey.token) || "",
      })
    }
  }

  const updateVIPInfo = () => {
    if(isValidToken() &&
      location.pathname !== PageOrModalPathEnum.VIPGradePage &&
      location.pathname !== PageOrModalPathEnum.MyPage
    ) {
      triggerGetUserVIPInfo({
        token: AppLocalStorage.getItem(AppLocalStorageKey.token) || ""
      });
    }
  }

  const updateMailCount = () => {
    if(isValidToken()) {
      triggerGetMailCount({ token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '' })
    }
  }

  useEffect(() => {
    const isLoading = isGetBalanceLoading || isGetUserVIPInfoLoading
    dispatch(appSlice.actions.setIsUserMoneyStatusLoading(isLoading));
  }, [isGetBalanceLoading, isGetUserVIPInfoLoading])

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
      updateMailCount();
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
      updateMailCount();
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
    updateMailCount();
  }
  return {
    update,
    updateBalance,
    // updateVIPInfo,
    // updateMailCount,
  }
}
