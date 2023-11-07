import styled from "styled-components";
import cx from "classnames"
// import { space, layout, typography, color } from 'styled-system'
import {Header, HeaderMobile} from "./Header";

import React, {useEffect, useState} from "react";
import {MenuDrawer} from "../../drawers/MenuDrawer";
import useBreakpoint from "../../hooks/useBreakpoint";
import {UserLoginStatusModal} from "../../modals/UserLoginStatusModal";
import {UserLoginStatusDrawers} from "../../drawers/UserLoginStatusDrawers";
import {UserInfoStatusPopover} from "../../popover/UserInfoStatusPopover";
import {ThreeDots} from 'react-loading-icons';
import {NotificationDrawer} from "../../drawers/NotificationDrawer";
import {InviteBonusModal} from "../../modals/InviteBonusModal";
import {LogoutPopover} from "../../popover/LogoutPopover";
import {DownloadModal} from "../../modals/DownloadModal";

import {notification} from 'antd';
import {RootState} from "../../../reduxStore";
import {useDispatch, useSelector} from "react-redux";
import {appSlice} from "../../../reduxStore/appSlice";
import { AppLocalStorage } from "../../../persistant/localstorage";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useLocation, useNavigate} from "react-router";
import { TabBar } from "./TabBar";
import {LogoutModal} from "../../modals/LogoutModal";
import App from "next/app";
import {TelegramContactModal} from "../../modals/TelegramContactModal";
import {ErrorPage} from "../../pages/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import {environment} from "../../../../environments/environment";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
console.log("environment", environment);
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type IOpenNotificationWithIcon = {
  type?: NotificationType;
  message?: string;
  description: string
}

// export const AppContext = createContext({
//   isUserLogin: !!AppLocalStorage.getItem("token"),
// });

type IStyledPage = {
  isCurrentPageCompanyProfile: boolean;
}
const StyledPage = styled.div.attrs((props) => ({
  className: "h-full"
}))<IStyledPage>`
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    //box-shadow: 0 0 3rem 0.5rem #306347 inset;
    //background-color:#306347;
  }
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    //opacity: .6; //背景霧面
    background: url("assets/${environment.assetPrefix}/bg_bothside.png")no-repeat center center/150% auto;
    background-position: center bottom;
    background-repeat: no-repeat; /* 防止背景图像重复 */
    background-color:#08170A;  //背景圖
  }
  ${(props) => props.isCurrentPageCompanyProfile && `
    background: url("assets/${environment.assetPrefix}/bg.888bcf29.png") no-repeat center center/100% auto;
    background-color:#090b0f;
  `};
  @media (min-width: 640px) {
    &:after {
      //background: url("assets/bgImg.3a85b39c.jpg") no-repeat center center/100% auto;
    }
  }

`;

const FixedToolContainer = styled.div`
    width: 80px;
  background-color: rgba(119, 136, 120, 0.4);
    border-radius: 11px 0 0 11px;
    overflow: hidden;
    z-index: 10;
`

