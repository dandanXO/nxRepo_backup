import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled, {keyframes} from 'styled-components';

import {
  GetSignInConfigResponse,
  GetUserVIPAllInfoResponse,
  GetVIPInfoResponse,
} from '../../../../../../external';
import { PageOrModalPathEnum } from '../../../../../PageOrModalPathEnum';
import { LevelList } from '../../../../DailySignInPage';
import {IRLevelButton, ProgressBar} from './index';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import {environment} from "../../../../../../../environments/environment";
import { JackpotMap } from "../../../index";
import { usePageNavigate } from '../../../../../router/hooks/usePageNavigate';

export const LevelListBottomBr = styled.div`
  height: 1rem;
  background: linear-gradient(180deg, transparent 0%, #793fdb 100%);
  box-shadow: 0 -1px rgba(255, 255, 255, 0.1) inset,
    0 0.03rem 0.08rem rgba(0, 0, 0, 0.3);
  padding-bottom: 0;
`;

const vips: number[] = [];

for (let i = 0; i <= 25; i += 1) {
  vips.push(i);
}

const ItemContainer = styled.div.attrs((props) => ({
  className: cx(
    'rounded-xl px-5 py-4 mb-3 text-white text-base',
    props.className
  ),
}))`
  //width: 100%;
  //margin: 0 auto 0.3rem;
  //border-radius: 0.2rem;
  //padding: 0 0.6rem 0 2rem;
  //box-sizing: border-box;
  //position: relative;
  //z-index: 1;
  //height: 1.2rem;
  //display: flex;
  //align-items: center;
  background: var(--medium);
  border-radius: 16px;
`;

const Container = styled.div`
  //    no-repeat center top/100%,
  //  #e55b69;
  //background-color: #287052;
  background-color: rgba(40, 112, 82, 0.1);
  background-size: 100% 100%;
`;

interface IVIPGradeMobileTemplateProps {
  userVIPInfo?: GetVIPInfoResponse;
  allLevelInfo: GetUserVIPAllInfoResponse['data'];
  allSignInConfig: GetSignInConfigResponse['data']['signInAllConfig'];
}

