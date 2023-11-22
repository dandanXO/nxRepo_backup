import React, { useEffect, useRef, useState } from "react";
import { GetSignInConfigResponse } from "../../../../../../external";
import useBreakpoint from "../../../../../hooks/useBreakpoint";
import MobileDailySignInPage from "./MobileDailySignInPage";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import styled from "styled-components";
import { environment } from "../../../../../../../environments/environment";
import { tcx } from "../../../../../utils/tcx";
import { notification } from "antd";
import { useAllowLoginRouterRules } from "../../../../../router/useAllowLoginRouterRules";
import {BackNavigation} from "../../../../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../../hooks/usePageNavigate";

const SignInButton = styled.div<{
  disable: boolean
}>`
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_button.png");
  background-size: 100%;
  width: 20vw;
  height: calc(0.33 * 20vw);
  background-repeat: no-repeat;
  filter: grayscale(${(props)=>props.disable?100:0}%);
`

const SignInInfoContainer = styled.div`
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
  //margin: 1.2vw;
`

const DayItemWrapper = styled.div`
  margin-right: 40px;
`

const DayItem = styled.div`
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_wrapper.png");
  background-size: 100%;
  background-repeat: no-repeat;
`

const DayTitle = styled.div`
  width: 100%;
  padding: 4px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const VIPContainer = styled.div`
  margin: 6vw 3vw 5vw 20vw;
  //background: #311159;
  //border: 3px solid #DD79F7;
  //border-radius: 50px;
  //transform: skew(-8deg);
  padding: 0 50px;
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_container.png");
  background-size: 100%;
  background-repeat: no-repeat;
`

const Container = styled.div`
  margin-top: 50px;
  width: 70vw;
  height: calc(0.48 * 70vw);
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_container.png");
  background-size: 100%;
  background-repeat: no-repeat;
`

const VIPRight = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`

const VIPRightTitle = styled.div`
  width: 96%;
  margin: -5% 0 0 2%;
`

const VIPRightContent = styled.div`
  margin-top: -16px;
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
`

const CurrentButton = styled(LevelButton)`
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_current_vip.png");
  background-size: 100%;

`

