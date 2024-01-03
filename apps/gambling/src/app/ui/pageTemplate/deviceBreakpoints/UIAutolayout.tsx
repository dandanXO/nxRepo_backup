import {appSlice} from "../../../reduxStore/appSlice";
import {appStore} from "../../../reduxStore";
import {tailwindVariables} from "../../../../environments/tailwind.variables";

// import {getDeviceBreakpoints} from "./index";
// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from "../../../../environments/tailwind.config";
// const fullConfig = resolveConfig(tailwindConfig)

const handleResize = () => {
  const windowSize = {
    width: window.innerWidth,
  };

  let isMobile = true;
  let isTablet = false;
  let isDesktop = false;

  // const deviceBreakpoints = environment.template.breakpoints;
  // console.log("deviceBreakpoints", deviceBreakpoints);

  // console.log("fullConfig", fullConfig);
  // const mobilePoint = (fullConfig as any).theme.screens.sm
  // const tabletPoint = (fullConfig as any).theme.screens.md
  // const desktopPoint = (fullConfig as any).theme.screens.lg

  // console.log("fullConfig", fullConfig);
  const mobilePoint = parseInt(tailwindVariables.theme.screens.mobile.replace("px", ""));
  const tabletPoint = parseInt(tailwindVariables.theme.screens.tablet.replace("px", ""));
  const desktopPoint = parseInt(tailwindVariables.theme.screens.desktop.replace("px", ""));


  if (0 < windowSize.width && windowSize.width < mobilePoint) {
    isMobile = true
    isTablet = false
    isDesktop = false
  }
  if (mobilePoint <= windowSize.width && windowSize.width <= tabletPoint) {
    isMobile = false
    isTablet = true
    isDesktop = false
  }
  if (windowSize.width > tabletPoint) {
    isMobile = false
    isTablet = false
    isDesktop = true
  }
  appStore.dispatch(appSlice.actions.setIsMobile(isMobile));
  appStore.dispatch(appSlice.actions.setIsTablet(isTablet));
  appStore.dispatch(appSlice.actions.setIsDesktop(isDesktop));
};

window.addEventListener('resize', handleResize);

handleResize();
