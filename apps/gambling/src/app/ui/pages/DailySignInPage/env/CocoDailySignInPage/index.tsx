import React from "react";
import { GetSignInConfigResponse } from "../../../../../external";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import CocoMobileDailySignInPage from "./CocoMobileDailySignInPage";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import styled from "styled-components";
import { environment } from "../../../../../../environments/environment";
import { tcx } from "../../../../utils/tcx";
import { notification } from "antd";

const SignInButton = styled.div<{
  disable: boolean
}>`
  position: relative;
  width: 20%;
  margin: 0 auto;
  min-width: 190px;
  cursor: pointer;
  filter: grayscale(${(props)=>props.disable?100:0}%);
`

const SignInInfoContainer = styled.div`
  transform: skew(-8deg);
  padding: .8vw 1vw;
  background: #FFC937;
  box-shadow: 0 3px 0 1px rgba(185,9,76,.35);
  border-radius: 10px;
  margin: 1.6vw 3vw 0 2px;
`

const StraightContainer = styled.div`
  transform: skew(8deg);
`

const DayListContainer = styled.div`
  margin: 1.2vw;
  transform: skew(-8deg);
`

const DayItemWrapper = styled.div`
  padding: 6px;
  width: 14.285%;
  max-width: 14.285%;
  flex-basis: 14.285%;
`

const DayItem = styled.div`
  background: linear-gradient(11deg,#C8A3F3,#FFF6FB,#E1A4FF);
  box-shadow: 0 2px #9151c3, inset 0 0 1px 2px rgba(255,255,255,.64);
  border-radius: 10px;
  overflow: hidden;
`

const DayTitle = styled.div`
  width: 100%;
  padding: 4px 0;
  background: linear-gradient(11deg,#79098F,#B91ED2,#9002A6);
  box-shadow: 0 2px 1px #e84cd4, 0 -1px rgba(25,0,0,.72), 0 -2px rgba(255,255,255,.31);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  text-shadow: 0px 2px 0px #52045E;
  color: white;
`

const VIPContainer = styled.div`
  margin: 6vw 6vw 5vw 20vw;
  background: #311159;
  border-radius: 50px;
  transform: skew(-8deg);
`

const VIPRight = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  margin-left: 18px;
`

const VIPRightTitle = styled.div`
  width: 96%;
  margin: -5% 0 0 2%;
`

const VIPRightContent = styled.div`
  margin-top: -16px;
  padding: 1.2vw .6vw 2vw;
`

const VIPIcon = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: -32%;
  transform: translateY(-68%);
`

