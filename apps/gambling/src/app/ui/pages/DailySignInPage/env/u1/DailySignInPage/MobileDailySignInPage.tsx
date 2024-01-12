import React from "react";
import { GetSignInConfigResponse } from "../../../../../../external";
import { environment } from "../../../../../../../environments/environment";
import CurrentVIPIcon from "../../../../../components/CurrentVIPIcon";
import { CocoLevelList, DayList } from "./index";
import styled from "styled-components";
import { notification } from "antd";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import {BackNavigation} from "../../../../../components-bs/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {PageContainer} from "../../../../../components-bs/PageContainer";

const SignInButton = styled.div<{
  disable: boolean
}>`
  background-image: url(${props =>
    props.disable?`assets/${environment.uVersion}/daily_sign_in_button_disable.png`:
      `assets/${environment.uVersion}/daily_sign_in_button.png`});
  background-size: 100%;
  background-repeat: no-repeat;
`

interface ICocoMobileDailySignInPageProps {
  onClickToSignIn: () => void
  signInConfig: GetSignInConfigResponse['data']['signInConfig']
  signInAllConfig: GetSignInConfigResponse['data']['signInAllConfig']
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays']
  todayIsSignIn: GetSignInConfigResponse['data']['todayIsSignIn']
  vipLevel: GetSignInConfigResponse['data']['vipLevel']
  currentSelectedLevel: number
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>
}

const MobileDailySignInPage = ({
  vipLevel,
  currentSelectedLevel,
  setCurrentSelectedLevel,
  todayIsSignIn,
  onClickToSignIn,
  signInAllConfig,
  signInTotalDays
}: ICocoMobileDailySignInPageProps) => {

  const [notice, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const disableButton = vipLevel === 0 || todayIsSignIn
  const {onClickToIndex} = usePageNavigate();
  return (
    <div className='relative bg-gradient-to-b from-[var(--background-checkin-from)] to-[var(--background-checkin-to)]'>
      <img className='absolute top-[50px] left-[50%] translate-x-[-50%]' alt='bg' src={`assets/${environment.uVersion}/bg_daily_sign_in.png`}/>
      <PageContainer>
        {contextHolder}

        <BackNavigation
          title={<img alt='title' className='w-[80%] ml-6' src={`/assets/${environment.uVersion}/daily_sign_in_title.png`}/>}
          onClick={() => onClickToIndex()}
        />

        <section className='flex justify-center items-center my-6'>
          <CurrentVIPIcon
            level={vipLevel}
            className='flex-row gap-2'
            imageClassName='w-[64px]'
            textClassName='text-white text-2xl w-[78px]'
          />
        </section>

        <section>
          <CocoLevelList
            className='font-bold text-base'
            currentLevel={vipLevel}
            currentSelectedLevel={currentSelectedLevel}
            setCurrentSelectedLevel={setCurrentSelectedLevel}
          />
        </section>

        <section className='mt-5'>
          <DayList
            currentSelectedLevel={currentSelectedLevel}
            signInAllConfig={signInAllConfig || []}
            signInTotalDays={signInTotalDays}
            todayIsSignIn={todayIsSignIn}
            vipLevel={vipLevel}
          />
        </section>

        <SignInButton
          className='mt-9 mx-auto w-[162px] h-[40px] relative'
          disable={disableButton}
          onClick={()=> {
            setCurrentSelectedLevel(vipLevel || 0)
            if(todayIsSignIn) {
              notice.error({
                message: "Você concluiu o check-in hoje"
              })
              return;
            }
            if(disableButton) {
              notice.error({
                message: "O VIP 0 temporariamente não suporta"
              })
              return;
            }else {
              onClickToSignIn();
            }
          }}
        >
          <div className='text-lg font-medium text-white pt-[9%] text-center'>Colete cupons</div>
        </SignInButton>

        <div
          className='relative mt-[14px] mb-6 text-white text-lg text-center'
          onClick={()=>navigate(PageOrModalPathEnum.DailySingInRecordPage)}
        >{'visualizar registros >'}</div>

        <div className='bg-[rgba(255,255,255,30%)] text-white py-3 px-[14px] rounded-md mb-16 text-sm font-medium'>
          <div className='text-lg font-bold text-center'>Regras de recompensa diária VIP:</div>
          <div>
            Cada nível só pode receber recompensas por 7 dias no total. As recompensas serão creditadas na próxima vez que você as reivindicar.
            <br/>
            Para garantir a justiça da plataforma, a plataforma adota uma estratégia antitrapaça, os usuários trapaceiros serão banidos e forneceremos atendimento ao cliente 24 horas para resolver seus problemas.
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default MobileDailySignInPage
