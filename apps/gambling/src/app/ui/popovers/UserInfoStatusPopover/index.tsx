import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useSelector} from "react-redux";

import {
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";
import {GetVIPInfoResponse,
  useGetSignInConfigMutation,
  useGetVIPInfoMutation, useLazyGetInviteRewardDataQuery, useLazyGetUnsettleInviteRewardDataQuery, useLazyGetUserVIPAllInfoQuery} from "../../../external";
import React, {useEffect, useMemo, useState} from "react";
import styled, { keyframes } from "styled-components";
import { RootState } from "../../../reduxStore";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { environment } from "../../../../environments/environment"
import { UserInfoStatusPopoverContainer as CocoPopoverContainer } from './env/coco/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverContainer as WildPopoverContainer } from './env/wild/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverContainer as RioPopoverContainer } from './env/riojungle/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverContainer as PernambucanaPopoverContainer } from './env/pernambucana/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverVIPInfo as CocoVIPInfo} from './env/coco/UserInfoStatusPopoverVIPInfo'
import { UserInfoStatusPopoverVIPInfo as WildVIPInfo} from './env/wild/UserInfoStatusPopoverVIPInfo'
import { UserInfoStatusPopoverVIPInfo as PernambucanaVIPInfo} from './env/pernambucana/UserInfoStatusPopoverVIPInfo'
import { renderByPlatform } from "../../utils/renderByPlatform";
import { UserInfoStatusPopoverBalanceInfo as CocoBalanceInfo } from "./env/coco/UserInfoStatusPopoverBalanceInfo";
import { UserInfoStatusPopoverBalanceInfo as WildBalanceInfo } from "./env/wild/UserInfoStatusPopoverBalanceInfo";
import { UserInfoStatusPopoverBalanceInfo as PernambucanaBalanceInfo } from "./env/pernambucana/UserInfoStatusPopoverBalanceInfo";
import { UserInfoStatusPopoverInviteInfo as CocoInviteInfo } from "./env/coco/UserInfoStatusPopoverInviteInfo";
import { UserInfoStatusPopoverInviteInfo as WildInviteInfo } from "./env/wild/UserInfoStatusPopoverInviteInfo";
import { UserInfoStatusPopoverInviteInfo as PernambucanaInviteInfo } from "./env/pernambucana/UserInfoStatusPopoverInviteInfo";
import { UserInfoStatusPopoverNavigator as CocoNavigator } from "./env/coco/UserInfoStatusPopoverNavigator";
import { UserInfoStatusPopoverNavigator as WildNavigator } from "./env/wild/UserInfoStatusPopoverNavigator";
import { UserInfoStatusPopoverNavigator as PernambucanaNavigator } from "./env/pernambucana/UserInfoStatusPopoverNavigator";
import { UserINfoStatusPopoverUserInfo as CocoUserInfo } from './env/coco/UserINfoStatusPopoverUserInfo'
import { UserInfoStatusPopover as RioUserInfoStatusPopover } from './env/riojungle';

import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {useLocalstorageGetUserVIPInfo} from "../../hooks/useLocalstorageGetUserVIPInfo";
import { useInviteReward } from "../../hooks/useInviteReward";


const PopoverContainer = renderByPlatform({
  "wild777bet": WildPopoverContainer,
  "coco777bet": CocoPopoverContainer,
  "riojungle777bet": RioPopoverContainer,
// }, PernambucanaPopoverContainer)
}, CocoPopoverContainer)

export interface IUserInfoStatusPopoverVIPInfoProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
}

export interface IUserInfoStatusPopoverBalanceInfoProps {
  totalBalanceSheetValue: number
  totalReasableValue: number
}

export interface IUserInfoStatusPopoverInviteInfoProps {
  totalPrize: number
  bonusAwaitingSettlement: number
  fullWithdrawable: number
}

export interface IUserInfoStatusPopoverNavigatorProps {
  children: React.ReactNode
  onClick: () => void
}

