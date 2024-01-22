import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import { useLazyGetConfigQuery, useLazyGetGameListQuery, useLoginMutation } from "../../../external";
import {environment} from "../../../../environments/environment";
import {appSlice} from "../../../reduxStore/appSlice";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {gameSlice} from "../../../reduxStore/gameSlice";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {connect} from "../../../gateway/socket";
import {userLogout} from "../../../usecase/userLogout";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {notification} from "antd";
import {RootState} from "../../../reduxStore";

const MAX_SHOW_DEPOSIT_MODAL_COUNT = 3;

export const useUIRouter = () => {

  const [isSetup, setIsSetup] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const [firstLogin, setFirstLogin] = useState(false);

  const [triggerGetConfig, {data, isLoading, isSuccess, isError}] = useLazyGetConfigQuery();

  const [triggerGetList, { currentData: gameData, isFetching }] = useLazyGetGameListQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  // console.log("data", data)
  // console.log("isLoading", isLoading)
  // console.log("isSuccess", isSuccess)
  // console.log("isError", isError)

  // const config = useSelector(selectConfigResult)
  // const config = useSelector((state: RootState) => state.api);

  // console.log("config", config);

  useEffect(() => {
    if(!isSetup) return;
    Promise.all([
      triggerGetConfig(null),
      triggerGetList({id:100})
    ]).finally(() => {
      dispatch(appSlice.actions.setIsUILoading(false));
    })
  }, [isSetup]);

  useEffect(() => {
    if(!isSetup) return;
    if (data !== undefined) {
      if(data.data['service_telegram']) {
        AppLocalStorage.setItem(AppLocalStorageKey.telegramService, data.data['service_telegram']);
      }
      if(data.data['manager_telegram']) {
        AppLocalStorage.setItem(AppLocalStorageKey.telegramManager, data.data['manager_telegram']);
      }
      if(data.data['group_telegram']) {
        AppLocalStorage.setItem(AppLocalStorageKey.telegramGroup, data.data['group_telegram']);
      }
      AppLocalStorage.setItem(AppLocalStorageKey.downloadUrl, data.data['url_download']);
      dispatch(appSlice.actions.setWithdrawBegin(data.data.withdraw_begin))
      dispatch(appSlice.actions.setWithdrawEnd(data.data.withdraw_end))
      dispatch(appSlice.actions.setMaintenance(data.data.maintenance))
      dispatch(appSlice.actions.setConfig({
        invite_hig_reward: data.data.invite_hig_reward,
        recharge_cashback_rate: data.data.recharge_cashback_rate,
        recharge_first_cashback_rate: data.data.recharge_first_cashback_rate,
        reward_daily_reset: data.data.reward_daily_reset,
        recharge_bonus_start: data.data.recharge_bonus_start,
      }))
    }
  }, [data])

  useEffect(() => {
    if(!isSetup) return;
    if (gameData !== undefined) {
      dispatch(gameSlice.actions.setLabel(gameData?.data?.label));
      dispatch(gameSlice.actions.setGameList(gameData?.data));
    }
  }, [gameData])


  // const [triggerLogin] = useLoginMutation()


  const [triggerLogin] = useLoginMutation()
  const [previousOffline, setPreviousOffline] = useState(false);

  useEffect(() => {
    if (!previousOffline && Number(data?.data.maintenance.flag) !== 1) {
      const token = AppLocalStorage.getItem(AppLocalStorageKey.token);
      if (!token) {
        setIsSetup(true);
        dispatch(appSlice.actions.showLoginDrawerOrModal(true));
        return;
      }
      const url = AppLocalStorage.getItem(AppLocalStorageKey.ip);
      console.log("ws.url", url);

      if ((url && url.indexOf("ws") > -1 || url && url?.indexOf("wss") > -1) && url !== "undefined" && url && token) {
        connect(url, token);
      } else {
        userLogout();
      }
      dispatch(appSlice.actions.setIsLogin(true));
      if(location.pathname !== PageOrModalPathEnum.GamePage) {
        // dispatch(appSlice.actions.setIsShowInviteBonusModal(true))
        // dispatch(appSlice.actions.setShowDepositModal(true))
      }
      // props.confirmToLogin();
      // setIsSetup(true);
    }

  }, [previousOffline, data, location.pathname])

  const offline = () => {
    setPreviousOffline(true);
  }

  useAutoUpdateBalance();

  const online = () => {
    console.log("[app] online triggerLogin");
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token);
    if(!token) {
      return;
    }
    console.log("[app] relogin with token: ", token);

    const websocketURL = AppLocalStorage.getItem(AppLocalStorageKey.ip);
    if((websocketURL && websocketURL.indexOf("ws") > -1 || websocketURL && websocketURL?.indexOf("wss") > -1) && websocketURL !=="undefined" && websocketURL && token) {
      connect(websocketURL, token);
    }
  }

  useEffect(() =>  {
    window.addEventListener("offline", offline);
    window.addEventListener("online", online);
    return () => {
      window.addEventListener("offline", offline)
      window.removeEventListener("online", online)
    }
  }, [])



  //const mounted = useRef(false);
  // useEffect(() => {
  //   // NOTE: https://react.dev/learn/synchronizing-with-effects#fetching-data 無效
  //   let ignore = false;
  //
  //   const autoLogin = () => {
  //     if(!ignore) {
  //       console.log("autoLogin");
  //       const token = AppLocalStorage.getItem("token");
  //
  //       if(!token) return;
  //
  //       triggerLogin({
  //         "appChannel": "pc",
  //         "appPackageName": environment.appPackageName,
  //         "deviceId": AppLocalStorage.getItem("deviceId") || "",
  //         "deviceModel": "WEB",
  //         "deviceVersion": "WEB",
  //         "appVersion": environment.appVersion,
  //         "sysTimezone": null,
  //         "sysLanguage": null,
  //         token,
  //       }).then((response) => {
  //         console.log("asdf token", token);
  //         promiseHandler.then(response, () => {
  //           console.log("triggerLogin-data", response)
  //           // setLoginLocalStorage({
  //           //   token: (response as any).data.data.token,
  //           //   userInfo: (response as any).data.data.user_info,
  //           //   kPhone: phoneInput.data,
  //           //   kPassword: passwordInput.data,
  //           //   amount: 100,
  //           //   ip: (response as any).data.data.connection.ip,
  //           // })
  //           AppLocalStorage.setItem("token", (response as any).data.data.token);
  //           dispatch(appSlice.actions.setUserVIPLevel((response as any).data.data.user_info.vip_level));
  //
  //           const url = (response as any).data.data.connection.ip;
  //           const token = (response as any).data.data.token;
  //           if(url) connect(url, token);
  //           dispatch(appSlice.actions.setIsShowInviteBonusModal(true));
  //           dispatch(appSlice.actions.setShowTelegramModal(true))
  //           // props.confirmToLogin();
  //         }, () => {});
  //       }).catch((error: any) => {
  //         alert(error);
  //       })
  //     }
  //   }
  //
  //   autoLogin();
  //
  //   return () => {
  //     ignore = true;
  //   };
  // }, [])

  const [notifyAPI, contextHolder] = notification.useNotification();
  const globalMessage = useSelector((state: RootState) => state?.app?.globalMessage)
  const [preGlobalMessage, setPreGlobalMessage] = useState<null | string>(null);

  useEffect(() => {
    if(globalMessage !== preGlobalMessage) {
      setPreGlobalMessage(globalMessage);
      if(globalMessage !== null) {
        notifyAPI.error({
          message: globalMessage,
          onClick: () => {
            dispatch(appSlice.actions.setGlobalMessage(null));
          },
          onClose: () => {
            dispatch(appSlice.actions.setGlobalMessage(null));
          }
        });
      }
    }
  }, [globalMessage]);



  // NOTE: 登入後，沒有儲值過則 25秒彈跳一次，最多三次。
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const {isShowDepositModal} = useSelector((state: RootState) => state.app)
  const [startInterval, setStartInterval] = useState(false);
  const [configOfShowDepositModal, setConfigOfShowDepositModal] = useState({count:0, isShowDepositModal:isShowDepositModal});

  useEffect(() => {
    let timer: any;
    if(!isLogin) return;
    if(!startInterval) {
      setStartInterval(startInterval => {
        if(!startInterval) {
          const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "");
          const recharge_amount = userInfo?.recharge_amount;
          if(recharge_amount === 0) {
            timer = setInterval(() => {
              setConfigOfShowDepositModal((configOfShowDepositModal) => {
                if(configOfShowDepositModal.isShowDepositModal) return configOfShowDepositModal ;
                if(configOfShowDepositModal.count >= MAX_SHOW_DEPOSIT_MODAL_COUNT) {
                  clearTimeout(timer);
                  return configOfShowDepositModal;
                } else {
                  if(!configOfShowDepositModal.isShowDepositModal) {
                    if(location.pathname !== PageOrModalPathEnum.GamePage) {
                      dispatch(appSlice.actions.setShowDepositModal(true))
                    } else {
                      window.clearInterval(timer);
                    }
                  }
                  return {
                    ...configOfShowDepositModal,
                    count: configOfShowDepositModal.count + 1
                  }
                }
              });
            }, 25000)
          }
          return true
        } else {
          return false;
        }
      });
    }

    return () => {
      if(configOfShowDepositModal.count >= MAX_SHOW_DEPOSIT_MODAL_COUNT){
        window.clearInterval(timer);
      }
    };

  }, [isLogin])


  useEffect(() => {
    if(startInterval) {
      if(location.pathname === PageOrModalPathEnum.GamePage || !isLogin) {
        setConfigOfShowDepositModal({ ...configOfShowDepositModal, count: MAX_SHOW_DEPOSIT_MODAL_COUNT})
      }
      setConfigOfShowDepositModal((configOfShowDepositModal)=> ({ ...configOfShowDepositModal, isShowDepositModal}))
    }
  }, [startInterval, location.pathname, isLogin, isShowDepositModal])


  const queryParams = new URLSearchParams(location.search);
  const inNativeApp = queryParams.get('inNativeApp') === "true";

  useEffect(() => {
    // NOTE: 只吃首頁開啟後的 inNativeApp
    if(location.pathname === PageOrModalPathEnum.IndexPage) {
      if(inNativeApp) {
        dispatch(appSlice.actions.setInNativeApp(inNativeApp))
      }
    }
  }, [inNativeApp])

  return {
    isSetup,
    contextHolder,
  }
}
