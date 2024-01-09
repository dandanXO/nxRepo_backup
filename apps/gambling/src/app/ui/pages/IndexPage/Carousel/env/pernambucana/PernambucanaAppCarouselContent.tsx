import {appSlice} from "../../../../../../reduxStore/appSlice";
import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../../environments/environment";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisible:true
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisible:true
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisible:true
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items:1,
    partialVisible:true
  }
};

export const PernambucanaAppCarouselContent = () => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      arrows={false}
      responsive={responsive}
      autoPlay={false} // 啟用自動輪播
      autoPlaySpeed={3000} // 自動輪播速度（毫秒）
      infinite={true} // 啟用無限循環
      // removeArrowOnDeviceType={[]} // 在所有设备上都移除箭头
      // ssr={true} // means to render carousel on server-side.
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      customTransition="transform 1s ease-in-out"
      keyBoardControl={true}
      // transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      // deviceType={"mobile"}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {isMobile ? (
        <div onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.InitialChargePage)
          }
        }}>
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-3xl text-left" style={{
            WebkitTextStroke: '1px black',
            WebkitTextFillColor: 'white'
          }}>
            Primeiro depósito <br/> bônus de 20%
          </p>
          <img
            src={`assets/${environment.uVersion}/h5_banner_1.png`}
          />
        </div>
      ) : (
        <div className="" onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.InitialChargePage)
          }}} style={{ display: 'flex',justifyContent: 'center' }}>
          <p className="absolute top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left" style={{
            WebkitTextStroke: '3px black',
            WebkitTextFillColor: 'white'
          }}>
            Primeiro depósito <br/> bônus de 20%
          </p>
          <img src={`assets/${environment.uVersion}/banner1.png`} className="rounded-box" style={{ display: 'block', borderRadius: '10px' }}/>
        </div>
      )}

      {/*{isMobile ? (*/}
      {/*  <div onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.InitialChargePage)*/}
      {/*    }*/}
      {/*  }}>*/}
      {/*    <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-3xl text-left" style={{*/}
      {/*      WebkitTextStroke: '1px black',*/}
      {/*      WebkitTextFillColor: 'white'*/}
      {/*    }}>*/}
      {/*      Primeiro depósito <br/> bônus de 20%*/}
      {/*    </p>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/h501.png`} style={{height: '141px',width: '390px'}}/>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className="mr-4 mr-14" onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.InitialChargePage)*/}
      {/*    }}} style={{ display: 'flex',justifyContent: 'center' }}>*/}
      {/*    <p className="absolute top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left" style={{*/}
      {/*      WebkitTextStroke: '3px black',*/}
      {/*      WebkitTextFillColor: 'white'*/}
      {/*    }}>*/}
      {/*      Primeiro depósito <br/> bônus de 20%*/}
      {/*    </p>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/web01.png`} className="rounded-box" style={{ display: 'block' }}/>*/}
      {/*  </div>*/}
      {/*)}*/}


      {isMobile ? (
        <div onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.RechargeActivityPage)
          }
        }}>
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-3xl text-left" style={{
            WebkitTextStroke: '1px black',
            WebkitTextFillColor: 'white'
          }}>
            Benefícios-ofertasde deposito<br/>Ate 10% bônus
          </p>
          <img src={`assets/${environment.uVersion}/h5_banner_2.png`}/>
        </div>
      ) : (
        <div className={""} onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.RechargeActivityPage)
          }}}  style={{ display: 'flex',justifyContent: 'center' }}>
          <p className="absolute left-28 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left" style={{
            WebkitTextStroke: '2.5px black',
            WebkitTextFillColor: 'white'
          }}>
            Benefícios-ofertasde deposito<br/>Ate 10% bônus
          </p>
          <img src={`assets/${environment.uVersion}/banner3.png`} className="rounded-box" style={{ display: 'block',borderRadius: '10px' }}/>
        </div>
      )}

      {/*{isMobile ? (*/}
      {/*  <div onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.RechargeActivityPage)*/}
      {/*    }*/}
      {/*  }}>*/}
      {/*    <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-3xl text-left" style={{*/}
      {/*      WebkitTextStroke: '1px black',*/}
      {/*      WebkitTextFillColor: 'white'*/}
      {/*    }}>*/}
      {/*      Benefícios-ofertasde deposito<br/>Ate 10% bônus*/}
      {/*    </p>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/h502.png`} style={{height: '141px',width: '390px'}}/>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className={"mr-4 mr-14"} onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.RechargeActivityPage)*/}
      {/*    }}}  style={{ display: 'flex',justifyContent: 'center' }}>*/}
      {/*    <p className="absolute left-28 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left" style={{*/}
      {/*      WebkitTextStroke: '2.5px black',*/}
      {/*      WebkitTextFillColor: 'white'*/}
      {/*    }}>*/}
      {/*      Benefícios-ofertasde deposito<br/>Ate 10% bônus*/}
      {/*    </p>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/web02.png`} className="rounded-box"  style={{ display: 'block' }}/>*/}
      {/*  </div>*/}
      {/*)}*/}




      {isMobile ? (
        <div onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.VIPGradePage)
          }
        }}>
          <img src={`assets/${environment.uVersion}/h5_banner_4.png`}/>
        </div>
      ) : (
        <div className={''} onClick={() => {
          navigate(PageOrModalPathEnum.VIPGradePage);
        }}>
          <img src={`assets/${environment.uVersion}/banner2.png`} className="rounded-box" style={{ display: 'block', borderRadius: '10px' }}/>
        </div>
      )}

      {/*{isMobile ? (*/}
      {/*  <div onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.VIPGradePage)*/}
      {/*    }*/}
      {/*  }}>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/h5VIP01.png`} style={{height: '141px',width: '390px'}}/>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className={'mr-14 mr-14'} onClick={() => {*/}
      {/*    navigate(PageOrModalPathEnum.VIPGradePage);*/}
      {/*  }}>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/VIP01.png`} className="rounded-box"  style={{ display: 'block' }}/>*/}
      {/*  </div>*/}
      {/*)}*/}


      {isMobile ? (
        <div onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.DailySignInPage)
          }
        }}>
          <img src={`assets/${environment.uVersion}/h5_banner_5.png`}/>
        </div>
      ) : (
        <div className={''} onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.DailySignInPage)
          }
        }}>
          <img src={`assets/${environment.uVersion}/banner5.png`} className="rounded-box" style={{ display: 'block',borderRadius: '10px' }}/>
        </div>
      )}

      {/*{isMobile ? (*/}
      {/*  <div onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.VIPGradePage)*/}
      {/*    }*/}
      {/*  }}>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/h503.png`} style={{height: '141px',width: '390px'}}/>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className={'mr-14 mr-14'} onClick={() => {*/}
      {/*    navigate(PageOrModalPathEnum.VIPGradePage);*/}
      {/*  }}>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/web03.png`} className="rounded-box"  style={{ display: 'block' }}/>*/}
      {/*  </div>*/}
      {/*)}*/}



      {isMobile ? (
        <div onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.InvitePage)
          }
        }}>
          <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-white text-2xl text-left" style={{
            WebkitTextStroke: '1px black',
            WebkitTextFillColor: 'white'
          }}>
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img src={`assets/${environment.uVersion}/h5_banner_3.png`}/>
        </div>
      ) : (
        <div className={""} onClick={() => {
          if(!isLogin) {
            dispatch(appSlice.actions.showLoginDrawerOrModal(true))
          } else {
            navigate(PageOrModalPathEnum.InvitePage)
          }
        }}>
          <p className="absolute left-28 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left" style={{
            WebkitTextStroke: '2.5px black',
            WebkitTextFillColor: 'white'
          }}>
            <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>
          </p>
          <img src={`assets/${environment.uVersion}/banner4.png`} className="rounded-box" style={{ display: 'block',borderRadius: '10px' }}/>
        </div>
      )}

      {/*{isMobile ? (*/}
      {/*  <div onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.InvitePage)*/}
      {/*    }*/}
      {/*  }}>*/}
      {/*    <p className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-white text-2xl text-left" style={{*/}
      {/*      WebkitTextStroke: '1px black',*/}
      {/*      WebkitTextFillColor: 'white'*/}
      {/*    }}>*/}
      {/*      <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$20</span>*/}
      {/*    </p>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/h504.png`} style={{height: '141px',width: '390px'}}/>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className={"mr-4 mr-14"} onClick={() => {*/}
      {/*    if(!isLogin) {*/}
      {/*      dispatch(appSlice.actions.showLoginDrawerOrModal(true))*/}
      {/*    } else {*/}
      {/*      navigate(PageOrModalPathEnum.InvitePage)*/}
      {/*    }*/}
      {/*  }}>*/}
      {/*    <p className="absolute left-28 top-1/2 transform -translate-y-1/2 pl-4 italic font-bold text-6xl text-left" style={{*/}
      {/*      WebkitTextStroke: '2.5px black',*/}
      {/*      WebkitTextFillColor: 'white'*/}
      {/*    }}>*/}
      {/*      <span>Convide Amigos A maior recompensa para<br/>uma pessoa é R$25</span>*/}
      {/*    </p>*/}
      {/*    <img src={`assets/${environment.assetPrefix}/web04.png`} className="rounded-box"  style={{ display: 'block' }}/>*/}
      {/*  </div>*/}
      {/*)}*/}
    </Carousel>
  )
}
