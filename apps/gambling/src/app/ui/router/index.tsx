import {Route, Routes, useLocation} from 'react-router';
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {IndexPage} from "../pages/IndexPage";
import {ErrorPage} from "../pages/ErrorPage";
import {IndexSlotPage} from "../pages/IndexSlotPage";
import {InvitePage} from "../pages/InvitePage";
import {WallletPage} from "../pages/WallletPage";
import {GameRecordPage} from "../pages/GameRecordPage";
import {VIPGradePage} from "../pages/VIPGradePage";
import {DailySignInPage} from "../pages/DailySignInPage";
import {DailySignInRecordPage} from "../pages/DailySignInRecordPage";
import {SettingPage} from "../pages/SettingPage";
import {CompanyProfilePage} from "../pages/CompanyProfilePage";
import {InitialChargePage} from "../pages/InitialChargePage";
import {RechargeActivityPage} from "../pages/RechargeActivityPage";
import {TelegramPage} from "../pages/TelegramPage";
import {InviteSettlementRecordPage} from "../pages/InviteSettlementRecordPage";
import {MyPage} from "../pages/MyPage";
import {WalletDepositNextPage} from "../pages/WalletDepositNextPage";
import {useGetConfigMutation, useLazyGetGameListQuery, useLoginMutation} from "../../external";
import {useEffect, useState} from "react";
import {appSlice} from "../../reduxStore/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {GamePage} from '../pages/GamePage';
import {AppLocalStorage} from '../../persistant/localstorage';
import {NotificationPage} from "../pages/NotificationPage";
import {GameSearchPage} from "../pages/GameSearchPage";
import {gameSlice} from '../../reduxStore/gameSlice';
import {PrivacyAgreementPage} from "../pages/PrivacyAgreementPage";
import {environment} from "../../../environments/environment";
import {PageTemplate} from "../pageTemplate";
import useBreakpoint from "../hooks/useBreakpoint";
import {connect} from "../../gateway/socket";
import {notification} from "antd";
import TermsOfServicePage from "../pages/TermsOfServicePage";
import {useAutoUpdateBalance} from "../hooks/useAutoUpdateBalance";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";
import {userLogout} from "../../usecase/userLogout";


export const AppRouter = () => {
  const [isSetup, setIsSetup] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const [firstLogin, setFirstLogin] = useState(false);

  const [triggerGetConfig, {data, isLoading, isSuccess, isError}] = useGetConfigMutation();

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
      triggerGetConfig({
        appChannel: "pc",
        appPackageName: environment.appPackageName,
        appVersion: environment.appVersion,
      }),
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
    }
  }, [data])

  useEffect(() => {
    if(!isSetup) return;
    if (gameData !== undefined) {
      dispatch(gameSlice.actions.setLabel(gameData?.data?.label));
      dispatch(gameSlice.actions.setGameList(gameData?.data));
    }
  }, [gameData])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const { isMobile } = useBreakpoint();

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
      dispatch(appSlice.actions.setIsShowInviteBonusModal(true))
      dispatch(appSlice.actions.setShowTelegramModal(true))
      dispatch(appSlice.actions.setShowDepositModal(true))
      // props.confirmToLogin();
      // setIsSetup(true);
    }

  }, [previousOffline, data])

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



  return (
    <>
      {isSetup && (
        <Routes>
          {/*NOTE: Common*/}
          <Route path={PageOrModalPathEnum.IndexPage} element={(
            <PageTemplate showToolboxConfig={{mobile: {download: true}}}>
              <IndexPage />
            </PageTemplate>
          )}/>
          {/*<Route path={PageOrModalPathEnum.IndexSlotPage} element={(*/}
          {/*  <PageTemplate>*/}
          {/*    <IndexSlotPage />*/}
          {/*  </PageTemplate>*/}
          {/*)}/>*/}
          <Route path={PageOrModalPathEnum.InvitePage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false}>
              <InvitePage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.InviteSettlementRecordPage} element={(
            <PageTemplate showMobileFooter={false}>
              <InviteSettlementRecordPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.WalletPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
              showToolboxConfig={{mobile:{ customerService: false }}}
            >
              <WallletPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.WalletDepositNextPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false} showMobileFooter={false}>
              <WalletDepositNextPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.GameRecordPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
              showToolboxConfig={{mobile:{ customerService: false}}}
            >
              <GameRecordPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.VIPGradePage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false}>
              <VIPGradePage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.DailySignInPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
              showToolboxConfig={{mobile:{ customerService: false }}}
            >
              <DailySignInPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.DailySingInRecordPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
              showToolboxConfig={{mobile:{ customerService: false}}}
            >
              <DailySignInRecordPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.SettingPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
              showToolboxConfig={{mobile:{ customerService: false}}}
            >
              <SettingPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.PrivacyAgreementPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={!isMobile}
              showToolboxConfig={{mobile:{ customerService: false}}}
            >
              <PrivacyAgreementPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.TermsOfService} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={!isMobile}
              showToolboxConfig={{mobile:{ customerService: false}}}
            >
              <TermsOfServicePage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.CompanyProfilePage} element={(
            <PageTemplate>
              <CompanyProfilePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.InitialChargePage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showTabbar={false}
              showToolboxConfig={{mobile:{ customerService: false }}}
            >
              <InitialChargePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.RechargeActivityPage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false} showTabbar={false}>
              <RechargeActivityPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.TelegramPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showTabbar={false}
              showToolboxConfig={{mobile:{ customerService: false }}}
            >
              <TelegramPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.GamePage} element={(
            <PageTemplate
              // common
              showMobileFooter={false}
              showToolboxConfig={false}
              // desktop
              showDesktopHeader={false}
              showDesktopMenuDrawer={false}
              // mobile
              showMobileHeader={false}
              showTabbar={false}
            >
              <GamePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.GameSearchPage} element={(
            <PageTemplate showMobileHeader={false} showMobileFooter={false}>
              <GameSearchPage/>
            </PageTemplate>
          )}/>

          {/*NOTE: Mobile*/}
          <Route path={PageOrModalPathEnum.MyPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showMobileFooter={false}
              showToolboxConfig={{ mobile: { customerService: false }}}
            >
              <MyPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.NotificationPage} element={(
            <PageTemplate
              showMobileHeader={false}
              showTabbar={false}
              showMobileFooter={false}
              showToolboxConfig={{mobile:{ customerService: false}}}
            >
              <NotificationPage/>
            </PageTemplate>
          )}/>

          {/*NOTE: Desktop*/}
          <Route path="/v2/error" element={<ErrorPage />} />
        </Routes>
      )}

      {contextHolder}
    </>
  );
};
