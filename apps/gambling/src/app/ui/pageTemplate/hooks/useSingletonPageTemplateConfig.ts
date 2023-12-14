import useBreakpoint from "../../hooks/useBreakpoint";
import {environment} from "../../../../environments/environment";

export type IUseSingletonPageTemplateConfig = {
  showMobileHeader?: boolean;
  showDesktopHeader?: boolean;
  showDesktopMenuDrawer?: boolean;
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;
  showTabbar?: boolean;
}
export const useSingletonPageTemplateConfig = (props: IUseSingletonPageTemplateConfig) => {
  const {isMobile} = useBreakpoint();

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
  const showDesktopMenuDrawerFlag = environment.app && environment.app.isDesktopShowMenuDrawer ? !isMobile: isMobile;

  return {
    isShowMobileHeader: isShowMobileHeader && isMobile,
    isShowDesktopHeader: isShowDesktopHeader && !isMobile,
    isShowDesktopMenuDrawer: isShowDesktopMenuDrawer && showDesktopMenuDrawerFlag,

    isShowMobileFooter: isShowMobileFooter && isMobile,
    isShowDesktopFooter: isShowDesktopFooter && !isMobile,
    //NOTE: refactor
    isShowTabbar: isShowTabbar && isMobile,
    isShowMobileTabbar: isShowMobileTabbar && isMobile,
  }
}
