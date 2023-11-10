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
import { IUserStore } from "../../../gateway/socket";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {environment} from "../../../../environments/environment";
import {Avatar} from "../../templates/PageTemplate/Avatar";
import {AvatarAccountInfo} from "../../templates/PageTemplate/AvatarAccountInfo";

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
      <div className={'relative h-[30px] w-[280px] flex-auto rounded-3xl bg-[#3A7052] leading-[30px]'}>
        <Progress progress={progress > 1 ? 100 : progress * 100} />
        <span className="absolute right-4 top-0 text-[#FFA500] ">
        VIP {currentLevel + 1}
      </span>
        <span className="absolute text-center top-0 left-4 right-4 text-[#FFA500]">
          {progress > 1 ? '100' : (progress * 100).toFixed(2)}%
        </span>
        <span className="absolute left-4 top-0 text-[#FFA500] pr-4">
        VIP {currentLevel}
      </span>
        {/*<span className="text-[#FFA500]" style={{ background: 'linear-gradient(45deg, #FFA500, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>*/}
        <span className="text-sm text-[#0BFF0B]">
        Depósitos totais:
        </span>
        <span className="text-sm mr-6 text-[#ffffff]">
          R${' '}
          {userVIPInfo?.data?.vip_score
              ? userVIPInfo?.data?.vip_score / 100
              : 0}
          {' '}
          /
          <span className="mr-6 text-[#0BFF0B]">
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
      <div className={'relative h-[30px] w-[280px] flex-auto rounded-3xl bg-[#3A7052] leading-[30px]'}>
        <Progress progress={progress > 1 ? 100 : progress * 100} />
        <span className="absolute right-4 top-0 text-[#FFA500]">
        VIP {currentLevel + 1}
      </span>
        <span className="absolute text-center top-0 left-4 right-4 text-[#FFA500]">
          {progress > 1 ? '100' : (progress * 100).toFixed(2)}%
        </span>
        <span className="absolute left-4 top-0 text-[#FFA500] pr-4">
        VIP {currentLevel}
      </span>
        {/*<span className="text-[#FFA500] pr-4" style={{ background: 'linear-gradient(45deg, #FFA500, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>*/}
        <span className="text-sm text-[#0BFF0B]">
       Pontos de apostas:
        </span>
        <span className="mr-6 text-[#ffffff]">
        R${' '}
          {userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow / 100 : 0}{' '}/
          <span className="mr-6 text-[#0BFF0B]">
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
  background-color: #014F4B;
  border: 1px solid #2CFD99;
  background-size: 100% 100%;
  border-radius: 10px;
  padding: 1px;
  height: 110px;
  margin-top: 10px;
`;

const ListItemContainer = styled.div`
  background: #014F4B;
  border: 1px solid #2CFD99;
  background-size: 100% 100%;
  border-radius: 10px;
  padding: 1px;
  height: 49px;
  margin-top: 10px;