const OtherButton = styled(LevelButton)`
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_other_vip.png");
  background-size: 100%;
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
      className={tcx('vip-tab-items flex overflow-auto w-full relative text-lg', className)}
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
          <LevelButton
            key={level}
            className='flex justify-center items-center gap-2 hover:opacity-80 w-[100px] min-w-[100px] h-[44px] mr-3'
            onClick={()=>setCurrentSelectedLevel(level)}
          >
            {
              level >= currentLevel && (
                <div>
                  {
                    level === currentLevel ?
                      <img className='w-6 h-6' alt='current' src={`assets/${environment.assetPrefix}/daily_sign_in_current_mark.png`} />
                      : <img className='w-6 h-6' alt='lock' src={`assets/${environment.assetPrefix}/daily_sign_in_lock.png`}/>
                  }
                </div>
              )
            }
            <div className={isMobile?'italic':''}>VIP{level}</div>
          </LevelButton>
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
  className?: string
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

export const DayList = ({
  signInAllConfig,
  currentSelectedLevel,
  vipLevel,
  signInTotalDays,
  className
}: IDayListProps) => {
  const vipConfig = signInAllConfig.find(
    (config) =>
      config.identifier.split('::')[2].replace('V', '') ===
      `${currentSelectedLevel}`
  );
  const dayConfigs = JSON.parse(vipConfig?.value || '[]');

  return (
    <div className={tcx('flex overflow-auto w-full', className)}>
      {days.map((day, index) => {
        const config = dayConfigs.find(
          (dayConfig: any) => dayConfig.days === day
        );

        const { isMobile } = useBreakpoint();
        const checked = currentSelectedLevel === vipLevel && index + 1 <= signInTotalDays;

        return (
          <DayItem key={day} className={tcx(
            'flex flex-col justify-between w-[128px] min-w-[128px] h-[188px] mr-[4%] text-center',
            ['opacity-60', checked],
            ['w-[108px] min-w-[108px] h-[160px]', isMobile]
          )}>
            <div
              className={tcx('w-full flex justify-center items-center text-white mt-[14px]', ['mt-[10px]', isMobile])}
            >
              Dia{day}
              {
                checked && <img
                  style={{width: '18px', marginLeft: '6px'}}
                  alt='check-text'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAR1JREFUOE/Vk69Lg2EUhZ8THFgGgoKChgVXLEuW2WwGwaIg2Gyzubgmi2JzNqOIYUEQQVHcP7NklIGiRy58k89vP9xkIN72wnuf973nnCsmVJoQh78H2V4DroBHSbu/+pHtVeAOyAPPkmbHBtkuAQ/ADPAG7EhqjgWyvRKjAHPAO7An6SIMGxlkexl4AhaAD2Bf0nnX9W8g2zlJr9lI2C4kkCXAQEVSI33vC2T7FignM990L9leBFpAwAJyKOkk+1ga1AbmgQ6wKenedpxjnGLSWJNU7xfiNGgduAamgZcQEjgCQuCouqTaoE3IarQBNIFcpuFYUnXYOvW4ZnsLuASmksZTSZWfdrKv/ba3gTMgMnIgKUQeWiPn6P+BPgHf3FMTEyIoFgAAAABJRU5ErkJggg==' />
              }
            </div>

            <div className='relative flex justify-center'>
              <img
                className={tcx('w-[90px]', ['w-[72px]', isMobile])}
                alt='money'
                src={`assets/${environment.assetPrefix}/daily_sign_in_money.png`}
              />
              {
                checked && (
                  <div className='absolute top-[17%] left-[15%] w-[70%]'>
                    <img alt='checked-icon' src={`assets/${environment.assetPrefix}/daily_sign_in_checked.png`}/>
                  </div>
                )
              }
            </div>

            <div className='break-all text-sm  text-white mb-[24px]'>R$ {(config?.cashback || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits:2}) }</div>

          </DayItem>
        )
      })}
    </div>
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

      <div className='px-24 flex flex-col items-end'>
          <Container className='relative pt-10 pb-16 pl-16 pr-[86px]'>
            <div className='h-full overflow-y-scroll'>
              <CocoLevelList
                className='font-bold mt-5'
                currentLevel={vipLevel}
                currentSelectedLevel={currentSelectedLevel}
                setCurrentSelectedLevel={setCurrentSelectedLevel}
              />

              <DayList
                className='mt-6'
                currentSelectedLevel={currentSelectedLevel}
                signInAllConfig={signInAllConfig || []}
                signInConfig={signInConfig}
                signInTotalDays={signInTotalDays || 0}
                todayIsSignIn={todayIsSignIn || false}
                vipLevel={vipLevel || 0}
              />

              <div className='bg-[rgba(255,255,255,30%)] text-white p-4 rounded-md'>
                <div className='font-bold text-xl'>Regras de recompensa diária VIP：</div>
                <div className=' mt-[10px] text-lg font-bold'>
                  · Cada nível só pode receber recompensas por 7 dias no total. As recompensas serão creditadas na próxima vez que você as reivindicar.
                  <br/>
                  · Para garantir a justiça da plataforma, a plataforma adota uma estratégia antitrapaça, os usuários trapaceiros serão banidos e forneceremos atendimento ao cliente 24 horas para resolver seus problemas.
                </div>
              </div>
            </div>

            <SignInButton
              className='cursor-pointer absolute bottom-0 translate-y-[20%] left-[50%] translate-x-[-50%] flex justify-center'
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
              <div className='text-2xl font-medium text-white mt-[14%]'>Colete cupons</div>
            </SignInButton>
            <img className='absolute left-0 top-[50%] translate-x-[-90%] translate-y-[-50%] w-[35%]' alt='hook' src={`assets/${environment.assetPrefix}/daily_sign_in_god.png`}/>
            <img className='absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-85%] w-[95%]' alt='title' src={`assets/${environment.assetPrefix}/daily_sign_in_title.png`}/>

            <div className='absolute bottom-0 translate-y-[80px] left-[50%] translate-x-[-50%] text-[#fcff00] text-center text-3xl'>Nível atual: VIP{vipLevel}</div>
          </Container>

        <button
          className='text-white text-xl mt-20 mr-10'
          onClick={()=>navigate(PageOrModalPathEnum.DailySingInRecordPage)}
        >{'visualizar registros >'}
        </button>
      </div>

      {/*<VIPContainer>*/}
      {/*  <div className='flex relative'>*/}
      {/*    <VIPRight>*/}
      {/*      <VIPRightTitle>*/}
      {/*        <ResponsiveContainer>*/}
      {/*          <div className='pb-[10.6804%]'></div>*/}
      {/*          <img alt='title' src={`/assets/${environment.assetPrefix}/daily_sign_in_title.png`}/>*/}
      {/*        </ResponsiveContainer>*/}
      {/*      </VIPRightTitle>*/}

      {/*      <VIPRightContent>*/}

      {/*        <div className='ml-[2vw]'>*/}
      {/*          <CocoLevelList*/}
      {/*            className='font-bold'*/}
      {/*            currentLevel={vipLevel}*/}
      {/*            currentSelectedLevel={currentSelectedLevel}*/}
      {/*            setCurrentSelectedLevel={setCurrentSelectedLevel}*/}
      {/*          />*/}
      {/*        </div>*/}

      {/*        <DayList*/}
      {/*          currentSelectedLevel={currentSelectedLevel}*/}
      {/*          signInAllConfig={signInAllConfig || []}*/}
      {/*          signInConfig={signInConfig}*/}
      {/*          signInTotalDays={signInTotalDays || 0}*/}
      {/*          todayIsSignIn={todayIsSignIn || false}*/}
      {/*          vipLevel={vipLevel || 0}*/}
      {/*        />*/}

      {/*        <SignInInfoContainer>*/}
      {/*          <StraightContainer className='font-bold text-xl text-[#cc1d00]'>Regras de recompensa diária VIP：</StraightContainer>*/}
      {/*          <div className='text-[#cc1d00] mt-[10px] text-lg font-bold'>*/}
      {/*            · Cada nível só pode receber recompensas por 7 dias no total. As recompensas serão creditadas na próxima vez que você as reivindicar.*/}
      {/*            <br/>*/}
      {/*            · Para garantir a justiça da plataforma, a plataforma adota uma estratégia antitrapaça, os usuários trapaceiros serão banidos e forneceremos atendimento ao cliente 24 horas para resolver seus problemas.*/}
      {/*          </div>*/}
      {/*        </SignInInfoContainer>*/}
      {/*      </VIPRightContent>*/}

      {/*      <SignInButton*/}
      {/*        disable={disableButton}*/}
      {/*        onClick={()=> {*/}
      {/*          setCurrentSelectedLevel(vipLevel || 0)*/}
      {/*          if(todayIsSignIn) {*/}
      {/*            notice.error({*/}
      {/*              message: "Você concluiu o check-in hoje"*/}
      {/*            })*/}
      {/*            return;*/}
      {/*          }*/}
      {/*          if(disableButton) {*/}
      {/*            notice.error({*/}
      {/*              message: "O VIP 0 temporariamente não suporta"*/}
      {/*            })*/}
      {/*            return;*/}
      {/*          }else {*/}
      {/*            onClickToSignIn();*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <img alt='signInButton' src={`assets/${environment.assetPrefix}/daily_sign_in_button.png`}/>*/}
      {/*      </SignInButton>*/}

      {/*      <div className='mt-3 mb-[30px] my-auto text-[#fcff00] text-center text-3xl'>Nível atual: VIP{vipLevel}</div>*/}
      {/*    </VIPRight>*/}

      {/*    <button*/}
      {/*      className='absolute bottom-[6%] right-[7%] text-white text-xl z-20'*/}
      {/*      onClick={()=>navigate(PageOrModalPathEnum.DailySingInRecordPage)}*/}
      {/*    >{'visualizar registros >'}*/}
      {/*    </button>*/}

      {/*    <VIPIcon>*/}
      {/*      <ResponsiveContainer>*/}
      {/*        <div className='pb-[122.699%]'></div>*/}
      {/*        <img*/}
      {/*          className='absolute top-0 left-0 w-full h-full z-[-1]'*/}
      {/*          alt='god'*/}
      {/*          src={`assets/${environment.assetPrefix}/daily_sign_in_god.png`}*/}
      {/*        />*/}
      {/*      </ResponsiveContainer>*/}
      {/*    </VIPIcon>*/}

      {/*  </div>*/}
      {/*</VIPContainer>*/}
    </div>
  )
}

export default CocoDailySignInPage;
