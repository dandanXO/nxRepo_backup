import {tailwindVariables} from "../../../../../../../environments/tailwind.variables";

const mobilePoint = parseInt(tailwindVariables.theme.screens.mobile.replace("px", ""));
const tabletPoint = parseInt(tailwindVariables.theme.screens.tablet.replace("px", ""));
const desktopPoint = parseInt(tailwindVariables.theme.screens.desktop.replace("px", ""));

export const responsive = {
  desktop: {
    breakpoint: { min: tabletPoint, max: 9999999999 },
    items: 3,
    partialVisible:true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  tablet: {
    breakpoint: { min: mobilePoint, max: tabletPoint },
    items: 2,
    partialVisible:true,
    partialVisibilityGutter: 20
    // partialVisible: false,
  },
  mobile: {
    breakpoint: { min: 0, max: mobilePoint },
    items: 1,
    partialVisible:true,
    // partialVisible: false,
  }
};
