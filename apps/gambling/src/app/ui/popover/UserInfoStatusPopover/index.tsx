import {Button} from "../../components/Buttons/Button";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useSelector} from "react-redux";

import {
  accountPromotedSwingSelector,
  appSlice,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";
import {GetVIPInfoResponse,
  useGetSignInConfigMutation,
  useGetVIPInfoMutation, useLazyGetInviteRewardDataQuery, useLazyGetUnsettleInviteRewardDataQuery, useLazyGetUserVIPAllInfoQuery} from "../../../external";
import {useEffect, useMemo, useState} from "react";
import styled, { keyframes } from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import { RootState } from "../../../reduxStore";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { environment } from "../../../../environments/environment"
import { UserInfoStatusPopoverContainer as CocoPopoverContainer } from './env/coco/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverContainer as WildPopoverContainer } from './env/wild/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverContainer as PernambucanaPopoverContainer } from './env/pernambucana/UserInfoStatusPopoverContainer';
import { UserInfoStatusPopoverVIPInfo as CocoVIPInfo} from './env/coco/UserInfoStatusPopoverVIPInfo'
import { UserInfoStatusPopoverVIPInfo as WildVIPInfo} from './env/wild/UserInfoStatusPopoverVIPInfo'
import { UserInfoStatusPopoverVIPInfo as PernambucanaVIPInfo} from './env/pernambucana/UserInfoStatusPopoverVIPInfo'
import { renderByPlatform } from "../../utils/renderByPlatform";
import { UserInfoStatusPopoverBalanceInfo as CocoBalanceInfo } from "./env/coco/UserInfoStatusPopoverBalanceInfo";
import { UserInfoStatusPopoverBalanceInfo as WildBalanceInfo } from "./env/wild/UserInfoStatusPopoverBalanceInfo";
import { UserInfoStatusPopoverBalanceInfo as PernambucanaBalanceInfo } from "./env/pernambucana/UserInfoStatusPopoverBalanceInfo";


const PopoverContainer = renderByPlatform({
  "coco777bet": CocoPopoverContainer,
  "wild777bet": WildPopoverContainer
}, PernambucanaPopoverContainer)

export interface IUserInfoStatusPopoverVIPInfoProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
}

