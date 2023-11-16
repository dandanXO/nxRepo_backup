import styled, { keyframes } from "styled-components";
import {RightOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {
  GetVIPInfoResponse,
  useGetSignInConfigMutation,
  useGetUserVIPAllInfoQuery,
  useGetVIPInfoMutation, useLazyGetUserVIPAllInfoQuery,
} from '../../../external';

import {appSlice, totalBalanceSheetSelector, totalReasableSelector} from "../../../reduxStore/appSlice";
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import useBreakpoint from "../../hooks/useBreakpoint";
import {useEffect, useState} from "react";
import { MessageCountBadge } from "../../components/MessageCountBadge";
import {useGetLetterListMutation} from "../../../external";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {environment} from "../../../../environments/environment";
import {Avatar} from "../../components/Avatar";
import {AvatarAccountInfo} from "../../components/AvatarAccountInfo";
import Pernambucana777BetMyPage from "./Pernambucana777BetMyPage";
import Coco777BetMyPage from "./Coco777BetMyPage";

const MyPageButtonD = styled.button`
  background-image: url("assets/${environment.assetPrefix}/btn_green05.png");
  background-size: 100% 100%;
  padding: 4px 31px;
  text-shadow: 0 1px 2px #036A02;
`

const MyPageButtonW = styled.button`
  //background: none;
  //border-radius: 0.2rem;
  background-image: url("assets/${environment.assetPrefix}/btn_yellow05.png"); /* 设置背景图像的路径 */
  background-size: 100% 100%;
  //box-shadow: 0 0.04rem #036a02, inset 0 0.02rem 0.06rem rgba(255,255,255,.5);

  padding: 4px 40px;
  text-shadow: 0 1px 2px #036A02;
`;



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



const ProgressBar1 = ({ progress, currentLevel, userVIPInfo }: { progress: number, currentLevel: number, userVIPInfo: GetVIPInfoResponse | undefined }) => {
  return (
      <div className={'relative h-[30px] w-[280px] flex-auto rounded-3xl bg-assistant leading-[30px]'}>
        <Progress progress={progress > 1 ? 100 : progress * 100} />
        <span className="absolute right-4 top-0 text-medium ">
        VIP {currentLevel + 1}
      </span>
        <span className="absolute text-center top-0 left-4 right-4 text-medium ">
          {progress > 1 ? '100' : (progress * 100).toFixed(2)}%
        </span>
        <span className="absolute left-4 top-0 text-medium pr-4">
        VIP {currentLevel}
      </span>
        <span className="text-sm text-main-primary-main">
        Depósitos totais:
        </span>
        <span className="text-sm mr-6 text-white">
          {' '}R${' '}
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
      </div>
  );
};


const ProgressBar2 = ({ progress, currentLevel, userVIPInfo }: { progress: number, currentLevel: number, userVIPInfo: GetVIPInfoResponse | undefined }) => {
  return (
      <div className={'relative h-[30px] w-[280px] flex-auto rounded-3xl bg-assistant leading-[30px]'}>
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
      </div>
  );
};

const DepositAndWithdrawalContainer = styled.div`
  background-color: var(--varient);
  border: 1px solid var(--main-primary-main);
  background-size: 100% 100%;
  border-radius: 10px;
  padding: 1px;
  height: 110px;
  margin-top: 10px;
`;

const ListItemContainer = styled.div`
  background: var(--varient);
  border: 1px solid var(--main-primary-main);
  background-size: 100% 100%;
  border-radius: 10px;
  padding: 1px;
  height: 49px;
  margin-top: 10px;
`;


const VIPContainer = styled.div`
  background-color: var(--varient);
  border: 1px solid var(--main-primary-main);
  background-size: 100% 100%;
  border-radius: 10px;
  padding: 1px;
  height: 200px;
`;


const ListItem = styled.button.attrs((props) => ({
  className: "text-lg w-full",
}))<{
  last?: boolean;
  first?: boolean;
  // expand?: boolean;
  bottomBorder?: boolean;
}>`
  ${props => (props.first) && `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `};

  ${props => (props.last) && `
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  `};

  //box-shadow: inset 0 0 36px 5px rgba(255,255,255,.11) !important;
  border-bottom: ${(props) => props.bottomBorder ? "1px rgba(255,255,255,0.2) solid" : "none"};

  padding: 10px 12px;
  text-align: left;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MyPage = () => {
  useAllowLoginRouterRules();
  const navigate = useNavigate();

  const {updateBalance} = useAutoUpdateBalance();


  const {isMobile} = useBreakpoint();
  // console.log("mypage isMobile", isMobile)

  useEffect(() => {
    if(!isMobile) {
      navigate(PageOrModalPathEnum.IndexPage)
    }
  }, [isMobile])


  // const { userAmount } = useSelector((state: RootState) => state.app.userStore as IUserStore)


  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);

  const { messageCount } = useSelector((state: RootState) => state.app)


  const dispatch = useDispatch();

  const [triggerGetLetter, { data }] = useGetLetterListMutation({});

  useEffect(() => {
    triggerGetLetter({
      token: AppLocalStorage.getItem('token') || '',
    });
  }, [])


  const [triggerGetUserVIPALLInfo, {currentData: vipAllInfo}] = useLazyGetUserVIPAllInfoQuery();

  const [triggerGetSignConfig, { data: signInConfig }] = useGetSignInConfigMutation();
  const [triggerGetUserVIPInfo, { data: userVIPInfo }] = useGetVIPInfoMutation();

  useEffect(() => {
    const token = AppLocalStorage.getItem('token') || '';
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

  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(vip_level);
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
    dispatch(appSlice.actions.setUserVIPLevel(signInConfig?.data?.vipLevel))

    setCurrentLevel(vip_level)

  }, [signInConfig]);

  const allLevelInfo = vipAllInfo ? vipAllInfo.data : [];
  const currentLevelInfo = allLevelInfo?.find(
      (info) => info.level === currentSelectedLevel
  );

  const allSignInConfig = signInConfig?.data.signInAllConfig || [];
  const vipConfig = allSignInConfig?.find(
      (config) =>
          config.identifier.split('::')[2].replace('V', '') ===
          `${currentSelectedLevel}`
  );

  const dayConfigs = JSON.parse(vipConfig?.value || '[]');

  const signBonus = dayConfigs?.reduce(
      (acc: number, current: { cashback: number }) => acc + current.cashback,
      0
  );

  if (environment.assetPrefix === 'coco777bet') {
    return (
      <Coco777BetMyPage currentLevel={currentLevel} userVIPInfo={userVIPInfo} />
    )
  }

  return (
    <Pernambucana777BetMyPage currentLevel={currentLevel} userVIPInfo={userVIPInfo} />
  )
}
