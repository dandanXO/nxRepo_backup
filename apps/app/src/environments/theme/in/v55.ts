import {Colors, fontSizeListToRem, IThemeConfig} from "@frontend/mobile/shared/ui";
import customColors from "../../../app/modules/theme/customColors";

export const v55ThemeConfig: IThemeConfig = {
  // NOTE: Commons
  color: Colors,
  fontSize: fontSizeListToRem,
  fontFamily: "Rubik",
  page: {
    bgColor: customColors.white
  },
  // NOTE: Component - button
  button: {
    primary: {
      main: customColors.primary.main,
      text: customColors.white
    },
    secondary: {
      main: customColors.secondary.main,
      text: customColors.primary.main,
    },
    info: {
      main: customColors.secondary.main,
      text: customColors.white
    },
    link: {
      main: Colors.none,
      text: Colors.gray500,
    },
    ghost: {
      main: Colors.none,
      text: customColors.primary.main,
      border: customColors.primary.main,
    }
  },
  radio: {
    color: customColors.primary.main,
  },
  card: {
    color: customColors.primary.main,
  },
  repaymentAdsModal: {
    main: {
      bg: "#FFE0E0",
      text: "#ef4b4b",
    },
    secondary: {
      bg: "#EF4B4B",
      text: "#FFFFFF",
    }
  }
}