`;


const VIPContainer = styled.div`
  background-color: #014F4B;
  border: 1px solid #2CFD99;
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
  console.log("mypage isMobile", isMobile)

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
    triggerGetSignConfig({
      onlyGetSignInConfig: true,
      token,
    });
    triggerGetUserVIPInfo({
      token,
    });
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
  console.log("vip_level", vip_level);

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
  return (
  <>

    <div className={"px-4 pt-4 pb-[100px] w-full"}>
      <section className={"profile flex flex-row justify-between items-center mb-4"}>
        <div className={"flex flex-row items-center"}>
          <div className={"mr-4"}>
            <Avatar big={true}/>
          </div>
          <div className={""}>
            <AvatarAccountInfo className={"!items-start"}/>
          </div>
        </div>
        <button className="relative" onClick={() => navigate(PageOrModalPathEnum.NotificationPage)}>
          <img alt={"message"} className="w-[30px] h-[30px]" src={`assets/${environment.assetPrefix}/icon_44.png`}/>
          {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
        </button>
      </section>

   <div>
    <VIPContainer>
      <div className={"flex flex flex-row items-center mt-3 w-full"}>
      <img className="w-9 h-9 mr-3 ml-3" src={`assets/${environment.assetPrefix}/ic_vip01.png`}/>
      <span className="text-3xl font-bold pr-4 mr-7" style={{ background: 'linear-gradient(45deg, #FE6060, #FFA24D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VIP{currentLevel}</span>
        <div className="flex-grow"></div>
        <RightOutlined className="flex-grow" style={{ fontSize: 25, color: 'white', fontWeight: 1000 }} onClick={() => navigate(PageOrModalPathEnum.VIPGradePage)} />      </div>
      <VIPBorderStyleContainer className={'flex flex-row'}>
        <div className={'relative mr-5 h-[30px] w-full flex-auto rounded-3xl  text-left'}>
          <ProgressBar1
              progress={
                  (userVIPInfo?.data?.vip_score || 0) /
                  (userVIPInfo?.data?.next_level_score || 1)
              }
              currentLevel={currentLevel}
              userVIPInfo={userVIPInfo}
          />
          <div className="text-center text-base text-[#4C9F71]" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(45deg, #FFA500, #FFFFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          </div>
        </div>
      </VIPBorderStyleContainer>





      <VIPBorderStyleContainer className={'flex flex-row'}>
        <div className={'relative mr-5 h-[30px] w-full flex-auto rounded-3xl  text-left'}>
          <ProgressBar2
              progress={
                userVIPInfo?.data?.flow_progress
                    ? userVIPInfo?.data?.flow_progress / 100
                    : 0
              }
              currentLevel={currentLevel}
              userVIPInfo={userVIPInfo}
          />
        </div>
      </VIPBorderStyleContainer>
          </VIPContainer>
          </div>





    <DepositAndWithdrawalContainer>
      <section className={"total flex flex-row text-white justify-between mb-4 mt-1"}>

        <div className={"item flex-1"}>
          <div className={"title text-[#ffffff] mb-2"}>Fundos totais</div>
          <div className={"money text-lg mb text-[#fffa73]"}>R${totalBalanceSheetValue}</div>
          <MyPageButtonD onClick={() => {
            navigate(PageOrModalPathEnum.WalletPage)
          }} className={"rounded-xl px-4 py-3 text-white font-bold text-lg"}>Depósito</MyPageButtonD>
        </div>

        <div className={"item flex-1"}>
          <div className={"title text-[#ffffff] mb-2"}>Retirável Total</div>
          <div className={"money text-lg mb text-[#fffa73]"}>R${totalReasableValue}</div>
          <MyPageButtonW onClick={() => {
            navigate(PageOrModalPathEnum.WalletPage)
          }} className={"rounded-xl px-4 py-3 text-white font-bold text-lg"}>Retirar</MyPageButtonW>
        </div>

      </section>
    </DepositAndWithdrawalContainer>

      <div className={"text-white text-lg font-bold text-left mb-2 mt-5"}>Outras funções</div>

      <ListItemContainer className={"control-item text-white !font-sm"}>
        <ListItem first={true} bottomBorder={true} onClick={() => {
          navigate(PageOrModalPathEnum.WalletPage)
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"order-record"} className={"w-[16px] h-[20px] mr-2"} src={`assets/${environment.assetPrefix}/ic_account_bill.png`}/>
            <span className={"font-bold"}>Registros de cobrança</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>
        </ListItemContainer>

      <ListItemContainer className={"control-item text-white !font-sm"}>
        <ListItem bottomBorder={true} onClick={() => {
          navigate(PageOrModalPathEnum.GameRecordPage)
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"game-register"} className={"w-[16px] h-[20px] mr-2"} src={`assets/${environment.assetPrefix}/ic_account_record.png`}/>
            <span className={"font-bold"}>Registro do jogo</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>
        </ListItemContainer>

      <ListItemContainer className={"control-item text-white !font-sm"}>
        <ListItem bottomBorder={true} onClick={() => {
          navigate(PageOrModalPathEnum.SettingPage)
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"setting"} className={"w-[16px] h-[20px] mr-2"} src={`assets/${environment.assetPrefix}/ic_account_edit.png`}/>
            <span className={"font-bold"}>Configuração</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>
        </ListItemContainer>

      <ListItemContainer className={"control-item text-white !font-sm"}>
        <ListItem last={true} onClick={() => {
          dispatch(appSlice.actions.showMobileLogoutModal(true));
        }}>
          <div className={"flex flex flex-row items-center"}>
            <img alt={"log-out"} className={"w-[16px] h-[20px] mr-2"} src={`assets/${environment.assetPrefix}/ic_signout.png`}/>
            <span className={"font-bold"}>Sair</span>
          </div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </ListItem>
        </ListItemContainer>


    </div>
  </>
 )
}