export const VIPBorderStyleContainer = styled.div`
  padding: 1.5vw 30px;
  //background: rgba(255,255,255,.1);
  //border-radius: 10px;
  //border: 1px solid rgba(255,255,255,.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  //margin-bottom: 15px;
`;

const increment = (target: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${target}%;
  }
`;

const Progress = styled.div<{ progress: number }>`
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  //background-image: linear-gradient(45deg, #C2F00D 100%, #FFFF00 0%);
  background: url("assets/${environment.assetPrefix}/process_bar_web_account.png") center center no-repeat;
  height: inherit;
  animation: ${(props) => increment(props.progress)} 0.5s linear forwards;
`;



export const ProgressBar1 = ({ progress, currentLevel, userVIPInfo }: { progress: number, currentLevel: number, userVIPInfo: GetVIPInfoResponse | undefined }) => {
  return (
      <div className={'relative mr-5 h-[30px] w-[310px] flex-auto rounded-3xl bg-assistant leading-[30px]'}>
        <Progress progress={progress > 1 ? 100 : progress * 100} />
        <span className="absolute right-4 top-0 text-medium">
        VIP {currentLevel + 1}
      </span>
        <span className="absolute text-center top-0 left-4 right-4 text-medium">
          {progress > 1 ? '100' : (progress * 100).toFixed(2)}%
        </span>
        <span className="absolute left-4 top-0 text-medium pr-4">
        VIP {currentLevel}
      </span>
        <span className="text-sm text-main-primary-main">
        Depósitos totais:
        </span>
        <span className="text-sm mr-6 text-white">
          R${' '}
          {userVIPInfo?.data?.vip_score
              ? userVIPInfo?.data?.vip_score / 100
              : 0}
          {' '}
          /
          <span className="mr-6 text-main-primary-main">
            {' '}
          {userVIPInfo?.data?.next_level_score
              ? userVIPInfo?.data?.next_level_score / 100
              : 0}
             </span>
        </span>
        {/*<span className="text-medium" style={{ background: 'linear-gradient(45deg, #FFA500, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>*/}
        {/*<span className="text-[#ffffff]">*/}
        {/*Pontos de apostas:R${' '}*/}
        {/*  {userVIPInfo?.data?.vip_score ? Math.floor(userVIPInfo?.data?.vip_score / 100) : 0}*/}
        {/*</span>*/}
      </div>
  );
};


export const ProgressBar2 = ({ progress, currentLevel, userVIPInfo }: { progress: number, currentLevel: number, userVIPInfo: GetVIPInfoResponse | undefined }) => {
  return (
      <div className={'relative mr-5 h-[30px] w-[310px] flex-auto rounded-3xl bg-assistant leading-[30px]'}>
        <Progress progress={progress > 1 ? 100 : progress * 100} />
        <span className="absolute right-4 top-0 text-medium">
        VIP {currentLevel + 1}
      </span>
        <span className="absolute text-center top-0 left-4 right-4 text-medium">
          {progress > 1 ? '100' : (progress * 100).toFixed(2)}%
        </span>
        <span className="absolute left-4 top-0 text-medium pr-4">
        VIP {currentLevel}
      </span>
        {/*<span className="text-medium pr-4" style={{ background: 'linear-gradient(45deg, #FFA500, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>*/}
        <span className="text-sm text-main-primary-main">
       Pontos de apostas:
        </span>
        <span className="mr-6 text-white">
        R${' '}
          {userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow / 100 : 0}{' '}/
         <span className="mr-6 text-main-primary-main">
           {' '}
          {userVIPInfo?.data?.next_level_flow
              ? userVIPInfo?.data?.next_level_flow / 100
              : 0}
           </span>
      </span>

        {/*<span className="text-medium pr-4" style={{ background: 'linear-gradient(45deg, #FFA500, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>*/}
      {/*  <span className="mr-6 text-[#ffffff]">*/}
      {/*  Depósitos totais:R${' '}*/}
      {/*    {userVIPInfo?.data?.flow*/}
      {/*        ? userVIPInfo?.data?.flow / 100*/}
      {/*        : 0}*/}
      {/*</span>*/}
      </div>
  );
};



export const VIPContainer = styled.div`
  background: var(--varient);
  background-size: 100% 100%;
  border: 1px solid var(--main-primary-main);
  border-radius: 10px;
  padding: 1px;
  height: 230px;
