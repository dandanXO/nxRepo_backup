import cx from 'classnames';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {
  GetSignInConfigResponse,
  GetUserVIPAllInfoResponse, GetVIPInfoResponse,
  useGetSignInConfigMutation,
  useLazyGetUserVIPAllInfoQuery
} from "../../../external";
import {AppLocalStorage} from '../../../persistant/localstorage';
import useBreakpoint from '../../pageTemplate/hooks/useBreakpoint';
import {useAllowLoginRouterRules} from '../../router/hooks/useAllowLoginRouterRules';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";

import {renderByUVersion} from "../../utils/renderByUVersion";
import PVIPGradePage from "./env/pernambucana/VIPGradePage";
import WVIPGradePage from "./env/wild/VIPGradePage";
import CVIPGradePage from "./env/coco/VIPGradePage";
import RioJungleVIPGradePage from './env/riojungle'

import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {getLocalStorageObjectByKey} from "../../../persistant/getLocalStorageObjectByKey";
import {setLocalStorageObjectByKey} from "../../../persistant/setLocalStorageObjectByKey";
import {useLocalstorageGetUserVIPInfo} from "../../hooks/useLocalstorageGetUserVIPInfo";

const LevelButton = styled.button.attrs<{
  className?: string;
}>((props) => ({
  className: cx(props.className, 'flex flex-row justify-between gap-2 items-center'),
}))`
  min-width: fit-content;
  text-shadow: 0px 1px 0px #ffffff;
`;

export const CurrentLevelButton = styled(LevelButton)`
  //color: #841c00;
  //background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAA2CAYAAAAGRjHZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4MjJDMTg5NkQ2MTExRUVBQUREQzNFRUQxMDhDM0E2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4MjJDMThBNkQ2MTExRUVBQUREQzNFRUQxMDhDM0E2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTgyMkMxODc2RDYxMTFFRUFBRERDM0VFRDEwOEMzQTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTgyMkMxODg2RDYxMTFFRUFBRERDM0VFRDEwOEMzQTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+FHoVAAACSUlEQVR42uydTUuUURiG7zGzQKqVlGb0ZYZBm8xF0KKfoKit+glB1CKpHxBlmzb9g3ZK2n9o2QckWEEqojmLSMEC0z6m+znzSjJObXM81wX3w5lhVs97zTnvOwznlCqzqkeL01/kktNRvAeNy1dn0XntTDjPnI3aD5XqCDHgjGpJXSp7tOJ8c37R0Yam2dnvHHLa01f8g+uI8/RvQuxx7lmC25rz6BM93NW0OSeTHKOud52ftUI80KxlmPboB/3KZtY455xKUoxsFWLIS8SYXiFDllJcSEvIsOt4CBE3izN6rk6WiYyXj8v6GHNFk8uwFpAha+LaL+io69Xm9Gi55FqhL1kTDhxTfwjRp2WEyJ7lVC+GEEe0hhDZs5Zqewixr/oECllTdaCliU5A7VMoywUgBCAEIAQgBCAEIAQgBCAEIAQgBOw4IfhHNTBDAEIAQgBCAEIAQgBCAELAfxGCH6aAGQIQAhACEAIQAhACEAIQAhACEAIQAnYmsWHIF3axhrSPsbQRM0RZrTqgdXqSNa2plkOIN2pTtz7Tk6w5nOqLEGJSZzSkt/Qka7pTnfyztfETdWqevmTJceda2tr4dNxUxiEat9QrjkjJkbjmvWl001nf3JZwTD16qCvFqwrJIkFc87j24YC2H6DySO90XS89muPLs6s5UcwMPXrsekN1DlDZZNC5ryl16X16KJVWxf8uG51YCw6qerzSWed8OmLpjjO+9WOlfxzCFgdqDBQexdb5e+lqQ/PdiRvHmP8niiVi2yFsvwUYAHO0CFu7ab0WAAAAAElFTkSuQmCC);
  //background-repeat: no-repeat;
  background: linear-gradient(180deg, var(--btn-gradient-vip-from) 0%, var(--btn-gradient-vip-to) 100%);
  border: 1px var(--main-secondary-main) solid;
`;