export type IPage = {
  children: React.ReactNode;
  showMobileHeader?: boolean;
  showTabbar?: boolean;
  showDesktopHeader?: boolean;
  showDesktopMenuDrawer?: boolean;
  showFooter?: boolean;
  showToolbox?: boolean;

}
export const PageTemplate = (props: IPage) => {
  const navigate = useNavigate();

  const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
  const [footerTextExpand, setFooterTextExpand] = useState(false)


  const {isMobile} = useBreakpoint();

  useEffect(() => {
    if(!isMobile) {
      setOpenMenuDrawer(true)
    } else {
      setOpenMenuDrawer(false);
    }
  }, [isMobile]);

  // NOTE: UserLoginStatusModal
  const [showUserLoginStatusMobileModal, setShowUserLoginStatusMobileModal] = useState(false);


  // useEffect(() => {
  //   if(!isMobile) {
  //     setShowUserLoginStatusMobileModal(false)
  //   } else {
  //     setShowUserLoginStatusMobileModal(true);
  //   }
  // }, [isMobile]);

  // NOTE: LoginStatus
  const [openNonMobileUserLoginStatusDrawer, setOpenNonMobileUserLoginStatusDrawer] = useState(false);
  // useEffect(() => {
  //   if(!isMobile) {
  //     setOpenNonMobileUserLoginStatusDrawer(false)
  //   } else {
  //     setOpenNonMobileUserLoginStatusDrawer(true);
  //   }
  // }, [isMobile]);

  const isShowLoginModal = useSelector((state: RootState) => state.app.isShowLoginModal)

  const showLoginModal = (show: boolean) => {
    if(isMobile) {
      // setShowUserLoginStatusMobileModal(show);
      dispatch(appSlice.actions.showLoginDrawerOrModal(show))
    } else {
      // setOpenNonMobileUserLoginStatusDrawer(show);
      dispatch(appSlice.actions.showLoginDrawerOrModal(show))
    }
  }

  // NOTE: isLogin
  // const {user: { isUserLogin }} = usePageTemplatePresenter();
  // const { isUserLogin} = useContext(AppContext);
  // const [isLogin, setIsLogin] = useState(isUserLogin);
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const setIsLogin = (login: boolean) => {
    dispatch(appSlice.actions.setIsLogin(login))
  }

  const {updateBalance} = useAutoUpdateBalance();

  // NOTE: UserInfoStatusDrawer
  const [openDesktopUserInfoStatusDrawer, setOpenDesktopUserInfoStatusDrawer] = useState(false);

  useEffect(() => {
    if(isMobile && openDesktopUserInfoStatusDrawer) {
      setOpenDesktopUserInfoStatusDrawer(false)
    }
  }, [isMobile]);

  useEffect(() => {
    if(openDesktopUserInfoStatusDrawer) updateBalance();
  }, [openDesktopUserInfoStatusDrawer])

  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  //   return () => {
  //     clearTimeout(timer);
  //   }
  // },[])

  const { isShowMobileLogoutModal , isShowTelegramModal, isShowInviteBonusModal } = useSelector((state: RootState) => state.app)

  // NOTE: NotificationDrawer
  const [openDesktopNotificationDrawer, setOpenDesktopNotificationDrawer] = useState(false);

  // NOTE: InitialChargeModal
  // const [openInitailChargeModal, setOpenInitailChargeModal] = useState(isLogin);

  const setOpenInitailChargeModal = (show: boolean) => {
    dispatch(appSlice.actions.setIsShowInviteBonusModal(show))
  }

  const isShowMobileHeader = props.showMobileHeader === undefined ? true : props.showMobileHeader;
  const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;
  const isShowFooter = props.showFooter === undefined ? true : props.showTabbar;
  const isShowToolbox = props.showToolbox === undefined ? true : props.showToolbox;

  const isShowDesktopHeader = props.showDesktopHeader === undefined ? true : props.showDesktopHeader;
  const isShowDesktopMenuDrawer = props.showDesktopMenuDrawer === undefined ? true : props.showDesktopMenuDrawer;

  // NOTE: LogoutPopover
  // const [openLogoutPopover, setOpenLogoutPopover] = useState(false);

  const setOpenLogoutPopover = (show: boolean) => {
    dispatch(appSlice.actions.showMobileLogoutModal(show))
  }
  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  const [api, contextHolder] = notification.useNotification();




  const openNotificationWithIcon = (props: IOpenNotificationWithIcon) => {
    const type = props.type || "error";
    const msg = props.message || "Message"
    api[type]({
      message: msg,
      description: props.description,
    });
  };

  // openNotificationWithIcon('error')
  const telegramServiceId = AppLocalStorage.getItem('telegramService');
  const telegramManagerId = AppLocalStorage.getItem('telegramManager');
  const userInfoString = AppLocalStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const user_id = userInfo?.user_id || '';
  const telegramServiceUrl=`https://t.me/${telegramServiceId}?start=${user_id}`
  const telegramManagerUrl=`https://t.me/${telegramManagerId}?start=${user_id}`

  const location = useLocation();
  // console.log("location", location);
  const isCurrentPageCompanyProfile = location.pathname === PageOrModalPathEnum.CompanyProfilePage

  const onClickToDownload = () => {
    setOpenDownloadModal(!openDownloadModal);
  }
  const onClickToOpenTelegramService = () => {
    window.open(telegramServiceUrl,'_blank')
  }

  const onClickToOpenTelegramManager = () => {
    window.open(telegramManagerUrl,'_blank')
  }

  // NOTE: mobile footer expands
  const [footerExpands, setFooterExpands] = useState({
    gameTypes: false,
    helpers: false
  })
  return (
    <StyledPage isCurrentPageCompanyProfile={isCurrentPageCompanyProfile}>

      {contextHolder}

      {!isMobile && isShowDesktopHeader && (
        <Header
          isLogin={isLogin}
          onClickUserLoginStatusDrawer={() => {
            // setOpenNonMobileUserLoginStatusDrawer(true);
            showLoginModal(true)
          }}
          className={"fixed top-0 left-0 right-0 w-full h-[100px] z-10"}
          onClickToPopupUserInfoStatusPopover={() => {
            setOpenDesktopUserInfoStatusDrawer(!openDesktopUserInfoStatusDrawer)
          }}
          onClickToOpenNotificationDrawer={() => {
            setOpenDesktopNotificationDrawer(true)
          }}
          onClickToChangeLogoutPopover={(display: boolean) => {
            setOpenLogoutPopover(display);
          }}
          openLogoutPopover={isShowMobileLogoutModal}

        />
      )}

      <div className={"h-full flex flex-row"}>

        {/*{isShowDesktopMenuDrawer && openMenuDrawer && (*/}
        {/*  <MenuDrawer*/}
        {/*    className={cx("fixed left-0 bottom-0 w-[276px] min-w-[276px] h-full z-30", {*/}
        {/*      "w-[0px]": !isShowDesktopMenuDrawer,*/}
        {/*    })}*/}
        {/*    closeMenuDrawer={ () => {*/}
        {/*      setOpenMenuDrawer(false)*/}
        {/*    }}/>*/}
        {/*)}*/}
        {isShowDesktopMenuDrawer && (
          <MenuDrawer
            className={cx("fixed bottom-0 w-[276px] min-w-[276px] h-full z-30",
              "ease-in-out",
              {
                "duration-300": true, //isMobile,
                // "w-[0px]": !isShowDesktopMenuDrawer,
                "left-[-276px]": isMobile && !openMenuDrawer,
                "flex left-0": openMenuDrawer,
              }
            )}
            closeMenuDrawer={ () => {
              setOpenMenuDrawer(false)
            }}
            openMenuDrawer={openMenuDrawer}
          />
        )}

        {/*refactor: openNotificationWithIcon*/}
        {/*{showUserLoginStatusMobileModal && (*/}
        {isMobile && isShowLoginModal && (
          <UserLoginStatusModal
            openNotificationWithIcon={openNotificationWithIcon}
            close={() => {
              // setShowUserLoginStatusMobileModal(false)
              showLoginModal(false)
            }}
            setIsLogin={(login: boolean) => setIsLogin(login)}
          />
        )}
        {/*{openNonMobileUserLoginStatusDrawer && (*/}
        {!isMobile && isShowLoginModal && (
          <UserLoginStatusDrawers
            openNotificationWithIcon={openNotificationWithIcon}
            closeDrawer={() => {
              // setOpenNonMobileUserLoginStatusDrawer(false);
              showLoginModal(false)
            }}
            setIsLogin={() => setIsLogin(true)}
          />
        )}


        {openDownloadModal && (
          <DownloadModal close={() => {
            setOpenDownloadModal(false)
          }}/>
        )}



        {openDesktopUserInfoStatusDrawer && (
          <UserInfoStatusPopover close={() => setOpenDesktopUserInfoStatusDrawer(false)}/>
        )}

        {openDesktopNotificationDrawer && (
          <NotificationDrawer closeDrawer={() => {
            setOpenDesktopNotificationDrawer(false)
          }}/>
        )}

        {!isMobile && isShowMobileLogoutModal && (
          <LogoutPopover close={() => {
            setOpenLogoutPopover(false);
          }}/>
        )}

        {isShowTelegramModal && (
          <TelegramContactModal close={() => {
            dispatch(appSlice.actions.setShowTelegramModal(false))
          }} toTelegram={() => {
            dispatch(appSlice.actions.setShowTelegramModal(false))
            onClickToOpenTelegramService()
          }}/>
        )}

        {isShowInviteBonusModal && (
          <InviteBonusModal
            close={() => {
              setOpenInitailChargeModal(false);
            }}
            onConfirm={() => {
              setOpenInitailChargeModal(false);
              navigate(PageOrModalPathEnum.InvitePage);
            }}/>
        )}


        <div className={cx("w-full h-full", {
          "relative": !isMobile,
          "top-[100px]": isShowDesktopHeader,
          "left-[276px] w-[calc(100vw-276px)]": !isMobile && isShowDesktopMenuDrawer,
          "bg-[]": !isCurrentPageCompanyProfile && !isMobile,//背景色
        })} style={{
          // background: "url('assets/001/Brazilianwordmap.png') center/cover no-repeat",
          backgroundSize: '60% 70%',
          backgroundPosition: 'right bottom',
          // opacity: 0.5,
        }}>
          {isMobile && isShowMobileHeader && (
            <HeaderMobile
              clickToOpenMenuDrawer={() => {
                setOpenMenuDrawer(!openMenuDrawer)
              }}
              clickToOpenUserLoginStatusModal={() => {
                // setShowUserLoginStatusMobileModal(true);
                showLoginModal(true)
              }}
            />
          )}

          {isMobile && isShowMobileLogoutModal && (
            <LogoutModal/>
          )}

          {/*NOTE: 佔據高度*/}
          {isMobile ? (
            isShowMobileHeader && <div className={"h-[52.5px]"}></div>
          ) : (
            isShowMobileHeader && <div className={"h-[13px]"}></div>
          )}


          <ErrorBoundary fallback={<div className={"text-white"}>Children</div>}>
            {props.children}
          </ErrorBoundary>

          {isMobile  && isShowFooter &&
            <div className='flex justify-center text-white bg-[rgba(38,86,57,0.6)] p-4 pb-[80px]'>
              <div className={"flex flex-col"}>

                <div className='mt-3 flex justify-center mb-4 flex-nowrap'>
                  <img alt='footer1' className='w-[6%] h-[89%] flex-1' src={`assets/${environment.assetPrefix}/footer1.aa87e40b.png`}/>
                  <img alt='footer1' className='w-[16%] h-[60%] flex-1 mt-1' src={`assets/${environment.assetPrefix}/footer2.43ad4696.png`} />
                  <img alt='footer1' className='w-[16%] h-[72%] flex-1' src={`assets/${environment.assetPrefix}/footer3.e3ce7aaa.png`}  onClick={()=>window.open('https://www.skrill.com/pt/')}/>
                  <img alt='footer1' className='w-[16%] h-[60%] flex-1 mt-1' src={`assets/${environment.assetPrefix}/footer5.3cd11f0c.png`} onClick={()=>window.open('https://www.begambleaware.org/')}/>
                  <img alt='footer1' className='w-[8%] h-[89%] flex-1' src={`assets/${environment.assetPrefix}/footer6.a8ba450a.png`}  onClick={()=>window.open('https://www.interac.ca/en/')}/>
                  <img alt='footer1' className='w-[6%] h-[72%] flex-1 mt-0.5' src={`assets/${environment.assetPrefix}/footer4.e6cdeca2.pngs`}  onClick={()=>window.open('https://www.gamcare.org.uk/')}/>
                </div>

                <div>
                  <section className={"flex flex-col items-start"}>
                    <button
                      className='h-[44px] text-white w-full flex flex-row justify-between'
                      onClick={() => {
                      setFooterExpands({
                        ...footerExpands,
                        gameTypes: !footerExpands.gameTypes
                      })
                     }}
                    >
                      <span>Jogo</span>
                      {!footerExpands.gameTypes ? <DownOutlined /> : <UpOutlined />}
                    </button>
                    {footerExpands.gameTypes === true && (
                      <div className={"pl-4 flex flex-col items-start"}>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Salão</button>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Slots</button>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Fishing</button>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Vivo</button>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Viver</button>
                      </div>
                    )}
                  </section>

                  <section className={"flex flex-col items-start"}>
                    <button
                      className='h-[44px] text-white w-full flex flex-row justify-between'
                      onClick={() => {
                        setFooterExpands({
                          ...footerExpands,
                          helpers: !footerExpands.helpers
                        })
                      }}
                    >
                      <span>Ajuda</span>
                      {!footerExpands.helpers ? <DownOutlined /> : <UpOutlined />}
                    </button>
                    {footerExpands.helpers === true && (
                      <div className={"pl-4 flex flex-col items-start"}>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.PrivacyAgreementPage)}>Politica de Privacidade</button>
                        <div className={"h-[44px]"}>Termos de Servico</div>
                        <button className={"h-[44px]"} onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}>Descrico do nivel VIP</button>
                      </div>
                    )}
                  </section>
                </div>

                <section className={""}>

                  <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden text-left", {
                    "max-h-24": !footerTextExpand
                  })}>
                    &ensp;&ensp;{environment.platformName} é um excelente jogo de caça-níqueis online especialmente desenvolvido para os amantes de cassinos. Rege-se pelos princípios da concorrência leal e do controle legal local. Oferece aos jogadores com mais de 18 anos uma variedade de métodos de apostas diferentes e jogabilidade especial. Os jogadores só precisam escolher seu tipo de jogo de caça-níqueis preferido e, em seguida, fazer sua aposta, girar a máquina caça-níqueis para ter chances iguais de ganhar.
                  </div>

                  <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden text-left mt-4", {
                    "max-h-0": !footerTextExpand
                  })}>
                    &ensp;&ensp;Entendemos as preferências dos jogadores brasileiros, o que é uma das razões do nosso sucesso no mercado brasileiro. Forneça os tipos de jogos de caça-níqueis mais populares e métodos de jogo característicos, cada tipo de jogo tem seus recursos e métodos de jogo exclusivos para atender às necessidades de diferentes jogadores. Portanto, também fornecemos métodos de pagamento convenientes e excelente suporte ao cliente e atualizamos regularmente o conteúdo do jogo para garantir que os jogadores desfrutem da melhor experiência de jogo nos {environment.platformName}.
                  </div>

                  <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden text-left mt-4", {
                    "max-h-0": !footerTextExpand
                  })}>
                    &ensp;&ensp;O {environment.platformName} oferece aos jogadores a experiência de usuário da mais alta qualidade. O design da interface do jogo é meticuloso, permitindo que os jogadores sintam a alta qualidade e sofisticação do jogo. Com belos efeitos sonoros, ele pode não apenas aumentar a tensão e a emoção do jogo, mas também proporcionar aos jogadores uma experiência audiovisual chocante. O jogo roda sem problemas, sem gaguejar ou travar. Também fornecemos uma interface de usuário amigável e operações fáceis de entender, tornando mais fácil para os jogadores começarem.
                  </div>

                  <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden text-left mt-4", {
                    "max-h-0": !footerTextExpand
                  })}>
                    &ensp;&ensp;Resumindo, você vem ao cassino do jogo {environment.platformName} para girar.
                  </div>

                  <div className='flex justify-center underline text-blue-500 mt-46'>
                    <button onClick={()=>setFooterTextExpand(!footerTextExpand)}>{footerTextExpand ? 'jogue fora': 'ver tudo'}</button>
                  </div>

                  <div className='mb-4'>@ 2023 Cat777bet.com All rights</div>

                  <div className='flex justify-center mb-4'>
                    <img alt='footer1' className='h-[13px]' src={`assets/${environment.assetPrefix}/footer7.a1b2fb6d.png`}/>
                  </div>

                </section>
              </div>
            </div>
          }

          {!isMobile  && isShowFooter &&
            <div className='flex justify-center text-white bg-[rgba(5,63,39,0.6)] h-[400px]'>
              <div className={"flex gap-3 w-11/12 mt-3"}>
                <section className={"flex flex-col gap-3 w-1/12 items-start"}>
                  <div className='text-gray-500'>Jogo</div>
                  <button onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Salão</button>
                  <button onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Slots</button>
                  <button onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Fishing</button>
                  <button onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Vivo</button>
                  <button onClick={()=>navigate(PageOrModalPathEnum.IndexPage)}>Viver</button>
                </section>

                <section className={"flex flex-col gap-3 w-3/12 items-start"}>
                  <div className='text-gray-500'>Ajuda</div>
                  <button onClick={()=>navigate(PageOrModalPathEnum.PrivacyAgreementPage)}>Politica de Privacidade</button>
                  <div>Termos de Servico</div>
                  <button onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}>Descrico do nivel VIP</button>
                </section>

                <section className={"w-8/12"}>
                  <div className={"flex gap-3 items-center mb-2"}>
                    <img className={"w-[100px] h-[50px]"} src={`assets/${environment.assetPrefix}/LOGO.png`}/>
                    {/*<span className="text-lg">{environment.platformName}</span>*/}
                  </div>

                  <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden", {
                    "max-h-24": !footerTextExpand
                  })}>
                    {environment.platformName} é um excelente jogo de caça-níqueis online especialmente desenvolvido para os amantes de cassinos. Rege-se pelos princípios da concorrência leal e do controle legal local. Oferece aos jogadores com mais de 18 anos uma variedade de métodos de apostas diferentes e jogabilidade especial. Os jogadores só precisam escolher seu tipo de jogo de caça-níqueis preferido e, em seguida, fazer sua aposta, girar a máquina caça-níqueis para ter chances iguais de ganhar.
                    Entendemos as preferências dos jogadores brasileiros, o que é uma das razões do nosso sucesso no mercado brasileiro. Forneça os tipos de jogos de caça-níqueis mais populares e métodos de jogo característicos, cada tipo de jogo tem seus recursos e métodos de jogo exclusivos para atender às necessidades de diferentes jogadores. Portanto, também fornecemos métodos de pagamento convenientes e excelente suporte ao cliente e atualizamos regularmente o conteúdo do jogo para garantir que os jogadores desfrutem da melhor experiência de jogo nos {environment.platformName}.
                    O {environment.platformName} oferece aos jogadores a experiência de usuário da mais alta qualidade. O design da interface do jogo é meticuloso, permitindo que os jogadores sintam a alta qualidade e sofisticação do jogo. Com belos efeitos sonoros, ele pode não apenas aumentar a tensão e a emoção do jogo, mas também proporcionar aos jogadores uma experiência audiovisual chocante. O jogo roda sem problemas, sem gaguejar ou travar. Também fornecemos uma interface de usuário amigável e operações fáceis de entender, tornando mais fácil para os jogadores começarem.
                    Resumindo, você vem ao cassino do jogo {environment.platformName} para girar.
                  </div>

                  <div className='flex justify-center underline text-blue-500 mt-46'>
                    <button onClick={()=>setFooterTextExpand(!footerTextExpand)}>{footerTextExpand ? 'jogue fora': 'ver tudo'}</button>
                  </div>

                  <div className='mt-3 flex justify-center mb-4'>
                    <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer1.aa87e40b.png`}/>
                    <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer2.43ad4696.png`}/>
                    <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer3.e3ce7aaa.png`} onClick={()=>window.open('https://www.skrill.com/pt/')}/>
                    <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer5.3cd11f0c.png`} onClick={()=>window.open('https://www.begambleaware.org/')}/>
                    <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer6.a8ba450a.png`} onClick={()=>window.open('https://www.interac.ca/en/')}/>
                    <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer4.e6cdeca2.png`} onClick={()=>window.open('https://www.gamcare.org.uk/')}/>
                  </div>
                  <div className='flex justify-center mb-4'>
                    <img alt='footer1' className='h-5' src={`assets/${environment.assetPrefix}/footer7.a1b2fb6d.png`}/>
                  </div>
                  <div className='mb-4'>@ 2023 Cat777bet.com All rights</div>
                </section>
              </div>
            </div>
          }

          {isMobile && isShowTabbar&& (
            <TabBar/>
          )}

          {/*Toolbox*/}
          {isMobile && isShowToolbox ? (
            <div className={"z-10 fixed right-[-23px] bottom-[68px]"}>
              <div className={"mb-2"}>
                <button className={""} onClick={onClickToDownload}>
                  <img alt={"download"} className="w-[50%]" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAYAAACqNJiGAAAAAXNSR0IArs4c6QAADrhJREFUeNrlnQtYVGUax79znQuZptlle8rdtjW37X7ZbtvmY5utm2ubaChoqSRiaGaCVlqhpuWVMkxTEcFCRRiCUVOJLoqGlEGoIwxykZlhhoEZBpkBTXH2f3BGhgEMmGEO4Hme38MDyHDmx/t+1/d8EiLSFRlJ2Pxj5OHiAjJVW0aiNKeJslxH5ZSdpgxaHVWvr6DOGyqpizp8LMXnRWWUoaScylFrKKUa/z7vFJl6BD8vvA65Gq68n8kQXTGJMGhIhlFH2VTHKHNaKilctZIcmfEaSR8xgqTcey9JGDiQxErlZBNNkw3CR+Hze/D14fh+yAySvnQVdWR7KlWYdZwyq/WU7YSWysgppSO+w+v3KmGHDpEb9BBm1JA8TRFlS95OVKHTyP5bbiFx+PYGT7kZrzMJr7cpkVL9XELbftVReUc1dIQCv7fHSjv+C7mv4jSJN5aRul0Koh43ligZhmz0hrC2EF5/VABRxqZS6l90dN1PWjp+73FyX4+RdiKX/K2ilCi0RcQWHUWyvRVhHeUm/N6Fn1DZh0pp248aRrEX99VtpR08SK6DtLX6EmL7eAXJ6tePbBZDmjt9cR8LVlNZmRradlBLr/0S99mtxBXnkzHmclKuQHt2220kvjtIa9E24r4+SaJVh410+Z5CZozo0jJTSR9EWlyRilj8R5O07ijNneH+VNoeNW35RsvExeD+RRFXkEeGmHREpVSQggH9SWxPEOek3wASuyaVLvjOyKqSCnw8vClWkWcrtcS88F1yoCdJcyc0kjrwTQVjVqjJsz4Rp1GTQF0JsQZg6NGTxV1O4wBKuVvLWL8qZQK7VFxpPgkuO0Vqhz5NdvYGcU4eGkp2flXG1CYXM8FdIw4RJ4h77O9kR28S5+Tux8gOBQQmejsC1WjjtCWUtbdFnDsPIAKTtaw1Qc16pw3MQ6+q11Lm3tLG/R7D0AamGFlzrKe9cCrGQYZyonqvh/eqHeWVhcyB5CpOtSzTg3FgGQbAKRjHXU3inCxSsgUJ5Vxcp8TlY8qVf5Ky9O9hA2Bv0QcD6ZhTrGVzcQencsIkv7yc0o/uIVOuruJJTOW2VbH6DzuymFCM1ZHtO4jqahbn5C0Fq4rVc2vbJS4X617FpZRNjNWRvn1IzI5tRKUpo85WGKkGPdABLSjUUucSUqj8/gN824xcDw+b9Zxt9Yl2rAeWlBHF8pUkS4y/8vYEcqKykrJXAD3QAQ04XUXZS6poexFISKPUvr6vyR8zWTEVvOKK4n7B0nl+MWUTayGz9DR2zRzStI3SaHspKAangNpE21UV9AWa8e19+cHHei1nW3Wca3tJ/5SGxK/4mGSL1b5oK6gLgrQyRJqrtEJQAHEnwQkg9yObfB590Wz255VcfKvi9mG3qUhL1d0s0p6DwGnIc01Rd2nHwa8mRhR518HL+kquLrK1Xbn8UhKxPcX37YkrxUjJIpcUzRfS1CEtD9JywS9mceQJhO/m1NF6NqKFvELsd/qLPH8tNNIX1FWXpJ10SDsGYUK05YCjEPeTiPIeG0cpo6v4vGbihJ32PHQUXb2v+nuchDxnih5zpGiOI9oEadngRxHloaPaGKXjbZF5fNOiwTGUKmzZQYk+KD4Gee4p+rNDWhY4DDKrGbtUJHkCYQpOtVovaUpdodZDKFkQW15uJX0h1y1Fjzii7RCkHaxm7T8AMeUNDWP2r66SZFyuVjppoG1i9rJOjlYyF466pejh6kvRdgDSvgffiiyvHzxFmXnbUKE6KxNlWpmoNuoO88hsyGueomyjtB8c0jLAfou48gQWFvLmyHzuYZJVQIdsTaMKu4O8w1XMhaYUZRqlfeeQlg72QdzX3UBe2Ndc4aLTXAjJ0dJRkah36w7yMiHvoFuKfuOItr1gD9hl4UTrbZ2MWcMeWVopiSJHUWk5eQaV7usbCHqNSg9fTmWFr6Cy5qxgsj6Ip/NcpTlT1Bltu4ES4lJrOPv8RPZE8Eoma4qDUbOZDKEQ0lf3/vTrTPoHRl5Jcgx0zjBUXPpUHP5YWY4OIdPc1IteTlE3absc0r4CySAJJILtZzh7AvjiDG8fs4D53lf3f9dIKmVJtSSHZGtpwxCUrPpS3tgQat8hc/N2rfUUZe1plkvSFK7Sai5J+xLStoI4MGoe862v7v8P99MJiyqlBvKTnqnvP9D3+xQrk+iTbbVrrima4oi2nWAH2FbTXFoseHsvd4r4MG394GuhWVJPjlYx54WiaV/L4yRkU8xhRts8RbkW0ppHG9+YovFgC9hcy9uX5nAG9L4xPr13+FpUKz1PjpqYi75sbF0ZcBPZ8mU+U+3sRdNqWk/RbY52batDmhBtMRAXVcLVXP8nEYop4WuRTXqRZIsUeU4GP0i2JerY+vamqCBtI4g28mcH/4NKFOOehch7X4i8QyK1ec22+EZTqYkm7oJTWlspuglsAJ9Z+IbHJ1C7xLpfvxtI7HyLtJ58r6MNg33c27aGfwTz7Y4z3EV3aUK0bXJE2+dgvVVy8YVI9gcx7/VG9LZvVaG3PVhB5zzl43Fem5Wan7NHW0tRQdq6Won9MxAcz+WKfZ+DMc572yLLIRk6RjlehBlGWw3xOxh2uKboeiFNIS0ahH/PFft656w1Hn2DSY+olChJRjkbFbG6e8xtBYRhxwe5nMEZbWvBp1aJ/b0TnFHeTZ7teO5T7ki4CXNbZTEzdY2S9uqqyv1PUztnRTM/hcfSuXPAm5vp3AkLmYN9+rfvzQvDj2Ul/BlB2idgiYavveEv5Iv2/Czfl8T8E23iqK1czsitfO7zYPgG7udBz1HJ3np/4/bxhTPLpVNJEtbzdqoYr63njZxG7U01sw2tDT0+y+fM17azZ78Dw5ClkLZUx1vvfIZKaq+40HypMaJeZp8DZoNZ4HUQVi9reDCCzfDGe5xeLDVPK8J6nrCSvN/I2AZ6aSV5Sz5rTmljLir0ohOXM4c7sOGyoSNt3FPvsz+EQ9Sb4A2HtBlnZfbXzsrtoWCSQWb1uPTsVhI3u0Z6aSVZuPbo2YzRoZRX9jCSzFzDlSbws7Cc1FVt0X/iuJw3HNE2U4g2CJsOpoGpIBhwfTybyj0wg90/q1qa0VQ+q2EjluC5LG+8gUQL13Cl2cHrO7tO3r/j+Vx3aSHgVTBFiLxzkNfPM3kvpvGqsApZ0+5ZLIq2k8tYr+zbJkBei9nBmaahx+xdXJdVJYxMlhx3pqi7tJfBxHN+HskT9m2nG6S2SQV882Lv1Aoubxh2xD19A1tr+Ib4Nge6vDD0uLhYzZsiT/Km98G7+bxpPngHzANzQTiYU8CbZoNZBVLT62AGCFNLTaEgBEwFwWAymAReKZKZQutkDa4pOhnCXmmUJrcHQdx4D+UNCWKUYRZpXotyiyQdG/GhkvU4KrZAnrs014HuGgw9PgarwUqwHHxkk9qXgg8AVivskeC9Oqn9XfAOeLtOZp8H3HvRmZd60Rbtmmu0TYCwQDDuNz/7S795Ju/FvRJ1SKWsZa3KOlT/JFewdZ72ujFn+Iam2YGkTWkrHNI+BEvAYrAQvO+QNt9NWrhD2uVetL6pF72coudcpckbpQnRJkgbC/w9kOeHXnZ6taxu4q9tnF2QqOfiw9YwHtXnfY7Ic58dCAPdKLDKIW2ZTdJMWmO01V2KtvmN0SazvwXmOqS96SYtzCFtmkNaWyka4CLtRfC/366xM307J2/YOi47pFoW32Zx43pUPm7VsDY/D6ZBq7S8tVFaB1N0gUNco7QOpKhTWmspOgaMbpTmZ38BjLT6nevMe+LhI7hCZptQwF35sIcvDKwiBDW4nZU3LYk73pa0Dx3SrpiidS2ltTdFx51rkuaMNkHaC+evaeSJdGmn2vSnormsV00yxe8WdEej6juunLNd38lq+AGDSPziUr6mKUVbb9dapGhdKykKSe7SmqeoX1OKnnNP0SZpAiMq5dZr7qK/6PCMAu9nSpXMNr6Qb9/pGMJzB/Pw/EGn9yYwsZ+axp1cXCU52yxF65pS1FVahEPabIe0tmYHrika5EjRgHOtp6hTmpCqQsR1RlzjrEUpUU0yy9r3HIZwCU+8xFXx+sfHUh4/AcRjOiTt2xK+I/RrgusAne0cnNz+EpMWbJWXP5/XweNE1uKZq7VFnKXPgKvz2TMp3neQRmoJ0so6d4zIBj0XN3cXe1U+9Thir6RgolneuacehWsunjfdaOJVY/D86dUk7pEl3IHJtXLVqEwPz11ZiUnwOhNvfswL896ewB2BjPLlM3KzfwnvnfNWVhazz36i561DhlG9+oyBm/H+gkwy61idxLvnrKzW8IGrdXztnx+ne+XpFjc+Se8INMpqxxlkXXO+yjINF7wCAu/sZREoRNz4RnHyrjlXxXl9hAhcbuCtj/SSNvB2rNEFIlW7LOLcr4VoA5ebefPzi9ge3Qs/iF41CJ2D19u437si0Qsvs0hU03ZzBX49bCDN436fxThugtVP5bVetaPXFIyDFlfwcQtKJZb7vDCV8wV/xJRrrEZuCcAA+MlMkc7Pc70WnObHLLJI9a98xan6DeqeJzf6DaLjn8EkP8jqpx/b2SlXV13TMXl+1yhZu8AosY38lMuSdpO6EmEh89FoPmucSW5DtK3t8CTfl9dsrHvNr5Io5ukh8TMu+9pbxXmmTY7f+/g6PjvAiLW4arniv+1dj+sO10wsWb9llsbPNUvrAvfw6rsx7aG7+Hle4fWFocfwfVJ1kEVeF1gji3+xmOs55yS7X6HYbZpTIZs7p1qaNwsbxv7YcX8IJQt9vBSRwq7WX/F6/0J7hhmCDUOPvACzLGL4rz34hO7WrhAMb2aiVEGo9ZiFYpmpqDYag3KtYah3e+ANNv32kUzK9ShZlaPmlxGKzFHsKHyU4nPh64Pw/Xtms+lPRHNHRqRLCgNKZeaXrdiYscgyxmM/1b+A711nw7d1CVVGU1Cm9apGGoL90KhQs0w5vUaWg+09Q8gZWT12/89jCf5iSJ38fDA+n4yvY5ko5+VqmXIi/n1AuTzEv0j+8FAR/1eC/wMxhbydzArHyAAAAABJRU5ErkJggg=="}/>
                </button>
              </div>

              <div>
                <button className={""} onClick={onClickToOpenTelegramService}>
                  <img alt={"telegram"} className="w-[50%]" src={`assets/${environment.assetPrefix}/icon-34cdd0f9.png`}/>
                </button>
              </div>
            </div>
          ): isShowToolbox ? (
            <div className={"fixed right-[0px] bottom-[68px] text-white w-[100px] flex flex-col p-[10px] z-20"}>
              <FixedToolContainer className={"flex flex-col justify-center items-center px2 py-3 mb-4"}>
                <div className={"text-xs font-light"}>Download</div>

                <button
                  onClick={() => {
                    setOpenDownloadModal(!openDownloadModal);
                  }}>
                  <img alt={"telegram"} className="w-[40px]" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAYAAACqNJiGAAAAAXNSR0IArs4c6QAADrhJREFUeNrlnQtYVGUax79znQuZptlle8rdtjW37X7ZbtvmY5utm2ubaChoqSRiaGaCVlqhpuWVMkxTEcFCRRiCUVOJLoqGlEGoIwxykZlhhoEZBpkBTXH2f3BGhgEMmGEO4Hme38MDyHDmx/t+1/d8EiLSFRlJ2Pxj5OHiAjJVW0aiNKeJslxH5ZSdpgxaHVWvr6DOGyqpizp8LMXnRWWUoaScylFrKKUa/z7vFJl6BD8vvA65Gq68n8kQXTGJMGhIhlFH2VTHKHNaKilctZIcmfEaSR8xgqTcey9JGDiQxErlZBNNkw3CR+Hze/D14fh+yAySvnQVdWR7KlWYdZwyq/WU7YSWysgppSO+w+v3KmGHDpEb9BBm1JA8TRFlS95OVKHTyP5bbiFx+PYGT7kZrzMJr7cpkVL9XELbftVReUc1dIQCv7fHSjv+C7mv4jSJN5aRul0Koh43ligZhmz0hrC2EF5/VABRxqZS6l90dN1PWjp+73FyX4+RdiKX/K2ilCi0RcQWHUWyvRVhHeUm/N6Fn1DZh0pp248aRrEX99VtpR08SK6DtLX6EmL7eAXJ6tePbBZDmjt9cR8LVlNZmRradlBLr/0S99mtxBXnkzHmclKuQHt2220kvjtIa9E24r4+SaJVh410+Z5CZozo0jJTSR9EWlyRilj8R5O07ijNneH+VNoeNW35RsvExeD+RRFXkEeGmHREpVSQggH9SWxPEOek3wASuyaVLvjOyKqSCnw8vClWkWcrtcS88F1yoCdJcyc0kjrwTQVjVqjJsz4Rp1GTQF0JsQZg6NGTxV1O4wBKuVvLWL8qZQK7VFxpPgkuO0Vqhz5NdvYGcU4eGkp2flXG1CYXM8FdIw4RJ4h77O9kR28S5+Tux8gOBQQmejsC1WjjtCWUtbdFnDsPIAKTtaw1Qc16pw3MQ6+q11Lm3tLG/R7D0AamGFlzrKe9cCrGQYZyonqvh/eqHeWVhcyB5CpOtSzTg3FgGQbAKRjHXU3inCxSsgUJ5Vxcp8TlY8qVf5Ky9O9hA2Bv0QcD6ZhTrGVzcQencsIkv7yc0o/uIVOuruJJTOW2VbH6DzuymFCM1ZHtO4jqahbn5C0Fq4rVc2vbJS4X617FpZRNjNWRvn1IzI5tRKUpo85WGKkGPdABLSjUUucSUqj8/gN824xcDw+b9Zxt9Yl2rAeWlBHF8pUkS4y/8vYEcqKykrJXAD3QAQ04XUXZS6poexFISKPUvr6vyR8zWTEVvOKK4n7B0nl+MWUTayGz9DR2zRzStI3SaHspKAangNpE21UV9AWa8e19+cHHei1nW3Wca3tJ/5SGxK/4mGSL1b5oK6gLgrQyRJqrtEJQAHEnwQkg9yObfB590Wz255VcfKvi9mG3qUhL1d0s0p6DwGnIc01Rd2nHwa8mRhR518HL+kquLrK1Xbn8UhKxPcX37YkrxUjJIpcUzRfS1CEtD9JywS9mceQJhO/m1NF6NqKFvELsd/qLPH8tNNIX1FWXpJ10SDsGYUK05YCjEPeTiPIeG0cpo6v4vGbihJ32PHQUXb2v+nuchDxnih5zpGiOI9oEadngRxHloaPaGKXjbZF5fNOiwTGUKmzZQYk+KD4Gee4p+rNDWhY4DDKrGbtUJHkCYQpOtVovaUpdodZDKFkQW15uJX0h1y1Fjzii7RCkHaxm7T8AMeUNDWP2r66SZFyuVjppoG1i9rJOjlYyF466pejh6kvRdgDSvgffiiyvHzxFmXnbUKE6KxNlWpmoNuoO88hsyGueomyjtB8c0jLAfou48gQWFvLmyHzuYZJVQIdsTaMKu4O8w1XMhaYUZRqlfeeQlg72QdzX3UBe2Ndc4aLTXAjJ0dJRkah36w7yMiHvoFuKfuOItr1gD9hl4UTrbZ2MWcMeWVopiSJHUWk5eQaV7usbCHqNSg9fTmWFr6Cy5qxgsj6Ip/NcpTlT1Bltu4ES4lJrOPv8RPZE8Eoma4qDUbOZDKEQ0lf3/vTrTPoHRl5Jcgx0zjBUXPpUHP5YWY4OIdPc1IteTlE3absc0r4CySAJJILtZzh7AvjiDG8fs4D53lf3f9dIKmVJtSSHZGtpwxCUrPpS3tgQat8hc/N2rfUUZe1plkvSFK7Sai5J+xLStoI4MGoe862v7v8P99MJiyqlBvKTnqnvP9D3+xQrk+iTbbVrrima4oi2nWAH2FbTXFoseHsvd4r4MG394GuhWVJPjlYx54WiaV/L4yRkU8xhRts8RbkW0ppHG9+YovFgC9hcy9uX5nAG9L4xPr13+FpUKz1PjpqYi75sbF0ZcBPZ8mU+U+3sRdNqWk/RbY52batDmhBtMRAXVcLVXP8nEYop4WuRTXqRZIsUeU4GP0i2JerY+vamqCBtI4g28mcH/4NKFOOehch7X4i8QyK1ec22+EZTqYkm7oJTWlspuglsAJ9Z+IbHJ1C7xLpfvxtI7HyLtJ58r6MNg33c27aGfwTz7Y4z3EV3aUK0bXJE2+dgvVVy8YVI9gcx7/VG9LZvVaG3PVhB5zzl43Fem5Wan7NHW0tRQdq6Won9MxAcz+WKfZ+DMc572yLLIRk6RjlehBlGWw3xOxh2uKboeiFNIS0ahH/PFft656w1Hn2DSY+olChJRjkbFbG6e8xtBYRhxwe5nMEZbWvBp1aJ/b0TnFHeTZ7teO5T7ki4CXNbZTEzdY2S9uqqyv1PUztnRTM/hcfSuXPAm5vp3AkLmYN9+rfvzQvDj2Ul/BlB2idgiYavveEv5Iv2/Czfl8T8E23iqK1czsitfO7zYPgG7udBz1HJ3np/4/bxhTPLpVNJEtbzdqoYr63njZxG7U01sw2tDT0+y+fM17azZ78Dw5ClkLZUx1vvfIZKaq+40HypMaJeZp8DZoNZ4HUQVi9reDCCzfDGe5xeLDVPK8J6nrCSvN/I2AZ6aSV5Sz5rTmljLir0ohOXM4c7sOGyoSNt3FPvsz+EQ9Sb4A2HtBlnZfbXzsrtoWCSQWb1uPTsVhI3u0Z6aSVZuPbo2YzRoZRX9jCSzFzDlSbws7Cc1FVt0X/iuJw3HNE2U4g2CJsOpoGpIBhwfTybyj0wg90/q1qa0VQ+q2EjluC5LG+8gUQL13Cl2cHrO7tO3r/j+Vx3aSHgVTBFiLxzkNfPM3kvpvGqsApZ0+5ZLIq2k8tYr+zbJkBei9nBmaahx+xdXJdVJYxMlhx3pqi7tJfBxHN+HskT9m2nG6S2SQV882Lv1Aoubxh2xD19A1tr+Ib4Nge6vDD0uLhYzZsiT/Km98G7+bxpPngHzANzQTiYU8CbZoNZBVLT62AGCFNLTaEgBEwFwWAymAReKZKZQutkDa4pOhnCXmmUJrcHQdx4D+UNCWKUYRZpXotyiyQdG/GhkvU4KrZAnrs014HuGgw9PgarwUqwHHxkk9qXgg8AVivskeC9Oqn9XfAOeLtOZp8H3HvRmZd60Rbtmmu0TYCwQDDuNz/7S795Ju/FvRJ1SKWsZa3KOlT/JFewdZ72ujFn+Iam2YGkTWkrHNI+BEvAYrAQvO+QNt9NWrhD2uVetL6pF72coudcpckbpQnRJkgbC/w9kOeHXnZ6taxu4q9tnF2QqOfiw9YwHtXnfY7Ic58dCAPdKLDKIW2ZTdJMWmO01V2KtvmN0SazvwXmOqS96SYtzCFtmkNaWyka4CLtRfC/366xM307J2/YOi47pFoW32Zx43pUPm7VsDY/D6ZBq7S8tVFaB1N0gUNco7QOpKhTWmspOgaMbpTmZ38BjLT6nevMe+LhI7hCZptQwF35sIcvDKwiBDW4nZU3LYk73pa0Dx3SrpiidS2ltTdFx51rkuaMNkHaC+evaeSJdGmn2vSnormsV00yxe8WdEej6juunLNd38lq+AGDSPziUr6mKUVbb9dapGhdKykKSe7SmqeoX1OKnnNP0SZpAiMq5dZr7qK/6PCMAu9nSpXMNr6Qb9/pGMJzB/Pw/EGn9yYwsZ+axp1cXCU52yxF65pS1FVahEPabIe0tmYHrika5EjRgHOtp6hTmpCqQsR1RlzjrEUpUU0yy9r3HIZwCU+8xFXx+sfHUh4/AcRjOiTt2xK+I/RrgusAne0cnNz+EpMWbJWXP5/XweNE1uKZq7VFnKXPgKvz2TMp3neQRmoJ0so6d4zIBj0XN3cXe1U+9Thir6RgolneuacehWsunjfdaOJVY/D86dUk7pEl3IHJtXLVqEwPz11ZiUnwOhNvfswL896ewB2BjPLlM3KzfwnvnfNWVhazz36i561DhlG9+oyBm/H+gkwy61idxLvnrKzW8IGrdXztnx+ne+XpFjc+Se8INMpqxxlkXXO+yjINF7wCAu/sZREoRNz4RnHyrjlXxXl9hAhcbuCtj/SSNvB2rNEFIlW7LOLcr4VoA5ebefPzi9ge3Qs/iF41CJ2D19u437si0Qsvs0hU03ZzBX49bCDN436fxThugtVP5bVetaPXFIyDFlfwcQtKJZb7vDCV8wV/xJRrrEZuCcAA+MlMkc7Pc70WnObHLLJI9a98xan6DeqeJzf6DaLjn8EkP8jqpx/b2SlXV13TMXl+1yhZu8AosY38lMuSdpO6EmEh89FoPmucSW5DtK3t8CTfl9dsrHvNr5Io5ukh8TMu+9pbxXmmTY7f+/g6PjvAiLW4arniv+1dj+sO10wsWb9llsbPNUvrAvfw6rsx7aG7+Hle4fWFocfwfVJ1kEVeF1gji3+xmOs55yS7X6HYbZpTIZs7p1qaNwsbxv7YcX8IJQt9vBSRwq7WX/F6/0J7hhmCDUOPvACzLGL4rz34hO7WrhAMb2aiVEGo9ZiFYpmpqDYag3KtYah3e+ANNv32kUzK9ShZlaPmlxGKzFHsKHyU4nPh64Pw/Xtms+lPRHNHRqRLCgNKZeaXrdiYscgyxmM/1b+A711nw7d1CVVGU1Cm9apGGoL90KhQs0w5vUaWg+09Q8gZWT12/89jCf5iSJ38fDA+n4yvY5ko5+VqmXIi/n1AuTzEv0j+8FAR/1eC/wMxhbydzArHyAAAAABJRU5ErkJggg=="}/>
                </button>

              </FixedToolContainer>

              <FixedToolContainer className={"flex flex-col justify-center items-center p-4"}>
                <div className={"text-xs font-lights mb-1"}>Contate-nos</div>

                <div className={"mb-1"}>
                  <button
                    onClick={onClickToOpenTelegramService}>
                    <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-34cdd0f9.png`}/>
                  </button>
                  <div className={"text-xs font-light"}>Serviço</div>
                </div>

                <div className={"mb-1"}>
                  <button
                    onClick={onClickToOpenTelegramManager}>
                    <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-34cdd0f9.png`}/>
                  </button>
                  <div className={"text-xs font-lights"}>Gerente</div>
                </div>
              </FixedToolContainer>
            </div>
          ): null}
        </div>
      </div>

      {isUILoading && (
        <div className={"z-[9999] fixed top-0 left-0 right-0 bottom-0 bg-black flex flex-col justify-center items-center"}>
          <img className={"w-[60px] mb-6"} src={`/assets/${environment.assetPrefix}/logo_catonly.png`}/>
          <ThreeDots height={25} className={'inline-block'} />
        </div>
      )}

    </StyledPage>

  )
}
