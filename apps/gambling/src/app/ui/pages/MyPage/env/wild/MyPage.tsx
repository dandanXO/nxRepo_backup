import React from "react";
import {GetVIPInfoResponse} from "../../../../../external";
import {CocoAvatar} from "../../../../components/Avatar/CocoAvatar";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {useDispatch, useSelector} from "react-redux";
import {appSlice, totalBalanceSheetSelector, totalReasableSelector} from "../../../../../reduxStore/appSlice";
import CurrentVIPIcon from "../../../../components/CurrentVIPIcon";
import styled from "styled-components";
import {CheckInButton} from "../../../../components-bs/Buttons/CheckInButton";
import {DepositButton} from "../../../../components-bs/Buttons/DepositButton2";
import {WithdrawButton} from "../../../../components-bs/Buttons/WithdrawButton";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {PageContainer} from "../../../../components-bs/PageContainer";

import {List} from "../../../../components/List";
import {ListHeader} from "../../../../components/List/ListHeader";
import {ListItem} from "../../../../components/List/ListItem";
import {CopyIcon} from "../../../../components-bs/Icons/CopyIcon";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import { ProgressBar } from "../../../../components/ProgressBar";



const VIPContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(0deg,#7707CE,#5D11F7,#0078FF),linear-gradient(0deg,#E27DFF,#00EAFF);
`;

interface IBetMyPageProps {
  userVIPInfo?: GetVIPInfoResponse
  currentLevel: number
}

const Coco777BetMyPage = ({
                            userVIPInfo,
                            currentLevel
                          }: IBetMyPageProps) => {
  const user: IUserInfo = AppLocalStorage.getItem(AppLocalStorageKey.userInfo) ? JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || "") : {};

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
    <PageContainer className={"!pt-4 pb-[80px]"}>
      <section className='flex justify-between items-center'>

        <div className='flex gap-4 items-center'>
          <CocoAvatar />
          <div>
            <div className='text-white text-base'>{user.nickname}</div>
            <div className='text-white text-sm flex items-center'>
              <span>ID:{user.user_id}</span>
              <CopyIcon copyText={user.user_id} />
            </div>
          </div>
        </div>

        <CheckInButton
          onClick={()=>onClickToCheckInDaily()}
        >check-in</CheckInButton>
      </section>

      <section className='flex justify-between text-center py-3'>
        <div className='w-full px-3'>
          <div className='text-xl text-white'>R$ {totalBalanceSheetValue.toLocaleString()}</div>
          <div className='text-sm text-white'>Fundos totais</div>
          <DepositButton
            onClick={()=>onClickToWallet({'panelType':'deposit'})}
          >Depósito</DepositButton>
        </div>

        <div className='w-full px-3'>
          <div className='text-xl text-white'>R$ {totalReasableValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
          <div className='text-sm text-white'>Retirável Total</div>
          <WithdrawButton
            onClick={()=>onClickToWallet({'panelType':'withdraw'})}
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
          <div className='mb-1'>Depósitos totais: {
            userVIPInfo?.data?.vip_score ? (userVIPInfo?.data?.vip_score/100).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}): 0
          } / {
            userVIPInfo?.data?.next_level_score? (userVIPInfo?.data?.next_level_score/100).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) : 0
          }</div>
          <ProgressBar
            className='h-4 bg-table-main mb-3'
            rounded='rounded-full'
            progress={
              (userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)
            }
            progressColor='linear-gradient(0deg,#E15B20,#FFEA00)'
          >
            <div className='h-full flex px-3 text-xs'>
              {(
                ((userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)* 100 ) >= 100 ?
                  100:
                  ((userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)* 100 )
              ).toFixed(0)}%
            </div>
          </ProgressBar>

          <div className='mb-1'>Pontos de apostas: {
            userVIPInfo?.data?.flow ? (userVIPInfo?.data?.flow/100).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) : 0
          } / {
            userVIPInfo?.data?.next_level_flow ? (userVIPInfo?.data?.next_level_flow/100).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) : 0
          }</div>
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
              {(((userVIPInfo?.data?.flow || 0) / (userVIPInfo?.data?.next_level_flow || 1)*100)).toFixed(0)}%
            </div>
          </ProgressBar>
        </div>
      </VIPContainer>

      <List
        className={"bg-gradient-to-b from-[#0F1744] to-[#2E1555]"}
      >
        <ListHeader>Outras funções</ListHeader>
        <ListItem title={"Registros de cobrança"} onClick={()=>onClickToWallet({'panelType':'record'})}/>
        <ListItem title={"Registro do jogo"} onClick={() => onClickToGameRecord()}/>
        <ListItem title={"Configuração"} onClick={() => onClickToSetting()}/>
        <ListItem isEnd={true} title={"Sair"} onClick={() => dispatch(appSlice.actions.showMobileLogoutModal(true))}/>
      </List>

    </PageContainer>
  )
}

export default Coco777BetMyPage;
