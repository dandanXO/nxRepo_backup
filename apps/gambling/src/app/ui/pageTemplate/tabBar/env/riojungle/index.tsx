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
  const iconSize = "w-[24px] h-[24px]";
  // console.log("isShowMenuDrawer", props.isShowMenuDrawer);
  const {
    onClickToIndex,
    onClickToInvite,
    onClickToVipGrade,
    onClickToProfile,
  } = usePageNavigate();

  const isActive = (active: boolean) => active ? "#9c6aef" : "#b3b3b3";
  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);
  const { messageCount } = useSelector((state: RootState) => state.app);
  return (
    <footer
      className={twMerge(
        "h-[72px] w-full",
        "bg-[#333333]",
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
        <MenuSVGIcon/>
        <div
          className={twMerge("text-sm font-medium leading-5",
            "text-[#b3b3b3]",
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
          <ThumbsUPSVGIcon color={isActive(location.pathname === PageOrModalPathEnum.InvitePage)}/>
          <div
            className={twMerge("text-sm font-medium leading-5",
              location.pathname === PageOrModalPathEnum.InvitePage && "text-[var(--primary-hover)]",
              location.pathname !== PageOrModalPathEnum.InvitePage && "text-[#b3b3b3]",
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

          <div className="absolute top-[-35px] bg-[#333333] flex flex-row items-start pt-1 px-1 rounded-[100px]">
            <div className="shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[linear-gradient(145deg,_var(--primary-main)_-7%,#10b98f_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row justify-center mb-1 pt-4 w-16 h-16 items-start rounded-[100px]">
              <GameControllerSVGIcon/>
            </div>
          </div>


          <div
            className={twMerge("text-sm font-medium leading-5",
              (location.pathname === PageOrModalPathEnum.IndexPage ||
              location.pathname === PageOrModalPathEnum.GameSearchPage) && "text-[var(--primary-hover)]",
              !(location.pathname === PageOrModalPathEnum.IndexPage ||
                location.pathname === PageOrModalPathEnum.GameSearchPage)  && "text-[#b3b3b3]",
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
          <CrownSVGIcon color={isActive(location.pathname === PageOrModalPathEnum.VIPGradePage)}/>

          <div
            className={twMerge("text-sm font-medium leading-5",
              location.pathname === PageOrModalPathEnum.VIPGradePage && "text-[var(--primary-hover)]",
              location.pathname !== PageOrModalPathEnum.VIPGradePage && "text-[#b3b3b3]",
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
            <UserSVGIcon color={isActive(location.pathname === PageOrModalPathEnum.MyPage)}/>
            {messageCount > 0 && (
              <div className="absolute top-[-10px] right-[-10px] text-xs leading-[16px] text-white bg-[var(--state-error-main)] flex flex-row mb-4 w-5 h-5 justify-center items-center rounded-[100px]">
                {messageCount}
              </div>
            )}
          </div>

          <div
            className={twMerge("text-sm font-medium leading-5",
              location.pathname === PageOrModalPathEnum.MyPage && "text-[var(--primary-hover)]",
              location.pathname !== PageOrModalPathEnum.MyPage && "text-[#b3b3b3]",
            )}
          >
            Minha
          </div>
        </section>

      )}


    </footer>
  )

}