const VIPTitle = styled.button.attrs<{
  className?: string;
}>((props) => ({
  className: props.className,
}))`
  background: -webkit-linear-gradient(-90deg, var(--dashboard-block3-gradient-from) 0%, var(--dashboard-block3-gradient-to) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Pernambucana777BetVIPGradeMobileTemplate = ({
    userVIPInfo,
    allLevelInfo,
    allSignInConfig,
  }: IVIPGradeMobileTemplateProps) => {

  // const user = AppLocalStorage.getItem("userInfo") ? JSON.parse(AppLocalStorage.getItem("userInfo") || ""): {};
  // const vip_level = useSelector((state: RootState) => state.app?.userStore?.userinfo?.vip_level)
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)

  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(vip_level);
  const [currentLevel, setCurrentLevel] = useState(vip_level);
  useEffect(() => {
    setCurrentLevel(vip_level)
  }, [vip_level]);

  const navigate = useNavigate();
  const {onClickToWallet} = usePageNavigate();
  const currentLevelInfo = allLevelInfo?.find(
    (info) => info.level === currentSelectedLevel
  );

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
    <div>
      {/*<img src={"assets/page_bg-9c716c35.jpg"}/>*/}

      <Container className={'p-4'}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom:'20px' }}>
          <div
            className={'text-left h-[37.5px] w-[37.5px]'}
            onClick={() => {
              navigate(PageOrModalPathEnum.IndexPage);
            }}
          >
            <img
              alt={'back'}
              className="h-[37.5px] w-[37.5px]"
              src={'data:image/png;base64,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'}
            />
          </div>

          <VIPTitle className={'mb-2 text-center text-xl font-bold ml-[100px]'}>
            Centro VIP
          </VIPTitle>

        </div>

        <section>
          <LevelList
            currentLevel={currentLevel}
            currentSelectedLevel={currentSelectedLevel}
            setCurrentSelectedLevel={setCurrentSelectedLevel}
          />
        </section>

        <section className={'mb-4'}>
          <section
            className={
              'mb-4 text-center text-xl font-bold text-main-primary-main'
            }
          >
            — Distância próximo nível —
          </section>

          <ItemContainer className={'flex flex-col text-center'}>
            <div className='mb-1'>
              Quantidade total de recarga:{' '}
              {userVIPInfo?.data?.vip_score
                ? userVIPInfo?.data?.vip_score / 100
                : 0}
              /
              {userVIPInfo?.data?.next_level_score
                ? userVIPInfo?.data?.next_level_score / 100
                : 0}
            </div>

            <div className={'progress-button flex flex-row items-center'}>
              <ProgressBar
                className='mr-2 h-6'
                textClassName='right-2 top-[3px] text-sm'
                progress={
                  (userVIPInfo?.data?.vip_score || 0) /
                  (userVIPInfo?.data?.next_level_score || 1)
                }
              />

              <div className={'shrink-0'}>
                <IRLevelButton className='text-base px-8 py-2' onClick={()=>onClickToWallet({'panelType':'deposit'})}>
                  <span className={'text-[#247855] font-bold'}>IR</span>
                </IRLevelButton>
              </div>
            </div>
          </ItemContainer>

          <ItemContainer className={'flex flex-col text-center'}>
            <div className='mb-1'>
              Número total de apostas:{' '}
              {userVIPInfo?.data?.flow ? userVIPInfo?.data?.flow / 100 : 0}/
              {userVIPInfo?.data?.next_level_flow
                ? userVIPInfo?.data?.next_level_flow / 100
                : 0}
            </div>

            <div className={'progress-button flex flex-row items-center'}>
              <ProgressBar
                className='mr-2 h-6'
                textClassName='right-2 top-[3px] text-sm'
                progress={
                  userVIPInfo?.data?.flow_progress
                    ? userVIPInfo?.data?.flow_progress / 100
                    : 0
                }
              />

              <div className={'shrink-0'}>
                <IRLevelButton className='text-base px-8 py-2' onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>
                  <span className={'text-[#247855] font-bold'}>IR</span>
                </IRLevelButton>
              </div>
            </div>
          </ItemContainer>
        </section>

        <section className={'mb-4 text-center'}>
          <section
            className={
              'mb-4 text-center text-xl font-bold text-white'
            }
          >
            — Privilégio —
          </section>

          {currentSelectedLevel >= 20 && (
            <ItemContainer className="flex flex-col items-center justify-center">
              <img
                alt="jackpot"
                src={`assets/${JackpotMap[currentSelectedLevel].image}`}
              />
              <div className="w-full bg-purple-900 bg-opacity-20">
                <div className="text-sm ">
                  Nível Mega Jackpot: {JackpotMap[currentSelectedLevel].label}
                </div>
                <div className="text-[10px] leading-none opacity-70">
                  Ou numerário de valor equivalente
                </div>
              </div>
            </ItemContainer>
          )}

          <ItemContainer className='flex justify-between'>
            <img
              className={'h-[43px] w-[70px]'}
              alt={''}
              src={`assets/${environment.assetPrefix}/icon_vip_context_2.png`}
            />
            <div className='flex flex-col justify-center text-right font-bold leading-5'>
              <div>Recompensas de upgrade</div>
              <div>de associação: R${signBonus}</div>
            </div>
          </ItemContainer>


          <ItemContainer className="flex justify-between">
            <img
              className={'h-[43px] w-[70px]'}
              alt={''}
              src={`assets/${environment.assetPrefix}/icon_vip_context_1.png`}
            />
            <div className='flex flex-col justify-center text-right font-bold leading-5'>
              <div>Recompensa total de</div>
              <div>check-in de 7 dias: R${signBonus}</div>
            </div>
          </ItemContainer>

          <ItemContainer className='text-center font-bold'>
            Limite máximo de retirada única : R$
            {currentLevelInfo?.withdrawAmountLimitDay
              ? `${currentLevelInfo?.withdrawAmountLimitDay / 100}`
              : '0'}
          </ItemContainer>

          <ItemContainer className='text-center font-bold'>
            Número de retiradas por dia:{' '}
            {currentLevelInfo?.withdrawTimesLimitDay}
          </ItemContainer>
        </section>

        <section className={'mb-4'}>
          <section className={'mb-4 text-center text-xl font-bold text-white'}>
            — Condições do VIP atual —
          </section>

          <ItemContainer className='text-center font-bold'>
            Quantidade total de recarga : R$
            {currentLevelInfo?.rechargeAmountLimit
              ? `${currentLevelInfo?.rechargeAmountLimit / 100}`
              : '0'}<div>

          </div>
          </ItemContainer>

          <ItemContainer className='text-center font-bold'>
            Número total de apostas : R$
            {currentLevelInfo?.flowLimit
              ? `${currentLevelInfo?.flowLimit / 100}`
              : '0'}
          </ItemContainer>
        </section>
      </Container>
    </div>
  );
};

export default Pernambucana777BetVIPGradeMobileTemplate;
