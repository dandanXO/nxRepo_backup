import React from "react";
import {GetVIPInfoResponse} from "../../../external";
import {CocoAvatar} from "../../components/Avatar/CocoAvatar";
import {useNavigate} from "react-router";
import {IUserInfo} from "../../../persistant/pending/loginMode";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {environment} from "../../../../environments/environment";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {appSlice, totalBalanceSheetSelector, totalReasableSelector} from "../../../reduxStore/appSlice";
import CurrentVIPIcon from "../../components/CurrentVIPIcon";
import ProgressBar from "../VIPGradePage/Coco777betVIPGradePage/ProgressBar";
import {RightOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {CheckInButton} from "../../components/Buttons/CheckInButton";
import {DepositButton} from "../../components/Buttons/DepositButton2";
import {WithdrawButton} from "../../components/Buttons/WithdrawButton";
import {usePageNavigate} from "../../hooks/usePageNavigate";

const VIPContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(0deg,#7707CE,#5D11F7,#0078FF),linear-gradient(0deg,#E27DFF,#00EAFF);
`;

const NavigatorContainer = styled.div`
  background: linear-gradient(0deg,#0F1744,#2E1555);
  border: 1px solid rgba(255,255,255,.1);
`;

interface ICoco777BetMyPageProps {
  userVIPInfo?: GetVIPInfoResponse
  currentLevel: number
}

const Coco777BetMyPage = ({
  userVIPInfo,
  currentLevel
}: ICoco777BetMyPageProps) => {
  const user: IUserInfo = AppLocalStorage.getItem("userInfo") ? JSON.parse(AppLocalStorage.getItem("userInfo") || "") : {};

  const totalBalanceSheetValue= useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);
  const dispatch = useDispatch()

  const {
    onClickToCheckInDaily,
    onClickToWallet,
    onClickToGameRecord,
    onClickToSetting,
  } = usePageNavigate();

  return (
    <div className='p-3'>
      <section className='flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
          <CocoAvatar />
          <div>
            <div className='text-white text-base'>{user.nickname}</div>
            <div className='text-white text-sm flex items-center'>
              <span className='mr-2'>ID:{user.user_id}</span>
              <button>
                <img className="w-[17px] h-[17px]" alt={"copy"} src={`assets/${environment.assetPrefix}/ic_copy.png`}/>
              </button>
            </div>
          </div>
        </div>

        <CheckInButton
          className='py-1 px-4 rounded-full bg-medium text-sm text-white'
          onClick={()=>onClickToCheckInDaily()}
        >
          check-in
        </CheckInButton>
      </section>

      <section className='flex justify-between text-center py-3'>
        <div className='w-full px-3'>
          <div className='text-xl text-white'>R$ {totalBalanceSheetValue}</div>
          <div className='text-sm text-white'>Fundos totais</div>
          <DepositButton
            className='bg-medium w-full py-2 text-white rounded-md mt-3 text-base font-bold'
            onClick={() => onClickToWallet()}
          >
            Depósito
          </DepositButton>
        </div>

        <div className='w-full px-3'>
          <div className='text-xl text-white'>R$ {totalReasableValue}</div>
          <div className='text-sm text-white'>Retirável Total</div>
          <WithdrawButton
            className='bg-medium w-full py-2 text-white rounded-md mt-3 text-base font-bold'
            onClick={() => onClickToWallet()}
          >
            Retirar
          </WithdrawButton>
        </div>
      </section>

      <VIPContainer className='rounded-xl flex mt-1 items-center pr-6'>
        <div className='w-1/3 p-3'>
          <CurrentVIPIcon level={currentLevel} textClassName='text-3xl text-white'/>
        </div>
        <div className='w-2/3 text-white'>
          <div className='mb-1'>Depósitos totais: {userVIPInfo?.data?.vip_score || 0} / {userVIPInfo?.data?.next_level_score || 1}</div>
          <ProgressBar
            className='h-4 bg-table-main mb-3'
            rounded='rounded-full'
            progress={
              (userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)
            }
            progressColor='linear-gradient(0deg,#E15B20,#FFEA00)'
          >
            <div className='h-full flex px-3 text-xs'>
              {((userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)).toFixed(0)}%
            </div>
          </ProgressBar>

          <div className='mb-1'>Pontos de apostas: {userVIPInfo?.data?.flow || 0} / {userVIPInfo?.data?.next_level_flow || 1}</div>
          <ProgressBar
            className='h-4 bg-table-main'
            rounded='rounded-full'
            progress={
              userVIPInfo?.data?.flow_progress
                ? userVIPInfo?.data?.flow_progress / 100
                : 0
            }
            progressColor='linear-gradient(0deg,#E15B20,#FFEA00)'
          >
            <div className='h-full flex px-3 text-xs'>
              {((userVIPInfo?.data?.flow || 0) / (userVIPInfo?.data?.next_level_flow || 1)).toFixed(0)}%
            </div>
          </ProgressBar>
        </div>
      </VIPContainer>

      <NavigatorContainer className='rounded-xl text-white mt-5 text-base'>
        <div className='p-3'>Outras funções</div>
        <button
          className='p-3 flex justify-between border-b-[0.1px] border-black border-opacity-10 items-center w-full'
          onClick={() => onClickToWallet()}
        >
          <div>Registros de cobrança</div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </button>
        <button
          className='p-3 flex justify-between border-b-[0.1px] border-black border-opacity-10 items-center w-full'
          onClick={()=>onClickToGameRecord()}
        >
          <div>Registro do jogo</div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </button>
        <button
          className='p-3 flex justify-between border-b-[0.1px] border-black border-opacity-10 items-center w-full'
          onClick={() => onClickToSetting()}
        >
          <div>Configuração</div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </button>
        <button
          className='p-3 flex justify-between items-center w-full'
          onClick={()=> dispatch(appSlice.actions.showMobileLogoutModal(true))}
        >
          <div>Sair</div>
          <RightOutlined style={{ fontSize: 16 }}/>
        </button>
      </NavigatorContainer>
    </div>
  )
}

export default Coco777BetMyPage;
