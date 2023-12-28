import useBreakpoint from "../../hooks/useBreakpoint";
import {environment} from "../../../../environments/environment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {useEffect} from "react";
import {appSlice} from "../../../reduxStore/appSlice";
import {uiSlice} from "../../../reduxStore/uiSlice";

export type IUseSingletonPageTemplateConfig = {
  showMobileHeader?: boolean;
  showDesktopHeader?: boolean;
  showDesktopMenuDrawer?: boolean;
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;
  showTabbar?: boolean;
}
export const useSingletonPageTemplateConfig = (props: IUseSingletonPageTemplateConfig) => {
  const {isMobile, isDesktop, isTablet} = useBreakpoint();

  // Header
  const isShowMobileHeader = props.showMobileHeader === undefined ? true : props.showMobileHeader;
  const isShowDesktopHeader = props.showDesktopHeader === undefined ? true : props.showDesktopHeader;

  // Footer
  const isShowMobileFooter = props.showMobileFooter === undefined ? true : props.showMobileFooter;
  const isShowDesktopFooter = props.showDesktopFooter === undefined ? true : props.showDesktopFooter;

  // Tab Bar
  const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;
  const isShowMobileTabbar = props.showTabbar === undefined ? true : props.showTabbar;

  // NOTICE:
  const isShowDesktopMenuDrawer = props.showDesktopMenuDrawer === undefined ? true : props.showDesktopMenuDrawer;
  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);

  // const showDesktopMenuDrawerFlag = isMobile ? openMenuDrawer : environment.app && environment.app.isDesktopShowMenuDrawer && isDesktop;
  const showDesktopMenuDrawerFlag = openMenuDrawer;

  const dispatch = useDispatch();
  useEffect(() => {
    if(isMobile || isTablet) {
      dispatch(uiSlice.actions.setOpenMenuDrawer(false));
    } else {
      dispatch(uiSlice.actions.setOpenMenuDrawer(true));
    }
  }, [isMobile, isDesktop, isTablet])

  // NOTICE: refactor me
  const isPlatformShowTabBarFlag = environment.assetPrefix === "riojungle777bet" && (isMobile || isTablet);

  return {
    isShowMobileHeader: isShowMobileHeader && isMobile,
    isShowDesktopHeader: isShowDesktopHeader && !isMobile,
    // isShowDesktopMenuDrawer: isShowDesktopMenuDrawer && showDesktopMenuDrawerFlag && openMenuDrawer,
    isShowDesktopMenuDrawer: showDesktopMenuDrawerFlag,

    isShowMobileFooter: isShowMobileFooter && isMobile,
    isShowDesktopFooter: isShowDesktopFooter && !isMobile,
    //NOTE: refactor
    isShowTabbar: isShowTabbar && isPlatformShowTabBarFlag,
  }
}
