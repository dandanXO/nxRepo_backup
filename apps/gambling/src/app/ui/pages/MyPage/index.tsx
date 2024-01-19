import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {
  useLazyGetLetterListQuery, useLazyGetPunchInConfigQuery,
  useLazyGetUserVIPAllInfoQuery
} from "../../../external";

import {appSlice} from "../../../reduxStore/appSlice";
import { useAllowLoginRouterRules } from "../../router/hooks/useAllowLoginRouterRules";
import {useEffect, useState} from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";

import {renderByUVersion} from "../../utils/renderByUVersion";
import PBetMyPage from "./env/pernambucana/MyPage";
import WBetMyPage  from "./env/wild/MyPage";
import CBetMyPage from "./env/u1/MyPage";
import { MyPage as RioMyPage } from './env/u2'
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {useLocalstorageGetUserVIPInfo} from "../../hooks/useLocalstorageGetUserVIPInfo";

export const VIPBorderStyleContainer = styled.div`
  padding: 5vw 30px;
  //background: rgba(255,255,255,.1);
  //border-radius: 10px;
  //border: 1px solid rgba(255,255,255,.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: 15px;
`;


export const MyPage = () => {
  useAllowLoginRouterRules();

  const dispatch = useDispatch();

  const [triggerGetLetter, { data }] = useLazyGetLetterListQuery({});

  useEffect(() => {
    triggerGetLetter(null);
  }, [])


  const [triggerGetUserVIPALLInfo, {currentData: vipAllInfo}] = useLazyGetUserVIPAllInfoQuery();

  const [triggerGetSignConfig, { data: signInConfig }] = useLazyGetPunchInConfigQuery();


  const {userVIPInfo} = useLocalstorageGetUserVIPInfo();

  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
    if(token && token !== "" && token !== "undefined") {
      triggerGetSignConfig(null);
    }
    triggerGetUserVIPALLInfo(null);

  }, []);

  useEffect(() => {
    const handler = () => {
      const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
      triggerGetSignConfig(null);
      triggerGetUserVIPALLInfo(null);
    }
    window.addEventListener("focus", handler)
    return () => {
      window.removeEventListener("focus", handler)
    }
  }, [])

  // const vip_level = useSelector((state: RootState) => state.app?.userStore?.userinfo?.vip_level)
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)
  // console.log("vip_level", vip_level);

  const [currentLevel, setCurrentLevel] = useState(vip_level);
  // console.log("user", user);


  useEffect(() => {
    // dispatch(appSlice.actions.setUserStore({
    //   ...userData,
    //   userinfo: {
    //     vip_level,
    //   }
    // });
    //

    // dispatch(appSlice.actions.setUserStore({
    //   ...userData,
    //   userinfo: {
    //     vip_level
    //   }
    // } as any));
    if(!signInConfig) return;
    dispatch(appSlice.actions.setUserVIPLevel(signInConfig?.data?.vipLevel))

    setCurrentLevel(vip_level)

  }, [signInConfig]);







  return renderByUVersion({
    "wild777bet": (
      <WBetMyPage currentLevel={currentLevel} userVIPInfo={userVIPInfo} />
    ),
    "u1": (
      <CBetMyPage currentLevel={currentLevel} userVIPInfo={userVIPInfo} />
    ),
    "u2": (
      <RioMyPage userVIPInfo={userVIPInfo} currentLevel={currentLevel} />
    )
  }, (
    <PBetMyPage currentLevel={currentLevel} userVIPInfo={userVIPInfo} />
  ))
}
