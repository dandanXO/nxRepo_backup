import {environment} from "../../../../../../environments/environment";
import {RootState} from "../../../../../reduxStore";
import {useDispatch, useSelector} from "react-redux";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import cx from "classnames";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {useLocation, useNavigate} from "react-router";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {AssetMappingCoco} from "../../../../../../assets/assetMapping.coco";

export type IFooter = {
  isShowHome?: boolean;
  isShowSlot?: boolean;
  isShowInvite?: boolean;
  isShowVIP?: boolean;
  isShowProfile?: boolean;
  size?: "big" | "small"
}

export const TabBar = (props: IFooter) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLogin} = useSelector((state: RootState) => state.app)
  const showHome = props.isShowHome === undefined ? true : props.isShowHome;
  const showSlot = props.isShowSlot === undefined ? true : props.isShowSlot;
  const showInvite = props.isShowInvite === undefined ? true : props.isShowInvite;
  const showVIP = props.isShowVIP === undefined ? true : props.isShowVIP;
  const showProfile = props.isShowProfile === undefined ? true : props.isShowProfile;
  const size = props.size == undefined ? "small" : props.size;

  // const iconSize = size === "big" ? "w-[40px] h-[40px]" : "w-[27px] h-[27px]";
  // const iconSize = size === "big" ? "w-[34px] h-[34px]" : "w-[27px] h-[27px]";
  const iconSize = "w-[24px] h-[24px]";

  const {
    onClickToIndex,
    onClickToSlot,
    onClickToInvite,
    onClickToVipGrade,
    onClickToProfile,
  } = usePageNavigate();
  return (
    <footer
      className={cx("fixed bottom-0 flex flex-row justify-between h-[60px] z-10 w-full",
        "bg-gradient-to-t from-[var(--tab-primary-from)] to-[var(--tab-primary-to)]",
        "border-t-[1px] border-[var(--tab-border-top)]",
        {
          "p-2": size === "small",
        })}
    >
      {showHome && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center", {
            "font-bold": location.pathname === PageOrModalPathEnum.IndexPage ||
              location.pathname === PageOrModalPathEnum.GameSearchPage
          })}
          onClick={() => {
            onClickToIndex();
          }}
        >
          {(
            location.pathname === PageOrModalPathEnum.IndexPage ||
            location.pathname === PageOrModalPathEnum.GameSearchPage
          ) ? (
            <img className={cx(iconSize)} src={AssetMappingCoco.tab.home}/>
          ): (
            <img className={cx(iconSize, "opacity-50")} src={AssetMappingCoco.tab.home}/>
          )}
          <span className={cx("text-sm text-[var(--tab-text-color-normal)]", {
            "text-[var(--tab-text-color-active)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })}>Jogos</span>
        </section>
      )}

      {showSlot && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center", {
            "font-bold": location.pathname === PageOrModalPathEnum.IndexSlotPage
          })}
          onClick={() => {
             onClickToSlot();
          }}
        >
          {location.pathname === PageOrModalPathEnum.IndexSlotPage  ? (
            <img className={iconSize} src={AssetMappingCoco.tab.home}/>
          ): (
            <img className={cx(iconSize, "opacity-50")} src={AssetMappingCoco.tab.home}/>
          )}
          <span className={cx("text-sm text-[var(--tab-text-color-normal)]", {
            "text-[var(--tab-text-color-active)]": location.pathname === PageOrModalPathEnum.IndexSlotPage,
          })}>Casino</span>
        </section>
      )}

      {showInvite && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center", {
            "font-bold": location.pathname === PageOrModalPathEnum.InvitePage
          })}
          onClick={() => {
            onClickToInvite();
          }}
        >
          {location.pathname === PageOrModalPathEnum.InvitePage  ? (
            <img className={iconSize} src={AssetMappingCoco.tab.invite}/>
          ): (
            <img className={cx(iconSize, "opacity-50")} src={AssetMappingCoco.tab.invite}/>
          )}
          <span className={cx("text-sm text-[var(--tab-text-color-normal)]", {
            "text-[var(--tab-text-color-active)]": location.pathname === PageOrModalPathEnum.InvitePage,
          })}>Convidar</span>
        </section>
      )}

      {showVIP && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center", {
            "font-bold": location.pathname === PageOrModalPathEnum.VIPGradePage
          })}
          onClick={() => {
            onClickToVipGrade();
          }}
        >
          {location.pathname === PageOrModalPathEnum.VIPGradePage  ? (
            <img className={iconSize} src={AssetMappingCoco.tab.vip}/>
          ): (
            <img className={cx(iconSize, "opacity-50")} src={AssetMappingCoco.tab.vip}/>
          )}
          <span className={cx("text-sm text-[var(--tab-text-color-normal)]", {
            "text-[var(--tab-text-color-active)]": location.pathname === PageOrModalPathEnum.VIPGradePage,
          })}>VIP</span>
        </section>
      )}


      {showProfile && (
        <section
          className={cx("flex-1 flex flex-col items-center justify-center", {
            "font-bold": location.pathname === PageOrModalPathEnum.MyPage
          })}
          onClick={() => {
            onClickToProfile();
           }}
        >
          {location.pathname === PageOrModalPathEnum.MyPage  ? (
            <img className={iconSize} src={AssetMappingCoco.tab.account}/>
          ): (
            <img className={cx(iconSize, "opacity-50")}src={AssetMappingCoco.tab.account}/>
          )}
          <span className={cx("text-sm text-[var(--tab-text-color-normal)]", {
            "text-[var(--tab-text-color-active)]": location.pathname === PageOrModalPathEnum.MyPage,
          })}>Minha</span>
        </section>
      )}

    </footer>
  )

}