export const OtherLevelButton = styled(LevelButton)`
  //background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAA2CAYAAAAGRjHZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzOEYxMkI5NkQ2MTExRUVCOUE1RENFNEMwNDA0Q0RCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzOEYxMkJBNkQ2MTExRUVCOUE1RENFNEMwNDA0Q0RCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM4RjEyQjc2RDYxMTFFRUI5QTVEQ0U0QzA0MDRDREIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM4RjEyQjg2RDYxMTFFRUI5QTVEQ0U0QzA0MDRDREIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Rbp0kAAACfklEQVR42uydz24SURSHz52pjAhYGyVV6sp00b26cO0LYGJNfAdd6AKjD9CYutCNT+ASqzW+gA+gMXHduGqtrTVNHfoHLHM9B4YEG9wL9/uSH5BhhsU5H3cuLO51N7+/khEUNPU8NzS1/BiMLy3Nuuaz5q3mnaZz8qSpERfe0iy77dZ8tLMv8utIXOdYJPOUdJyJo7JPphaknCxk1dJdXy2v6dFHmjf/EiLWLLmd/Ua0sSdu94AiThLdTNyBDgiaeDsVP3NmPqudXVExlvXdJ3bGSSGWVIRG9PVn72KYbOwLH+von3W6jWxuWvLRQqL8/dvuRwsZAhw1rOfWe3NgIIRNFp9H3/aQIVQprPciL8wFE2LRbaWX3e4hxQn29nEo6sCcvrxjQtR7vyYgaHIH6ibEdZceUZHQR4m+A9dMiIvS6VKR0Ok7cMmESPjTCXIHChGVgL/mEpQAEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIAIQAhACEAIQAhACEAIQAhACEAIQAhACHgvxcilRgvMMHZY8dM2PRJTEFCp9BzYNOE+CKlhIIEjq+ctqePJsRqdqFERQInd2DVhGj62cq6P1ekKqGODtp7dWDDXDAhbBONh70V0Zlchof2PF8N/4GmPTCg6avlZ9mV8yKOGgWD9tp6br03B+zQ8H4Zj9WUoi/E92x1dBZDn/DbxExRstq0yfDSej84PiyErW17X0/40K2Wn7qttL/FUtoW1z7WT2C12/EeDZz4RNtdSXoTSJ0zrOUivB4+bdSeWyua93rBYne2YvtvXdXY0vmnqOpY81tjE8dP0t+ErSkjNmH7I8AAQaWz+gRPJ8UAAAAASUVORK5CYII=);
  background-color: var(--main);
  border: 1px var(--main-primary-main) solid;
  &:hover {
    //background-image: url(data:image/png;base64,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);
  }
`;


