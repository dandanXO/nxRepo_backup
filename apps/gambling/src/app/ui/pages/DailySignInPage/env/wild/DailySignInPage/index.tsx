import React, { useEffect, useRef, useState } from "react";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import MobileDailySignInPage from "./MobileDailySignInPage";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import styled from "styled-components";
import { environment } from "../../../../../../../environments/environment";
import { tcx } from "../../../../../utils/tcx";
import { notification } from "antd";
import { useAllowLoginRouterRules } from "../../../../../router/hooks/useAllowLoginRouterRules";
import {BackNavigation} from "../../../../../components-bs/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";
import {ViewRecordButton} from "../../../../../components-bs/Buttons/env/u1/ViewRecordButton";
import { GetPunchInConfigResponse } from "../../../../../../external/PunchInEndpoint";

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
  border: 3px solid #DD79F7;
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

const LevelButton = styled.button.attrs<{className?:string}>((props)=>({
  className: props.className
}))`
  color: white;
  border-radius: 20px;
  border: 2px solid transparent;
  background-clip: padding-box,border-box;
  background-origin: padding-box,border-box;
`

const CurrentButton = styled(LevelButton)`
  color: #ffe4c3;
  background-image: linear-gradient(180deg,#7A120B,#D43824,#7A120B),linear-gradient(180deg,#FFB400,#B42206,#FFB400);
`

const OtherButton = styled(LevelButton)`
  background-image: linear-gradient(180deg,#3E0A69,#3E0A69),linear-gradient(180deg,#7B2BBF,#7B2BBF);
`
const DisableButton = styled(CurrentButton) `
  filter: grayscale(1);
`

const LevelItemWrapper = styled.div`
  flex: 1 0 auto;
`

interface ICocoLevelListProps {
  className?: string;
  currentLevel: number;
  currentSelectedLevel: number;
  setCurrentSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
}

