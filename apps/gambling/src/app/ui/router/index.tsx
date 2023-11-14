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
import {
  selectConfigResult,
  useGetConfigMutation,
  useGetUserVIPAllInfoQuery,
  useLazyGetGameListQuery,
  useLoginMutation
} from "../../external";
import {useEffect, useRef, useState} from "react";
import {appSlice} from "../../reduxStore/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import { GamePage } from '../pages/GamePage';
import { AppLocalStorage } from '../../persistant/localstorage';
import {NotificationPage} from "../pages/NotificationPage";
import {GameSearchPage} from "../pages/GameSearchPage";
import { gameSlice } from '../../reduxStore/gameSlice';
import {PrivacyAgreementPage} from "../pages/PrivacyAgreementPage";
import {environment} from "../../../environments/environment";
import {ErrorBoundary} from "react-error-boundary";
import {PageTemplate} from "../pageTemplate";
import useBreakpoint from "../hooks/useBreakpoint";
import {IUserInfo} from "../../persistant/pending/loginMode";
import styled from "styled-components";
import {promiseHandler} from "../../gateway/promiseHanlder";
import {setLoginLocalStorage} from "../../persistant/setLoginLocalStorage";
import {connect} from "../../gateway/socket";
import {notification} from "antd";


console.log("AppRouter");

export const AppRouter = () => {
  const [isSetup, setIsSetup] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const [firstLogin, setFirstLogin] = useState(false);

  const [triggerGetConfig, {data, isLoading, isSuccess, isError}] = useGetConfigMutation();
  const [triggerGetList, { currentData:gameData, isFetching }] = useLazyGetGameListQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  console.log("data", data)
  console.log("isLoading", isLoading)
  console.log("isSuccess", isSuccess)
  console.log("isError", isError)

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
      if(data.data['group_telegram']) {
        AppLocalStorage.setItem('telegramGroup', data.data['group_telegram']);
      }
      if(data.data['service_telegram']) {
        AppLocalStorage.setItem('telegramService', data.data['service_telegram']);
      }
      if(data.data['manager_telegram']) {
        AppLocalStorage.setItem('telegramManager', data.data['manager_telegram']);
      }
      AppLocalStorage.setItem('downloadUrl', data.data['url_download']);
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

  const [triggerLogin] = useLoginMutation()


  useEffect(() => {
    const token = AppLocalStorage.getItem("token");
    if(!token) {
      setIsSetup(true);
      dispatch(appSlice.actions.showLoginDrawerOrModal(true));
      return;
    }

    triggerLogin({
      "appChannel": "pc",
      "appPackageName": environment.appPackageName,
      "deviceId": AppLocalStorage.getItem("deviceId") || "",
      "deviceModel": "WEB",
      "deviceVersion": "WEB",
      "appVersion": environment.appVersion,
      "sysTimezone": null,
      "sysLanguage": null,
      token,
    }).then((response) => {
      console.log("asdf token", token);
      promiseHandler.then(response, () => {
        console.log("triggerLogin-data", response)
        // setLoginLocalStorage({
        //   token: (response as any).data.data.token,
        //   userInfo: (response as any).data.data.user_info,
        //   kPhone: phoneInput.data,
        //   kPassword: passwordInput.data,
        //   amount: 100,
        //   ip: (response as any).data.data.connection.ip,
        // })
        AppLocalStorage.setItem("token", (response as any).data.data.token);
        dispatch(appSlice.actions.setUserVIPLevel((response as any).data.data.user_info.vip_level));

        const url = (response as any).data.data.connection.ip;
        const token = (response as any).data.data.token;
        if(url) connect(url, token);
        dispatch(appSlice.actions.setIsLogin(true));
        dispatch(appSlice.actions.setIsShowInviteBonusModal(true))
        dispatch(appSlice.actions.setShowTelegramModal(true))
        // props.confirmToLogin();
        setIsSetup(true);
      }, () => {});
    }).catch((error: any) => {
      alert(error);
    })
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
            <PageTemplate>
              <IndexPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.IndexSlotPage} element={(
            <PageTemplate>
              <IndexSlotPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.InvitePage} element={(
            <PageTemplate showMobileHeader={false} showFooter={false}>
              <InvitePage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.InviteSettlementRecordPage} element={(
            <PageTemplate>
              <InviteSettlementRecordPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.WalletPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
              <WallletPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.WalletDepositNextPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
              <WalletDepositNextPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.GameRecordPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
              <GameRecordPage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.VIPGradePage} element={(
            <PageTemplate>
              <VIPGradePage />
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.DailySignInPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
              <DailySignInPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.DailySingInRecordPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
              <DailySignInRecordPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.SettingPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
              <SettingPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.PrivacyAgreementPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={!isMobile}>
              <PrivacyAgreementPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.CompanyProfilePage} element={(
            <PageTemplate>
              <CompanyProfilePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.InitialChargePage} element={(
            <PageTemplate>
              <InitialChargePage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.RechargeActivityPage} element={(
            <PageTemplate>
              <RechargeActivityPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.TelegramPage} element={(
            <PageTemplate>
              <TelegramPage/>
            </PageTemplate>
          )}/>

          <Route path={PageOrModalPathEnum.GamePage} element={(
            <PageTemplate
              // common
              showFooter={false}
              showToolbox={false}
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
            <PageTemplate showMobileHeader={false} showFooter={false}>
              <GameSearchPage/>
            </PageTemplate>
          )}/>

          {/*NOTE: Mobile*/}
          <Route path={PageOrModalPathEnum.MyPage} element={(
            <PageTemplate showMobileHeader={false} showFooter={false}>
              <MyPage/>
            </PageTemplate>
          )}/>
          <Route path={PageOrModalPathEnum.NotificationPage} element={(
            <PageTemplate showMobileHeader={false} showTabbar={false}>
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