const ResponsiveContainer = styled.div`
  display: flex;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
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
    <DayListContainer>
      <div className='flex flex-wrap' style={{margin: '-6px'}}>
        {days.map((day, index) => {
          const config = dayConfigs.find(
            (dayConfig: any) => dayConfig.days === day
          );

          const checked = currentSelectedLevel === vipLevel && index + 1 <= signInTotalDays;

          return (
            <DayItemWrapper>
              <DayItem className={tcx(['opacity-60', checked])}>
                <DayTitle>
                  Dia{day}
                  {
                    checked && <img
                      style={{width: '18px', marginLeft: '6px'}}
                      alt='check-text'
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAR1JREFUOE/Vk69Lg2EUhZ8THFgGgoKChgVXLEuW2WwGwaIg2Gyzubgmi2JzNqOIYUEQQVHcP7NklIGiRy58k89vP9xkIN72wnuf973nnCsmVJoQh78H2V4DroBHSbu/+pHtVeAOyAPPkmbHBtkuAQ/ADPAG7EhqjgWyvRKjAHPAO7An6SIMGxlkexl4AhaAD2Bf0nnX9W8g2zlJr9lI2C4kkCXAQEVSI33vC2T7FignM990L9leBFpAwAJyKOkk+1ga1AbmgQ6wKenedpxjnGLSWJNU7xfiNGgduAamgZcQEjgCQuCouqTaoE3IarQBNIFcpuFYUnXYOvW4ZnsLuASmksZTSZWfdrKv/ba3gTMgMnIgKUQeWiPn6P+BPgHf3FMTEyIoFgAAAABJRU5ErkJggg==' />
                  }
                </DayTitle>
                <div className='relative flex'>
                  <div className='flex-1'>
                    <div className='w-4/5 mx-auto relative'>
                      <img alt='money' src={`assets/${environment.assetPrefix}/daily_sign_in_money.png`}/>
                      {
                        checked && (
                          <div className='absolute top-[17%] left-[15%] w-[70%]'>
                            <img alt='checked-icon' src={`assets/${environment.assetPrefix}/daily_sign_in_checked.png`}/>
                          </div>
                        )
                      }
                    </div>
                    <StraightContainer className='break-all leading-normal text-base font-bold text-[#561a99] text-center py-2 px-1 w-full'>R${config?.cashback}</StraightContainer>
                  </div>
                </div>
              </DayItem>
            </DayItemWrapper>
          )
        })}
      </div>
    </DayListContainer>
  )
}



interface ICocoDailySignInPageProps {
  onClickToSignIn: () => void
  signInConfig: GetSignInConfigResponse['data']['signInConfig']
  signInAllConfig: GetSignInConfigResponse['data']['signInAllConfig']
  signInTotalDays: GetSignInConfigResponse['data']['signInTotalDays']
  todayIsSignIn: GetSignInConfigResponse['data']['todayIsSignIn']
  vipLevel: GetSignInConfigResponse['data']['vipLevel']
  currentSelectedLevel: number
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>
}

const CocoDailySignInPage = ({
  onClickToSignIn,
  signInConfig,
  signInAllConfig,
  signInTotalDays,
  todayIsSignIn,
  vipLevel,
  currentSelectedLevel,
  setCurrentSelectedLevel
}: ICocoDailySignInPageProps) => {

  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const [notice, contextHolder] = notification.useNotification();

  const disableButton = vipLevel === 0 || todayIsSignIn

  if (isMobile) {
    return (
      <CocoMobileDailySignInPage
        onClickToSignIn={onClickToSignIn}
        signInConfig={signInConfig}
        signInAllConfig={signInAllConfig}
        signInTotalDays={signInTotalDays}
        todayIsSignIn={todayIsSignIn}
        vipLevel={vipLevel}
        currentSelectedLevel={currentSelectedLevel}
        setCurrentSelectedLevel={setCurrentSelectedLevel}
      />
    )
  }

  return (
    <div>
      {contextHolder}
      <button
        className='flex items-center text-2xl text-[#ff97ef] ml-[6vw]'
        onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}
      >
        <LeftOutlined />
        <div>Retornar</div>
      </button>

      <VIPContainer>
        <StraightContainer className='flex relative'>
          <VIPRight>
            <VIPRightTitle>
              <ResponsiveContainer>
                <div className='pb-[10.6804%]'></div>
                <img alt='title' src={`/assets/${environment.assetPrefix}/daily_sign_in_title.png`}/>
              </ResponsiveContainer>
            </VIPRightTitle>

            <VIPRightContent>
              <DayList
                currentSelectedLevel={currentSelectedLevel}
                signInAllConfig={signInAllConfig || []}
                signInConfig={signInConfig}
                signInTotalDays={signInTotalDays || 0}
                todayIsSignIn={todayIsSignIn || false}
                vipLevel={vipLevel || 0}
              />

              <SignInInfoContainer>
                <StraightContainer className='font-bold text-xl text-[#cc1d00]'>Regras de recompensa diária VIP：</StraightContainer>
                <StraightContainer className='text-[#cc1d00] mt-[10px] text-lg font-bold'>
                  · Cada nível só pode receber recompensas por 7 dias no total. As recompensas serão creditadas na próxima vez que você as reivindicar.
                  <br/>
                  · Para garantir a justiça da plataforma, a plataforma adota uma estratégia antitrapaça, os usuários trapaceiros serão banidos e forneceremos atendimento ao cliente 24 horas para resolver seus problemas.
                </StraightContainer>
              </SignInInfoContainer>
            </VIPRightContent>

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

            <div className='mt-3 mb-[30px] my-auto text-[#fcff00] text-center text-3xl'>Nível atual: VIP{vipLevel}</div>
          </VIPRight>

          <button className='absolute bottom-[6%] right-[7%] text-white text-xl'>{'visualizar registros >'}</button>

          <VIPIcon>
            <ResponsiveContainer>
              <div className='pb-[122.699%]'></div>
              <img
                className='absolute top-0 left-0 w-full h-full z-[-1]'
                alt='god'
                src={`assets/${environment.assetPrefix}/daily_sign_in_god.png`}
              />
            </ResponsiveContainer>
          </VIPIcon>

        </StraightContainer>
      </VIPContainer>
    </div>
  )
}

export default CocoDailySignInPage;
