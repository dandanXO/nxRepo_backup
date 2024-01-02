import useBreakpoint from "../../hooks/useBreakpoint";
import {environment} from "../../../../environments/environment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {useEffect, useState} from "react";
import {appSlice} from "../../../reduxStore/appSlice";
import {uiSlice} from "../../../reduxStore/uiSlice";

type IDevices = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export type IUseSingletonPageTemplateConfig = {
  // NOTICE: deprecated
  showMenuDrawer?: boolean;
  // NOTICE: deprecated
  showTabbar?: boolean;

  // NOTE: new
  header: IDevices;
  footer: IDevices;
  tabBar: IDevices;
  menuDrawer: IDevices;
}
export const useSingletonPageTemplateConfig = (props: IUseSingletonPageTemplateConfig) => {
  const {isMobile, isDesktop, isTablet} = useBreakpoint();
  const devices = useBreakpoint();

  // Header
  const isShowMobileHeader = props.header.mobile === undefined ? false : props.header.mobile;
  const isShowTabletHeader = props.header.tablet === undefined ? false : props.header.tablet;
  const isShowDesktopHeader = props.header.desktop === undefined ? false : props.header.desktop;


  // Footer
  const isShowMobileFooter = props.footer.mobile === undefined ? false : props.footer.mobile;
  const isShowTabletFooter = props.footer.tablet === undefined ? false : props.footer.tablet;
  const isShowDesktopFooter = props.footer.desktop === undefined ? false : props.footer.desktop;

  // Tab Bar
  const isShowMobileTabBar = props.tabBar.mobile === undefined ? false : props.tabBar.mobile;
  const isShowTabletTabBar = props.tabBar.tablet === undefined ? false : props.tabBar.tablet;
  const isShowDesktopTabBar = props.tabBar.desktop === undefined ? false : props.tabBar.desktop;


  // Deprecated
  const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;

  // NOTICE: MenuDrawer
  // const isShowStaticMenuDrawer = props.showMenuDrawer === undefined ? false : props.showMenuDrawer;
  const isShowMobileMenuDrawer = props.menuDrawer.mobile === undefined ? false : props.menuDrawer.mobile;
  const isShowTabletMenuDrawer = props.menuDrawer.tablet === undefined ? false : props.menuDrawer.tablet;
  const isShowDesktopMenuDrawer = props.menuDrawer.desktop === undefined ? false : props.menuDrawer.desktop;

  //NOTICE: MenuDrawer
  const {openMenuDrawer} = useSelector((state: RootState) => state.ui);
  // const isShowDynamicMenuDrawerFlag = isShowStaticMenuDrawer && openMenuDrawer;
  const isShowMobileDynamicMenuDrawerFlag = isShowMobileMenuDrawer || openMenuDrawer;
  const isShowTabletDynamicMenuDrawerFlag = isShowTabletMenuDrawer || openMenuDrawer;
  const isShowDesktopDynamicMenuDrawerFlag = isShowDesktopMenuDrawer || openMenuDrawer;

  const dispatch = useDispatch();
  const [preDevice, setPreDevice] = useState<"mobile" | "tablet" | "desktop">()

  useEffect(() => {

    if(preDevice !== "mobile" && isMobile) {
      dispatch(uiSlice.actions.setOpenMenuDrawer(isShowMobileMenuDrawer));
    }

    if(preDevice !== "tablet" && isTablet) {
      dispatch(uiSlice.actions.setOpenMenuDrawer(isShowTabletMenuDrawer));
    }

    if(preDevice !== "desktop" && isDesktop) {
      dispatch(uiSlice.actions.setOpenMenuDrawer(isShowDesktopMenuDrawer));
    }

    if(isMobile) {
      setPreDevice("mobile");
    }
    if(isTablet) {
      setPreDevice("tablet");
    }
    if(isDesktop) {
      setPreDevice("desktop");
    }

  }, [isMobile, isTablet, isDesktop, isShowMobileDynamicMenuDrawerFlag, isShowTabletDynamicMenuDrawerFlag, isShowDesktopDynamicMenuDrawerFlag])

  // NOTICE: refactor me
  const isU2 = environment.assetPrefix === "riojungle777bet";
  const isPlatformShowTabBarFlag = isU2 && (isMobile || isTablet);

  return {
    // NOTE: Header
    isShowMobileHeader: isShowMobileHeader && isMobile,
    isShowTabletHeader: isShowTabletHeader && isTablet,
    isShowDesktopHeader: isShowDesktopHeader && isDesktop,

    // NOTE: Footer
    isShowMobileFooter: isShowMobileFooter && isMobile,
    isShowTabletFooter: isShowTabletFooter && isTablet,
    isShowDesktopFooter: isShowDesktopFooter && isDesktop,

    // NOTE: MenuDrawer
    // isShowDesktopMenuDrawer: isShowDynamicMenuDrawerFlag,
    isShowMobileMenuDrawer: isShowMobileDynamicMenuDrawerFlag && isMobile,
    isShowTabletMenuDrawer: isShowTabletDynamicMenuDrawerFlag && isTablet,
    isShowDesktopMenuDrawer: isShowDesktopDynamicMenuDrawerFlag && isDesktop,

    // NOTE: TabBar
    isShowTabbar: isShowTabbar && isPlatformShowTabBarFlag,

    isShowMobileTabBar: isShowMobileTabBar && isMobile,
    isShowTabletTabBar: isShowTabletTabBar && isTablet,
    isShowDesktopTabBar: isShowDesktopTabBar && isDesktop,

  }
}
