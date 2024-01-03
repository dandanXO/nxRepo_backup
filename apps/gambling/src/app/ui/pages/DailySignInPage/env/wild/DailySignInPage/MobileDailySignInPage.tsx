import React from "react";
import { GetSignInConfigResponse } from "../../../../../../external";
import { LeftOutlined } from "@ant-design/icons";
import { environment } from "../../../../../../../environments/environment";
import CurrentVIPIcon from "../../../../../components/CurrentVIPIcon";
import { CocoLevelList } from "./index";
import styled from "styled-components";
import { notification } from "antd";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { tcx } from "../../../../../utils/tcx";
import {BackNavigation} from "../../../../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../../hooks/usePageNavigate";
import {PageContainer} from "../../../../../components-bs/PageContainer";

const SignInButton = styled.div<{
  disable: boolean
}>`
  width: 50%;
  margin: 30px auto 0;
  cursor: pointer;
  filter: grayscale(${(props)=>props.disable?100:0}%);
`

const SignInIngoContainer = styled.div`
  color: white;
  width: 94%;
  margin: .1rem auto 0;
  padding: 10px 15.6px;
  box-sizing: border-box;
  border-radius: 10px;
  border: .02rem solid rgba(255,255,255,.8);
  background: #FFC937;
  box-shadow: 0 0.05rem rgba(185,9,76,.35);
  text-shadow: -1px -1px 0 #A40EBB, 1px -1px 0 #A40EBB, -1px 1px 0 #A40EBB, 1px 1px 0 #A40EBB;
`

const DayItem = styled.div<{
  checked: boolean
}>`
  filter: grayscale(${(props)=>props.checked?90:0}%);
  flex: 1 0 112.32px;
  width: 112.312px;
  height: 113.359px;
  margin-bottom: .26rem;
  position: relative;
  z-index: 1;
  margin-right: -0.3rem;
  background: url(assets/${environment.assetPrefix}/daily_sign_in_mobile_wrapper.png) no-repeat center/100% 100%;
`

const DayTitle = styled.div`
  font-weight: 900;
  color: #fcd4fd;
  word-break: break-all;
  line-height: 1;
  text-shadow: -1px -1px 0 #8B2312, 1px -1px 0 #8B2312, -1px 1px 0 #8B2312, 1px 1px 0 #8B2312;
`

const days: number[] = [];

for (let i = 1; i <= 7; i += 1) {
  days.push(i);
}

interface IDayListProps {
  currentSelectedLevel: number;
  signInAllConfig: {
    identifier: string;
    value: string;
  }[];
  itemClassName?: string;
  signInConfig?: GetSignInConfigResponse['data']['signInConfig'];
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays'];
  todayIsSignIn: GetSignInConfigResponse['data']['todayIsSignIn'];
  vipLevel: GetSignInConfigResponse['data']['vipLevel'];
}

const DayList = ({
  signInAllConfig,
  currentSelectedLevel,
  vipLevel,
  signInTotalDays
}: IDayListProps) => {
  const vipConfig = signInAllConfig.find(
    (config) =>
      config.identifier.split('::')[2].replace('V', '') ===
      `${currentSelectedLevel}`
  );
  const dayConfigs = JSON.parse(vipConfig?.value || '[]');

  return (
    <div className='w-full ml-1 min-h-8 overflow-x-scroll flex justify-between relative'>
      {
        days.map((day, index) => {
          const config = dayConfigs.find(
            (dayConfig: any) => dayConfig.days === day
          );

          const checked = currentSelectedLevel === vipLevel && index + 1 <= signInTotalDays;

          return (
            <DayItem checked={checked} key={day}>
              <DayTitle className='absolute top-2 flex left-8'>
                R$ {(config?.cashback || 0).toLocaleString()}
                {
                  checked && <img
                    style={{width: '9px', height: '12px', marginLeft: '6px', marginTop: '-px'}}
                    alt='check-text'
                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAR1JREFUOE/Vk69Lg2EUhZ8THFgGgoKChgVXLEuW2WwGwaIg2Gyzubgmi2JzNqOIYUEQQVHcP7NklIGiRy58k89vP9xkIN72wnuf973nnCsmVJoQh78H2V4DroBHSbu/+pHtVeAOyAPPkmbHBtkuAQ/ADPAG7EhqjgWyvRKjAHPAO7An6SIMGxlkexl4AhaAD2Bf0nnX9W8g2zlJr9lI2C4kkCXAQEVSI33vC2T7FignM990L9leBFpAwAJyKOkk+1ga1AbmgQ6wKenedpxjnGLSWJNU7xfiNGgduAamgZcQEjgCQuCouqTaoE3IarQBNIFcpuFYUnXYOvW4ZnsLuASmksZTSZWfdrKv/ba3gTMgMnIgKUQeWiPn6P+BPgHf3FMTEyIoFgAAAABJRU5ErkJggg==' />
                }
              </DayTitle>
              <img className='h-[55px] mx-auto mt-8' alt='money' src={`assets/${environment.assetPrefix}/daily_sign_in_money.png`}/>
              {
                checked && (
                  <div className='absolute top-[43%] left-[35%] w-[30%]'>
                    <img alt='checked-icon' src={`assets/${environment.assetPrefix}/daily_sign_in_checked.png`}/>
                  </div>
                )
              }
              <div className='absolute bottom-1 left-8 text-[#561a99] text-center font-bold'>Dia {day}</div>
            </DayItem>
          )
        })
      }
    </div>
  )
}

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
    <PageContainer>
      {contextHolder}

      {/*<nav className='flex items-center gap-4'>*/}
      {/*  <LeftOutlined className='text-white text-base p-[10px]' />*/}
      {/*</nav>*/}

      <BackNavigation
        title={<img alt='title' className='h-[26px] ml-2' src={`/assets/${environment.assetPrefix}/daily_sign_in_title.png`}/>}
        onClick={() => onClickToIndex()}
      />

      <section className='flex justify-center items-center my-3'>
        <div className='w-1/2'>
          <CurrentVIPIcon level={vipLevel} className='flex-row gap-2' imageClassName='w-1/2' textClassName='text-white text-2xl w-full' />
        </div>
      </section>

      <section>
        <CocoLevelList
          className='font-bold text-base h-7'
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
        <img alt='signInButton' src={`assets/${environment.assetPrefix}/daily_sign_in_button.png`}/>
      </SignInButton>

      <div
        className='my-3 text-white text-sm text-center'
        onClick={()=>navigate(PageOrModalPathEnum.DailySingInRecordPage)}
      >{'visualizar registros >'}</div>

      <SignInIngoContainer>
        <div className='text-base text-center mb-2'>Regras de recompensa diária VIP:</div>
        <div>
          Cada nível só pode receber recompensas por 7 dias no total. As recompensas serão creditadas na próxima vez que você as reivindicar.
          <br/>
          Para garantir a justiça da plataforma, a plataforma adota uma estratégia antitrapaça, os usuários trapaceiros serão banidos e forneceremos atendimento ao cliente 24 horas para resolver seus problemas.
        </div>
      </SignInIngoContainer>
    </PageContainer>
  )
}

export default MobileDailySignInPage
