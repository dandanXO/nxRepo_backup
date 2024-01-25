import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import cx from "classnames";
import {useLocation} from "react-router";
import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import {ITabBar} from "../../type";
import {uiSlice} from "../../../../../reduxStore/uiSlice";
import {useDispatch, useSelector} from "react-redux";
import {twMerge} from "tailwind-merge";

import {MenuSVGIcon} from "./MenuSVGIcon";
import {ThumbsUPSVGIcon} from "./ThumbsUPSVGIcon";
import {CrownSVGIcon} from "./CrownSVGIcon";
import {UserSVGIcon} from "./UserSVGIcon";
import {GameControllerSVGIcon} from "./GameControllerSVGIcon";
import {RootState} from "../../../../../reduxStore";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {AssetMappingCoco} from "../../../../../../assets/assetMapping.coco";
import {environment} from "../../../../../../environments/environment";


export const TabBar = (props: ITabBar) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const showHome = props.isShowHome === undefined ? true : props.isShowHome;
  const showInvite = props.isShowInvite === undefined ? true : props.isShowInvite;
  const showVIP = props.isShowVIP === undefined ? true : props.isShowVIP;
  const showProfile = props.isShowProfile === undefined ? true : props.isShowProfile;
  const size = props.size == undefined ? "small" : props.size;

  // const iconSize = size === "big" ? "w-[40px] h-[40px]" : "w-[27px] h-[27px]";
  // const iconSize = size === "big" ? "w-[34px] h-[34px]" : "w-[27px] h-[27px]";
  const iconSize = "w-[28px] h-[28px]";
  // console.log("isShowMenuDrawer", props.isShowMenuDrawer);
  const {
    onClickToIndex,
    onClickToInvite,
    onClickToVipGrade,
    onClickToProfile,
  } = usePageNavigate();

  const isActive = (active: boolean) => active ? "#9c6aef" : "#b3b3b3";
  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);
  const {messageCount} = useSelector((state: RootState) => state.app);

  const {isMobile} = useBreakpoint();

  console.log(" ---> openMenuDrawer", openMenuDrawer)

  return (
    <footer
      className={twMerge(
        "h-[72px] w-full",
        "bg-[var(--grayscale-20)]",
        "z-10 fixed bottom-0",
        "flex flex-row justify-between",
        props.className
      )}
    >

      <section
        className={cx("flex-1 flex flex-col items-center justify-center")}
        onClick={() => {
          dispatch(uiSlice.actions.setOpenMenuDrawer(true));
        }}
      >
        <img className={cx(iconSize)}
             src={openMenuDrawer
               ? `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_menu_m_hold.png`
               : `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_menu_m.png`
             }/>
        {/*<MenuSVGIcon size={isMobile ? 28: undefined}/>*/}
        <div
          className={twMerge("text-sm font-medium leading-5",
            "text-[var(--grayscale-70)]",
          )}
        >
          Menu
        </div>
      </section>


      {showInvite && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center")}
          onClick={() => {
            dispatch(uiSlice.actions.setOpenMenuDrawer(false));
            onClickToInvite();
          }}
        >

          <img className={cx(iconSize)} src={
            location.pathname === PageOrModalPathEnum.InvitePage
              ? `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_invite_m_hold.png`
              : `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_invite_m.png`
          }/>
          {/*<ThumbsUPSVGIcon color={isActive(location.pathname === PageOrModalPathEnum.InvitePage)}*/}
          {/*                 size={isMobile ? 28 : undefined}/>*/}
          <div
            className={twMerge("text-sm font-medium leading-5",
              location.pathname === PageOrModalPathEnum.InvitePage && "text-[var(--primary-hover)]",
              location.pathname !== PageOrModalPathEnum.InvitePage && "text-[var(--grayscale-70)]",
            )}
          >
            Convidar
          </div>

        </section>
      )}

      {showHome && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center")}
          onClick={() => {
            dispatch(uiSlice.actions.setOpenMenuDrawer(false));
            onClickToIndex();
          }}
        >

          <div className={"w-[28px] h-[28px]"}/>

          <div
            className="absolute top-[-35px] bg-[var(--grayscale-20)] flex flex-row items-start pt-1 px-1 rounded-[100px]">
            <div
              className="shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[linear-gradient(145deg,_var(--primary-main)_-7%,#10b98f_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center mb-1 pt-4 w-16 h-16 items-start rounded-[100px]">
              {/*<GameControllerSVGIcon size={isMobile ? 28 : undefined}/>*/}
              <img className={cx(iconSize)}
                   src={`assets/${environment.uVersion}/${environment.mVersion}/icon_tab_home_m.png`}/>
            </div>
          </div>


          <div
            className={twMerge("text-sm font-medium leading-5",
              (location.pathname === PageOrModalPathEnum.IndexPage ||
                location.pathname === PageOrModalPathEnum.GameSearchPage) && "text-[var(--primary-hover)]",
              !(location.pathname === PageOrModalPathEnum.IndexPage ||
                location.pathname === PageOrModalPathEnum.GameSearchPage) && "text-[var(--grayscale-70)]",
            )}
          >
            Casino
          </div>

        </section>
      )}

      {showVIP && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center")}
          onClick={() => {
            dispatch(uiSlice.actions.setOpenMenuDrawer(false));
            onClickToVipGrade();
          }}
        >

          <img className={cx(iconSize)} src={
            location.pathname === PageOrModalPathEnum.VIPGradePage
              ? `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_vip_m_hold.png`
              : `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_vip_m.png`
          }/>
          {/*<CrownSVGIcon color={isActive(location.pathname === PageOrModalPathEnum.VIPGradePage)}*/}
          {/*              size={isMobile ? 28 : undefined}/>*/}

          <div
            className={twMerge("text-sm font-medium leading-5",
              location.pathname === PageOrModalPathEnum.VIPGradePage && "text-[var(--primary-hover)]",
              location.pathname !== PageOrModalPathEnum.VIPGradePage && "text-[var(--grayscale-70)]",
            )}
          >
            VIP
          </div>
        </section>
      )}

      {showProfile && (

        <section
          className={cx("flex-1 flex flex-col items-center justify-center")}
          onClick={() => {
            dispatch(uiSlice.actions.setOpenMenuDrawer(false));
            onClickToProfile();
          }}
        >
          <div className="relative">

            <img className={cx(iconSize)} src={
              location.pathname === PageOrModalPathEnum.MyPage
                ? `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_account_m_hold.png`
                : `assets/${environment.uVersion}/${environment.mVersion}/icon_tab_account_m.png`
            }/>

            {/*<UserSVGIcon color={isActive(location.pathname === PageOrModalPathEnum.MyPage)}*/}
            {/*             size={isMobile ? 28 : undefined}/>*/}
            {messageCount > 0 && (
              <div
                className="absolute top-[-10px] right-[-10px] text-xs leading-[16px] text-white bg-[var(--state-error-main)] flex flex-row mb-4 w-5 h-5 justify-center items-center rounded-[100px]">
                {messageCount}
              </div>
            )}
          </div>

          <div
            className={twMerge("text-sm font-medium leading-5",
              location.pathname === PageOrModalPathEnum.MyPage && "text-[var(--primary-hover)]",
              location.pathname !== PageOrModalPathEnum.MyPage && "text-[var(--grayscale-70)]",
            )}
          >
            Minha
          </div>
        </section>

      )}


    </footer>
  )

}
