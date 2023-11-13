import {
  useGetMailCountMutation,
  useGetSignInConfigMutation,
  useGetVIPInfoMutation, useLazyGetBalanceQuery,
  useLazyGetUserVIPAllInfoQuery
} from "../../external";
import {useEffect} from "react";
import {AppLocalStorage} from "../../persistant/localstorage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";


export const useAutoUpdateBalance = () => {
  const dispatch = useDispatch();
  const {isLogin} = useSelector((state: RootState) => state.app)

  const [triggerGetBalance, {data,isLoading: isGetBalanceLoading}] = useLazyGetBalanceQuery();

  // const [triggerGetSignConfig, { data: signInConfig }] = useGetSignInConfigMutation();
  const [triggerGetUserVIPInfo, {data: vipAllInfo, isLoading: isGetVIPInfoLoading}] = useGetVIPInfoMutation();
  const [triggerGetMailCount, { data: messageData }] = useGetMailCountMutation();


  const updateBalance = () => {
    if(!isLogin) return;
    triggerGetBalance({
      token: AppLocalStorage.getItem("token") || ""
    })
  }

  const updateVIPInfo = () => {
    if(!isLogin) return;
    triggerGetUserVIPInfo({
      token: AppLocalStorage.getItem("token") || ""
    });
  }

  const updateMailCount = () => {
    if (!isLogin) return;
    triggerGetMailCount({ token: AppLocalStorage.getItem('token') || '' })
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
  useEffect(() => {
    if(!isLogin) return;
    updateBalance();
    updateVIPInfo();
    updateMailCount();
  }, [isLogin])

  // NOTE: window focus change
  useEffect(() => {
    if(!isLogin) return;
    const handler = () => {
      updateBalance();
      updateVIPInfo();
    }
    window.addEventListener("focus", handler)
    return () => {
      window.removeEventListener("focus", handler)
    }
  }, [isLogin])

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


  return {
    updateBalance,
  }
}
