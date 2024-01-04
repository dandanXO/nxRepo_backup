import useBreakpoint from "./useBreakpoint";
import {environment} from "../../../../environments/environment";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {useEffect, useState} from "react";
import {appSlice} from "../../../reduxStore/appSlice";
import {uiSlice} from "../../../reduxStore/uiSlice";
import {useLocation} from "react-router";

type IDevices = {
  mobile: boolean;
  mobileOverChildren?: boolean;
  tablet: boolean;
  tabletOverChildren?: boolean;
  desktop: boolean;
  desktopOverChildren?: boolean;
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
  // console.log("useSingletonPageTemplateConfig.props:", props);
  const {isMobile, isDesktop, isTablet} = useBreakpoint();
  const devices = useBreakpoint();
  // console.log("useSingletonPageTemplateConfig.devices", devices);

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

  const isShowMobileDynamicMenuDrawerFlag = openMenuDrawer;
  const isShowTabletDynamicMenuDrawerFlag = openMenuDrawer;
  const isShowDesktopDynamicMenuDrawerFlag = openMenuDrawer;

  const dispatch = useDispatch();
  const [preDevice, setPreDevice] = useState<"mobile" | "tablet" | "desktop">()

  const location = useLocation();
  const [preLocation, setPrelocation] = useState(location.pathname);

  useEffect(() => {
    if((preDevice !== "mobile" || location.pathname !== preLocation) && isMobile) {
      if(isShowMobileMenuDrawer) {
        dispatch(uiSlice.actions.setOpenMenuDrawer(true));
      } else {
        dispatch(uiSlice.actions.setOpenMenuDrawer(isShowMobileMenuDrawer));
      }
    }
    if((preDevice !== "tablet" || location.pathname !== preLocation) && isTablet) {
      if(isShowTabletMenuDrawer) {
        dispatch(uiSlice.actions.setOpenMenuDrawer(true));
      } else {
        dispatch(uiSlice.actions.setOpenMenuDrawer(isShowTabletMenuDrawer));
      }
    }
    if((preDevice !== "desktop" || location.pathname !== preLocation)&& isDesktop) {
      if(isShowDesktopMenuDrawer) {
        dispatch(uiSlice.actions.setOpenMenuDrawer(true));
      } else {
        dispatch(uiSlice.actions.setOpenMenuDrawer(isShowDesktopMenuDrawer));
      }
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
    setPrelocation(location.pathname)

  }, [location.pathname, openMenuDrawer, isMobile, isTablet, isDesktop, isShowMobileMenuDrawer, isShowTabletMenuDrawer, isShowDesktopMenuDrawer])

  const output = {
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

    mobileOverChildren: props.menuDrawer.mobileOverChildren === undefined ? true : props.menuDrawer.mobileOverChildren,
    tabletOverChildren: props.menuDrawer.tabletOverChildren === undefined ? true : props.menuDrawer.tabletOverChildren,
    desktopOverChildren: props.menuDrawer.desktopOverChildren === undefined ? true : props.menuDrawer.desktopOverChildren,

    // NOTE: TabBar
    isShowTabbar: isShowTabbar,

    isShowMobileTabBar: isShowMobileTabBar && isMobile,
    isShowTabletTabBar: isShowTabletTabBar && isTablet,
    isShowDesktopTabBar: isShowDesktopTabBar && isDesktop,
  }

  // console.log("output", output);
  return output;
}
