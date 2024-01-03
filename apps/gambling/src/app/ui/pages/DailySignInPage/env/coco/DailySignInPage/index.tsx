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
import { useAllowLoginRouterRules } from "../../../../../router/hooks/useAllowLoginRouterRules";
import {BackNavigation} from "../../../../../components-bs/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../../hooks/usePageNavigate";
import { formatLocaleMoney } from "../../../../../utils/format";
import {ViewRecordButton} from "../../../../../components-bs/Buttons/env/coco/ViewRecordButton";

const SignInButton = styled.div<{
  disable: boolean
}>`
  background-image: url(${props =>
    props.disable?`assets/${environment.assetPrefix}/daily_sign_in_button_disable.png`:
                  `assets/${environment.assetPrefix}/daily_sign_in_button.png`});
  background-size: 100%;
  width: 20vw;
  height: calc(0.33 * 20vw);
  background-repeat: no-repeat;
`

const DayItem = styled.div`
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_wrapper.png");
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

const BackGround = styled.div`
  background-image: url("assets/${environment.assetPrefix}/bg_desktop.png");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
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
const DisableButton = styled(LevelButton) `
  background-image: url("assets/${environment.assetPrefix}/daily_sign_in_button_checked.png");
  background-size: 100%;
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
            <div>VIP{level}</div>
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
          <div className='relative mr-[2px] 2xl:mr-[50px]'>
            <DayItem key={day} className={tcx(
              'flex flex-col justify-between w-[128px] min-w-[128px] h-[188px] text-center',
              ['grayscale', checked],
              ['w-[108px] min-w-[108px] h-[160px]', isMobile]
            )}>
              <div
                className={tcx('w-full flex justify-center items-center text-white mt-[14px]', ['mt-[10px]', isMobile])}
              >
                Dia{day}
              </div>

              {
                !checked && (
                  <div className='relative flex justify-center'>
                    <img
                      className={tcx('w-[90px]', ['w-[72px]', isMobile])}
                      alt='money'
                      src={`assets/${environment.assetPrefix}/daily_sign_in_money.png`}
                    />
                  </div>
                )
              }

              {
                !checked && (
                  <div className='break-all text-sm  text-white mb-[24px]'>R$ {formatLocaleMoney((config?.cashback || 0))}</div>
                )
              }

            </DayItem>
            {
              checked && (
                <div className='absolute top-[30%] left-[50%] translate-x-[-50%] w-[80px]'>
                  <img alt='checked-icon' src={`assets/${environment.assetPrefix}/daily_sign_in_checked.png`}/>
                </div>
              )
            }
          </div>
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
    <div className='h-[100vh] bg-gradient-to-b from-[var(--background-checkin-from)] to-[var(--background-checkin-to)]'>
      <BackGround>
        {contextHolder}

        <div className='px-24'>
          <BackNavigation onClick={() => onClickToIndex()} />
        </div>


        <div className='px-24 flex flex-col items-end'>
          <Container className='relative
                                pt-5 pr-10 pb-8 pl-8
                                lg:pt-7 lg:pr-12 lg:pb-10 lg:pl-10
                                xl:pt-9 xl:pr-16 xl:pb-14 xl:pl-14
                                2xl:pt-14 2xl:pr-20 2xl:pb-14 2xl:pl-17
                                '>
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

          <ViewRecordButton onClick={()=>navigate(PageOrModalPathEnum.DailySingInRecordPage)}/>
        </div>
      </BackGround>
    </div>
  )
}

export default CocoDailySignInPage;
