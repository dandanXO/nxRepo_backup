import React from "react";
import {GetVIPInfoResponse} from "../../../../../external";
import {CocoAvatar} from "../../../../components/Avatar/CocoAvatar";
import {AppLocalStorage} from "../../../../../persistant/localstorage";
import {environment} from "../../../../../../environments/environment";
import {useDispatch, useSelector} from "react-redux";
import {appSlice, totalBalanceSheetSelector, totalReasableSelector} from "../../../../../reduxStore/appSlice";
import CurrentVIPIcon from "../../../../components/CurrentVIPIcon";
import ProgressBar from "../../../VIPGradePage/env/coco/VIPGradePage/ProgressBar";
import styled from "styled-components";
import {CheckInButton} from "../../../../components/Buttons/CheckInButton";
import {DepositButton} from "../../../../components/Buttons/DepositButton2";
import {WithdrawButton} from "../../../../components/Buttons/WithdrawButton";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {Container} from "../../../../components/container/Container";

import {List} from "../../../../components/List";
import {ListHeader} from "../../../../components/List/ListHeader";
import {ListItem} from "../../../../components/List/ListItem";
import {CopyIcon} from "../../../../components/Icons/CopyIcon";
import {IUserInfo} from "../../../../../persistant/IUserInfo";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import { clampNumber, formatLocaleMoney } from "../../../../utils/format";



const VIPContainer = styled.div`
  border: 2px solid var(--primary-assistant);
  background: linear-gradient(180deg,var(--primary-main-from),var(--primary-main-to));
`;

interface IBetMyPageProps {
  userVIPInfo?: GetVIPInfoResponse
  currentLevel: number
}

const MyPage = ({
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
    <Container className={"!pt-4 pb-[80px]"}>
      <section className='flex justify-between items-center'>

        <div className='flex gap-4 items-center'>
          <div className='h-[60px] w-[60px] rounded-[13px] overflow-hidden'>
            <CocoAvatar className='h-[60px] w-[60px]' />
          </div>
          <div>
            <div className='text-white text-base'>{user.nickname}</div>
            <div className='text-white text-sm flex items-center'>
              <span className={"text-[var(--text-tertiary)]"}>ID:{user.user_id}</span>
              <CopyIcon copyText={user.user_id} />
            </div>
          </div>
        </div>

        <CheckInButton
          onClick={()=>onClickToCheckInDaily()}
        >Check-in</CheckInButton>
      </section>

      <section className='flex justify-between text-center mt-[26px] mb-5'>
        <div className='w-full px-3 flex flex-col gap-3 items-center'>
          <div className='text-xl text-white'>R$ {formatLocaleMoney(totalBalanceSheetValue)}</div>
          <div className='text-sm text-white'>Fundos totais</div>
          <DepositButton
            className='w-[126px]'
            onClick={() => onClickToWallet()}
          >Depósito</DepositButton>
        </div>

        <div className='w-full px-3 flex flex-col gap-3 items-center'>
          <div className='text-xl text-white'>R$ {formatLocaleMoney(totalReasableValue)}</div>
          <div className='text-sm text-white'>Retirável Total</div>
          <WithdrawButton
            className='w-[126px]'
            onClick={() => onClickToWallet()}
          >
            Retirar
          </WithdrawButton>
        </div>
      </section>

      <VIPContainer className='rounded-xl flex items-center px-[14px] gap-[14px] py-4'>

        <div className='w-1/3'>
          <CurrentVIPIcon
            className='gap-[10px]'
            level={currentLevel}
            imageClassName='w-[84px]'
            textClassName='text-3xl text-white w-[61px]'
          />
        </div>

        <div className='w-2/3 text-white'>
          <div className='mb-1'>
            <div>Depósitos totais:</div>
            <div className='text-[var(--secondary-assistant)]'>
              {
                formatLocaleMoney(userVIPInfo?.data?.vip_score ? userVIPInfo?.data?.vip_score/100: 0)
              } / {
                formatLocaleMoney(userVIPInfo?.data?.next_level_score? userVIPInfo?.data?.next_level_score/100 : 0)
              }
            </div>
          </div>
          <ProgressBar
            className='h-6 bg-white mb-3'
            rounded='rounded-xl'
            progress={
              (userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)
            }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='h-full flex px-3 items-center justify-center'>
              <div className='text-xs text-[var(--text-deposit)] font-medium'>
                Próximo nível {clampNumber(((userVIPInfo?.data?.vip_score || 0) / (userVIPInfo?.data?.next_level_score || 1)* 100 ), 0, 100).toFixed(0)}%
              </div>
            </div>
          </ProgressBar>

          <div className='mb-1'>
            <div>Pontos de apostas:</div>
            <div className='text-[var(--secondary-assistant)]'>
              {
                formatLocaleMoney(userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow/100 : 0)
              } / {
                formatLocaleMoney(userVIPInfo?.data?.next_level_flow ? userVIPInfo?.data?.next_level_flow/100 : 0)
              }
            </div>
          </div>
          <ProgressBar
            className='h-6 bg-white'
            rounded='rounded-xl'
            progress={
              userVIPInfo?.data?.flow_progress
                ? userVIPInfo?.data?.flow_progress / 100
                : 0
            }
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='h-full flex px-3 items-center justify-center font-medium'>
              <div className='text-xs text-[var(--text-deposit)]'>
                Próximo nível {clampNumber(userVIPInfo?.data?.flow_progress || 0, 0, 100).toFixed(0)}%
              </div>
            </div>
          </ProgressBar>
        </div>
      </VIPContainer>

      <List
        className={"bg-[var(--primary-variant)]"}
      >
        <ListHeader>
          <div className='bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] text-transparent'>
            Outras funções
          </div>
        </ListHeader>
        <ListItem title={"Registros de cobrança"} onClick={() => onClickToWallet()}/>
        <ListItem title={"Registro do jogo"} onClick={() => onClickToGameRecord()}/>
        <ListItem title={"Configuração"} onClick={() => onClickToSetting()}/>
        <ListItem isEnd={true} title={"Sair"} onClick={() => dispatch(appSlice.actions.showMobileLogoutModal(true))}/>
      </List>

    </Container>
  )
}

export default MyPage;