export interface IUserInfoStatusPopoverBalanceInfoProps {
  totalBalanceSheetValue: number
  totalReasableValue: number
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

const OtherContainer = styled.div`
  background: var(--varient);
  background-size: 100% 100%;
  border: 1px solid var(--main-primary-main);
  border-radius: 10px;
  padding: 1px;
  height: 60px;
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

  const [triggerGetInviteReward, { currentData: inviteInfo, isFetching: isInviteInfoFetching }] =
    useLazyGetInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const [triggerGetUnsettleInviteReward, { currentData: inviteUnsettle, isFetching: isInviteUnsettleFetching }] =
    useLazyGetUnsettleInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  // console.log("inviteInfo", inviteInfo);
  // console.log("inviteUnsettle", inviteUnsettle);

  const { isLogin } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if(isLogin) {
      triggerGetInviteReward({});
      triggerGetUnsettleInviteReward({})
    }

  }, [])

  // A = /japi/invite/userInvite/queryInviteRewardData
  // B = /japi/invite/userInvite/queryUnsettleInviteRewardData
  const totalPrize = useMemo(() => {
    if(!inviteInfo || !inviteUnsettle) return 0;
    return parseFloat(((inviteInfo?.data?.reward + inviteUnsettle?.data?.reward + inviteUnsettle?.data?.firstRechargeReward)/100).toFixed(2))
  }, [inviteInfo, inviteUnsettle]);

  const bonusAwaitingSettlement = useMemo(() => {
    if(!inviteUnsettle) return 0
    return parseFloat(((inviteUnsettle?.data?.reward + inviteUnsettle?.data?.firstRechargeReward)/100).toFixed(2))
  }, [inviteUnsettle]);

  const fullWithdrawable = useMemo(() => {
    if(!inviteInfo) return 0
    return parseFloat(((inviteInfo?.data?.reward)/100).toFixed(2))
  }, [inviteInfo])



  const [triggerGetUserVIPALLInfo, {currentData: vipAllInfo}] = useLazyGetUserVIPAllInfoQuery();

  const [triggerGetSignConfig, { data: signInConfig }] = useGetSignInConfigMutation();
  const [triggerGetUserVIPInfo, { data: userVIPInfo }] = useGetVIPInfoMutation();

  useEffect(() => {
    const token = AppLocalStorage.getItem('token');
    if(token && token !== "" && token !== "undefined") {
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
      triggerGetUserVIPInfo({
        token,
      });
    }
    triggerGetUserVIPALLInfo(null);
  }, []);

  useEffect(() => {
    const handler = () => {
      const token = AppLocalStorage.getItem('token') || '';
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
      triggerGetUserVIPInfo({
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





  return (
    <div
      className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex-col flex justify-center items-center w-full h-full"}
      onClick={(event) => {
        props.close();
      }}
    >
      <PopoverContainer>

        {
          renderByPlatform({
            "coco777bet": (
              <>
                <CocoVIPInfo
                  userVIPInfo={userVIPInfo}
                  currentLevel={currentLevel}
                />
                <CocoBalanceInfo
                  totalBalanceSheetValue={totalBalanceSheetValue}
                  totalReasableValue={totalReasableValue}
                />
              </>
            ) ,
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
              </>
            )
          }, (
            <>
              <PernambucanaVIPInfo
                userVIPInfo={userVIPInfo}
                currentLevel={currentLevel}
              />
              <PernambucanaBalanceInfo
                totalBalanceSheetValue={totalBalanceSheetValue}
                totalReasableValue={totalReasableValue}
              />
            </>
          ) )
        }


       <OtherContainer className={'mb-4 mt-5'}>
        <Button className={"flex"} onClick={() => {
          navigate(PageOrModalPathEnum.SettingPage);
        }}>
          <div className={"flex flex flex-row items-center"}>
          <img className="w-[26px] h-[26px] mr-2" alt="arrow" src={`assets/${environment.assetPrefix}/ic_account_edit.png`}/>
          <span> Modificar dados</span>
          </div>
          <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
        </Button>
      </OtherContainer>

      <OtherContainer className={'mb-4'}>
      <Button className="text-sm mb-4 flex" style={{alignItems: 'center',justifyContent: 'space-between'}} onClick={() => {
        navigate(PageOrModalPathEnum.GameRecordPage);
      }}>
        <div className={"flex flex flex-row items-center"}>
        <img className="w-[26px] h-[26px] mr-2" alt="arrow" src={`assets/${environment.assetPrefix}/ic_account_record.png`}/>
        <span> Registro do jogo</span>
        </div>
        <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
      </Button>
      </OtherContainer>

        <ContaContainer className={'mt-3'} onClick={() => {
          navigate(PageOrModalPathEnum.VIPGradePage)
          }}>
          <Button className={"text-sm mb-4 !shadow-none"}>
            <span className={"text-base"}>Conta Promovida</span>
            <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
          </Button>

          <div className={"flex flex-row justify-between items-start px-3"}>
            <div className={"flex flex-col mr-2"}>
              <span className={"text-main-primary-main text-lg"}>{totalPrize}</span>
              <span className={"text-white"}>Prêmio total</span>
            </div>

            <div className={"w-[1px] h-[30px] bg-[rgba(255,255,255,.1)] self-center mr-1"}/>

            <div className={"flex flex-col  mr-2"}>
              <span className={"text-main-primary-main text-lg"}>{bonusAwaitingSettlement}</span>
              <span className={"text-white"}>
              Bônus aguardando
              <br/>
              liquidação
            </span>
            </div>

            <div className={"w-[1px] h-[30px] bg-[rgba(255,255,255,.1)] self-center mr-1"}/>

            <div className={"flex flex-col"}>
              {/*<span className={"text-[#FF7D03] text-lg"}>{accountPromotedSwingValue}</span>*/}
              <span className={"text-main-primary-main text-lg"}>{fullWithdrawable}</span>
              <span className={"text-white"}>Retirável Total</span>
            </div>
          </div>
        </ContaContainer>



      </PopoverContainer>
    </div>

  )
}
