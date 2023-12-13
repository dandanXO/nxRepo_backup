import useBreakpoint from "../../../hooks/useBreakpoint";

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

  const isShowMobileHeader = props.showMobileHeader === undefined ? true : props.showMobileHeader;
  const isShowDesktopHeader = props.showDesktopHeader === undefined ? true : props.showDesktopHeader;

  const isShowDesktopMenuDrawer = props.showDesktopMenuDrawer === undefined ? true : props.showDesktopMenuDrawer;

  const isShowMobileFooter = props.showMobileFooter === undefined ? true : props.showMobileFooter;
  const isShowDesktopFooter = props.showDesktopFooter === undefined ? true : props.showDesktopFooter;

  const isShowTabbar = props.showTabbar === undefined ? true : props.showTabbar;

  return {
    isShowMobileHeader: isShowMobileHeader && isMobile,
    isShowDesktopHeader: isShowDesktopHeader && !isMobile,
    isShowDesktopMenuDrawer: isShowDesktopMenuDrawer && !isMobile,
    isShowMobileFooter: isShowMobileFooter && isMobile,
    isShowDesktopFooter: isShowDesktopFooter && !isMobile,
    isShowTabbar: isShowTabbar && isMobile,
  }
}