export const JackpotMap: {
  [key: number]: {
    image: string;
    label: string;
  };
} = {
  20: {
    image: '20-7a820a39.png',
    label: 'Audi a4',
  },
  21: {
    image: '21-ba2f88fe.png',
    label: 'BMW 520i',
  },
  22: {
    image: '22-667f2bd5.png',
    label: 'Porsche Cayenne',
  },
  23: {
    image: '23-c74d9cdd.png',
    label: 'Porsche 911',
  },
  24: {
    image: '24-52d916b4.png',
    label: 'Ferrari 448',
  },
  25: {
    image: '25-e9c8c963.png',
    label: 'helicóptero',
  },
};

  export interface IVIPGradePageProps {
    currentLevel: number;
    allLevelInfo: GetUserVIPAllInfoResponse['data']
    allSignInConfig?: GetSignInConfigResponse['data']['signInAllConfig']
    userVIPInfo?: GetVIPInfoResponse
    signInTotalDays?: number
  }

 export const VIPGradePage = () => {
  useAllowLoginRouterRules();

  const { isMobile } = useBreakpoint();

  // NOTICE: 存到 LocalStorage
  const [triggerGetUserVIPALLInfo, {
    isUninitialized: isVipAllInfoUninitialized,
    isLoading: isGetUserVIPAllInfoLoading,
    data: oldVipAllInfo,
    isFetching,
    currentData: vipAllInfoResponseData,
    }] = useLazyGetUserVIPAllInfoQuery();
  // NOTE: get from localStorage
  const prevVipAllInfo = getLocalStorageObjectByKey<GetUserVIPAllInfoResponse>(AppLocalStorageKey.useLazyGetUserVIPAllInfoQuery);
  const [vipAllInfo, setVipAllInfo] = useState<GetUserVIPAllInfoResponse>(prevVipAllInfo)
  useEffect(() => {
    if(!isVipAllInfoUninitialized && !isGetUserVIPAllInfoLoading && vipAllInfoResponseData && vipAllInfoResponseData.code === 200) {
      setLocalStorageObjectByKey(AppLocalStorageKey.useLazyGetUserVIPAllInfoQuery, vipAllInfoResponseData);
      setVipAllInfo(vipAllInfoResponseData);
    }
  }, [isVipAllInfoUninitialized, isGetUserVIPAllInfoLoading, vipAllInfoResponseData])

  // NOTICE: 存到 LocalStorage
  // NOTICE: Store Mutation  old data
  const {userVIPInfo} = useLocalstorageGetUserVIPInfo();


  // NOTICE: Store Mutation old data
  const [triggerGetSignConfig, { data: signInConfigResponseData , isLoading: isGetSignConfigLoading}] = useGetSignInConfigMutation();
  const [signInConfig, setSignInConfig] = useState<any>()
  useEffect(() => {
    if(!isGetSignConfigLoading) {

      setSignInConfig(signInConfigResponseData);
    }
  }, [signInConfigResponseData, isGetSignConfigLoading])



  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token);
    if(token && token !== "" && token !== "undefined") {
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
      triggerGetUserVIPALLInfo(null);
    }

  }, []);

  useEffect(() => {
    const handler = () => {
      const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
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

  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(vip_level);
  const [currentLevel, setCurrentLevel] = useState(vip_level);
  // console.log("user", user);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!signInConfig) return;
    dispatch(appSlice.actions.setUserVIPLevel(signInConfig?.data?.vipLevel))
    setCurrentLevel(vip_level)
  }, [signInConfig]);


  const allLevelInfo = vipAllInfo ? vipAllInfo.data : [];
  const currentLevelInfo = allLevelInfo?.find(
    (info) => info.level === currentSelectedLevel
  );

  const allSignInConfig = signInConfig?.data.signInAllConfig || [];
  const vipConfig = allSignInConfig?.find(
    (config: any) =>
      config.identifier.split('::')[2].replace('V', '') ===
      `${currentSelectedLevel}`
  );

  const dayConfigs = JSON.parse(vipConfig?.value || '[]');

  const signBonus = dayConfigs?.reduce(
    (acc: number, current: { cashback: number }) => acc + current.cashback,
    0
  );

  const signInTotalDays = JSON.parse((allSignInConfig[0] || {}).value || '[]').length

  return renderByUVersion({
    "wild777bet": (
      <WVIPGradePage
        isMobile={isMobile}
        userVIPInfo={userVIPInfo}
        currentLevel={currentLevel}
        allLevelInfo={allLevelInfo}
        allSignInConfig={allSignInConfig}
      />
    ),
    "u1": (
      <CVIPGradePage
        isMobile={isMobile}
        userVIPInfo={userVIPInfo}
        currentLevel={currentLevel}
        allLevelInfo={allLevelInfo}
        allSignInConfig={allSignInConfig}
      />
    ),
    "u2": (
      <RioJungleVIPGradePage
        signInTotalDays={signInTotalDays}
        currentLevel={currentLevel}
        allLevelInfo={allLevelInfo}
        userVIPInfo={userVIPInfo}
        allSignInConfig={allSignInConfig}
      />
    )
  }, (
    <PVIPGradePage
      isMobile={isMobile}
      currentLevel={currentLevel}
      currentSelectedLevel={currentSelectedLevel}
      signBonus={signBonus}
      setCurrentSelectedLevel={setCurrentSelectedLevel}
      userVIPInfo={userVIPInfo}
      allLevelInfo={allLevelInfo}
      allSignInConfig={allSignInConfig}
      currentLevelInfo={currentLevelInfo}
    />
  ))

}