export const CocoLevelList = ({
  className,
  currentLevel,
  currentSelectedLevel,
  setCurrentSelectedLevel
}: ICocoLevelListProps) => {
  useAllowLoginRouterRules()
  const { isMobile } = useBreakpoint()

  const vips: number[] = [];

  for (let i = 1; i <= 25; i += 1) {
    vips.push(i);
  }

  const [initialPageX, setInitialPageX] = useState(0);
  const contentRef = useRef<HTMLElement | null>(null);

  const handleMouseDown = (e: any) => {
    setInitialPageX(e.pageX);
  };

  const handleMouseUp = (e: any) => {
    setInitialPageX(0);
  };

  const handleMouseMove = (e: any) => {
    if (initialPageX !== 0 && contentRef.current !== null) {
      const leftOrRight = initialPageX - e.pageX;
      contentRef.current.scrollLeft += leftOrRight;
      setInitialPageX(e.pageX);
    }
  };

  useEffect(()=>{
    const currentItem = contentRef.current?.children[currentSelectedLevel - 1 ] as HTMLElement | undefined
    if(currentItem) {
      contentRef.current?.scrollTo({
        left: currentItem?.offsetLeft - ((contentRef.current?.offsetWidth || 0) - currentItem?.offsetWidth) / 2,
        behavior: 'smooth'
      })
    }
  }, [currentSelectedLevel])

  return (
    <section
      className={tcx('vip-tab-items flex overflow-auto w-full relative h-9 text-lg', className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      ref={contentRef}
    >
      {vips.map((level, index) => {
        const isReachLevel = level === currentSelectedLevel
        const LevelButton = level < currentLevel ? DisableButton: isReachLevel ? CurrentButton : OtherButton;

        return (
          <LevelItemWrapper
            key={level}
            className={tcx('w-[10%] p-0 min-w-[100px] mr-3 relative h-full', ['ml-3', isMobile && level === 1])}
          >
            <LevelButton
              className='flex justify-center items-center gap-2 w-full h-full hover:opacity-80'
              onClick={()=>setCurrentSelectedLevel(level)}
            >
              {
                level >= currentLevel && (
                  <div>
                    {
                      level === currentLevel ?
                        <img alt='lock' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAATtJREFUOE+t008rRGEUx/HvL0RiZ2chZSE2Ulds5AWwsrC0mEkje1n5Ezt7k8YbUGzIK7AyKWLDRrG2oqZQjo7u1fQ09xpzPau7+J3Pvfec84h/OspyzGwAOAQMWJD0lJZPhcysDTgHpuJif56R9NkIy4I2gM2gaFXSbkMofvMocCfp3UNmNhl/TXtQ9AZEkm7jXCcwAtzIzE6AOeAR2AGOgSowlNKPa2AaWATWgH7gzKFXoKeuqAZ0/zLMMFNz6AKYyLkFVYf2gOWcUNmhAnCQEyo6NAZc5YTGHeoAXoCuFjFfid7vhTQzH3cUQKfxQvr18OPZLWA2yF1KihKoDJSCgE/TB1EPrTSY8L6kUgIVgUqLv7YkqZJAg8A94P36y/kAhiU9/FxaM5sHtoG+JqVnYF3SUdLAJuuyY1+4I2ifqehT2wAAAABJRU5ErkJggg=='/>
                        : <img alt='lock' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAARlJREFUOE/t07ErhVEYx/HvV2wmZZT4GyjJIEySv8AkShlEMYmQQSluKZvNYJYJGVCsNiO7RSbRo1svvfd47/Xe3dnO8z7P57z9OkfqrIgYB5aBPiCAa2BLvSsasagYEUvALpB+/wCm1JN07hcUET3AI9AG3AB7QCuwAAwCr0Cv+pLHiqB54CAb6FKrg0REO/AEdGR/dfwXtAZsAPfqQL45Iq6AYWBR3S8L3apDCXQOjJWFpoEZ4EGdS6AK0A9U0sBrMoqI7izkerciX39Xn78LP1BE7AArZYRcz7q6Wd3noUtgpEnoTJ34hxqmVpjRBTDaZNin6mQa9iFQcwFLoNvqagp1AkfZC2/5A/kEqs9lVn2rgUqc3rDlC5IRchOtsAplAAAAAElFTkSuQmCC'/>
                    }
                  </div>
                )
              }
              <div className={isMobile?'italic':''}>{isMobile?'VIP':'LV'}{level}</div>
            </LevelButton>
          </LevelItemWrapper>
        )
      })}
    </section>
  )
}



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
  signInConfig?: GetPunchInConfigResponse['data']['signInConfig'];
  signInTotalDays: GetPunchInConfigResponse['data']['signInTotalDays'];
  todayIsSignIn: GetPunchInConfigResponse['data']['todayIsSignIn'];
  vipLevel: GetPunchInConfigResponse['data']['vipLevel'];
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
            <DayItemWrapper key={day}>
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
                      <img alt='money' src={`assets/${environment.uVersion}/daily_sign_in_money.png`}/>
                      {
                        checked && (
                          <div className='absolute top-[17%] left-[15%] w-[70%]'>
                            <img alt='checked-icon' src={`assets/${environment.uVersion}/daily_sign_in_checked.png`}/>
                          </div>
                        )
                      }
                    </div>
                    <StraightContainer className='break-all leading-normal text-base font-bold text-[#561a99] text-center py-2 px-1 w-full'>R$ {config?.cashback}</StraightContainer>
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
  signInConfig: GetPunchInConfigResponse['data']['signInConfig']
  signInAllConfig: GetPunchInConfigResponse['data']['signInAllConfig']
  signInTotalDays: GetPunchInConfigResponse['data']['signInTotalDays']
  todayIsSignIn: GetPunchInConfigResponse['data']['todayIsSignIn']
  vipLevel: GetPunchInConfigResponse['data']['vipLevel']
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

  const {
    onClickToIndex
  } = usePageNavigate();

  if (isMobile) {
    return (
      <MobileDailySignInPage
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

      <BackNavigation onClick={() => onClickToIndex()}/>

      <VIPContainer>
        <StraightContainer className='flex relative'>
          <VIPRight>
            <VIPRightTitle>
              <ResponsiveContainer>
                <div className='pb-[10.6804%]'></div>
                <img alt='title' src={`/assets/${environment.uVersion}/daily_sign_in_title.png`}/>
              </ResponsiveContainer>
            </VIPRightTitle>

            <VIPRightContent>

              <div className='ml-[2vw]'>
                <CocoLevelList
                  className='font-bold'
                  currentLevel={vipLevel}
                  currentSelectedLevel={currentSelectedLevel}
                  setCurrentSelectedLevel={setCurrentSelectedLevel}
                />
              </div>

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
              <img alt='signInButton' src={`assets/${environment.uVersion}/daily_sign_in_button.png`}/>
            </SignInButton>

            <div className='mt-3 mb-[30px] my-auto text-[#fcff00] text-center text-3xl'>Nível atual: VIP{vipLevel}</div>
          </VIPRight>

          <ViewRecordButton onClick={()=>navigate(PageOrModalPathEnum.DailySingInRecordPage)}/>

          <VIPIcon>
            <ResponsiveContainer>
              <div className='pb-[122.699%]'></div>
              <img
                className='absolute top-0 left-0 w-full h-full z-[-1]'
                alt='god'
                src={`assets/${environment.uVersion}/daily_sign_in_god.png`}
              />
            </ResponsiveContainer>
          </VIPIcon>

        </StraightContainer>
      </VIPContainer>
    </div>
  )
}

export default CocoDailySignInPage;