`;

export const ContaContainer = styled.div`
  background: var(--varient);
  background-size: 100% 100%;
  border: 1px solid var(--main-primary-main);
  border-radius: 10px;
  padding: 1px;
  height: 145px;
`;

export const OtherContainer = styled.div`
  background: var(--varient);
  background-size: 100% 100%;
  border: 1px solid var(--main-primary-main);
  border-radius: 10px;
`;


type IUserInfoStatusPopover = {
  close: () => void;
}
export const UserInfoStatusPopover = (props: IUserInfoStatusPopover) => {
  const navigate = useNavigate();

  // const { userAmount, user: {withdrawAmount} } = useSelector((state: RootState) => state.app.userStore as IUserStore)
  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  // console.log("totalBalanceSheetValue", totalBalanceSheetValue);
  const totalReasableValue = useSelector(totalReasableSelector);
  // const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);

  const { totalPrize, bonusAwaitingSettlement, fullWithdrawable } = useInviteReward();

  // console.log("inviteInfo", inviteInfo);
  // console.log("inviteUnsettle", inviteUnsettle);



  const [triggerGetSignConfig, { data: signInConfig }] = useGetSignInConfigMutation();

  // const [triggerGetUserVIPInfo, { data: userVIPInfo }] = useGetVIPInfoMutation();
  const {userVIPInfo} = useLocalstorageGetUserVIPInfo();


  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token);
    if(token && token !== "" && token !== "undefined") {
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
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

  // const userStore = useSelector((state: RootState) => state?.app?.userStore);
  const userData = useSelector((state: RootState) => state.app?.userStore)

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
    // dispatch(appSlice.actions.setUserVIPLevel(signInConfig?.data?.vipLevel))

    setCurrentLevel(vip_level)

  }, [signInConfig]);


  // useEffect(() => {
  //   const close = () => props.close();
  //   window.addEventListener("scroll", close);
  //
  //   return () => {
  //     window.removeEventListener("scroll", close);
  //   }
  // }, []);

  return (
    <div
      className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex-col flex justify-center items-center w-full h-full"}
      onClick={(event) => {
        props.close();
      }}
    >
      <PopoverContainer
        onMouseLeave={() => {
          props.close();
        }}>
        {
          renderByPlatform({
            "wild777bet": (
              <>
                <WildVIPInfo
                  userVIPInfo={userVIPInfo}
                  currentLevel={currentLevel}
                />
                <WildBalanceInfo
                  totalBalanceSheetValue={totalBalanceSheetValue}
                  totalReasableValue={totalReasableValue}
                />
                <WildInviteInfo
                  totalPrize={totalPrize}
                  bonusAwaitingSettlement={bonusAwaitingSettlement}
                  fullWithdrawable={fullWithdrawable}
                />
                <WildNavigator onClick={()=>navigate(PageOrModalPathEnum.SettingPage)}>
                  <div className={"flex flex flex-row items-center"}>
                    <img className="w-[26px] h-[26px] mr-2" alt="arrow" src={`assets/${environment.assetPrefix}/ic_account_edit.png`}/>
                    <span>Modificar dados</span>
                  </div>
                </WildNavigator>
                <WildNavigator onClick={()=>navigate(PageOrModalPathEnum.GameRecordPage)}>
                  <div className={"flex flex flex-row items-center"}>
                    <img className="w-[26px] h-[26px] mr-2" alt="arrow" src={`assets/${environment.assetPrefix}/ic_account_record.png`}/>
                    <span>Registro do jogo</span>
                  </div>
                </WildNavigator>
              </>
            ),
            "coco777bet": (
              <>
                <CocoUserInfo />
                <CocoVIPInfo
                  userVIPInfo={userVIPInfo}
                  currentLevel={currentLevel}
                />
                <CocoBalanceInfo
                  totalBalanceSheetValue={totalBalanceSheetValue}
                  totalReasableValue={totalReasableValue}
                />
                <CocoInviteInfo
                  totalPrize={totalPrize}
                  bonusAwaitingSettlement={bonusAwaitingSettlement}
                  fullWithdrawable={fullWithdrawable}
                />
                <CocoNavigator onClick={()=>navigate(PageOrModalPathEnum.GameRecordPage)}>
                  <div>
                    Registro Do Jogo
                  </div>
                </CocoNavigator>
                <CocoNavigator onClick={()=>navigate(PageOrModalPathEnum.SettingPage)}>
                  <div>
                    Modificar Dados
                  </div>
                </CocoNavigator>
              </>
            ),
            "riojungle777bet": (
              <RioUserInfoStatusPopover
                userVIPInfo={userVIPInfo}
                close={props.close}
                currentLevel={currentLevel}
                totalBalanceSheetValue={totalBalanceSheetValue}
                totalReasableValue={totalReasableValue}
                totalPrize={totalPrize}
                bonusAwaitingSettlement={bonusAwaitingSettlement}
                fullWithdrawable={fullWithdrawable}
              />
            )
          }, (
            <>
              <CocoUserInfo />
              <CocoVIPInfo
                userVIPInfo={userVIPInfo}
                currentLevel={currentLevel}
              />
              <CocoBalanceInfo
                totalBalanceSheetValue={totalBalanceSheetValue}
                totalReasableValue={totalReasableValue}
              />
              <CocoInviteInfo
                totalPrize={totalPrize}
                bonusAwaitingSettlement={bonusAwaitingSettlement}
                fullWithdrawable={fullWithdrawable}
              />
              <CocoNavigator onClick={()=>navigate(PageOrModalPathEnum.GameRecordPage)}>
                <div>
                  Registro Do Jogo
                </div>
              </CocoNavigator>
              <CocoNavigator onClick={()=>navigate(PageOrModalPathEnum.SettingPage)}>
                <div>
                  Modificar Dados
                </div>
              </CocoNavigator>
            </>
          )
          // (
          //   <>
          //     <PernambucanaVIPInfo
          //       userVIPInfo={userVIPInfo}
          //       currentLevel={currentLevel}
          //     />
          //     <PernambucanaBalanceInfo
          //       totalBalanceSheetValue={totalBalanceSheetValue}
          //       totalReasableValue={totalReasableValue}
          //     />
          //     <PernambucanaInviteInfo
          //       totalPrize={totalPrize}
          //       bonusAwaitingSettlement={bonusAwaitingSettlement}
          //       fullWithdrawable={fullWithdrawable}
          //     />
          //     <PernambucanaNavigator onClick={()=>navigate(PageOrModalPathEnum.SettingPage)}>
          //       <div className={"flex flex flex-row items-center"}>
          //         <img className="w-[26px] h-[26px] mr-2" alt="arrow" src={`assets/${environment.assetPrefix}/ic_account_edit.png`}/>
          //         <span>Modificar dados</span>
          //       </div>
          //     </PernambucanaNavigator>
          //     <PernambucanaNavigator onClick={()=>navigate(PageOrModalPathEnum.GameRecordPage)}>
          //       <div className={"flex flex flex-row items-center"}>
          //         <img className="w-[26px] h-[26px] mr-2" alt="arrow" src={`assets/${environment.assetPrefix}/ic_account_record.png`}/>
          //         <span>Registro do jogo</span>
          //       </div>
          //     </PernambucanaNavigator>
          //   </>
          // )
          )
        }

      </PopoverContainer>
    </div>

  )
}
