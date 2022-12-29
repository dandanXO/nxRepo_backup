import {Colors} from "../../Colors";
import {fontSizeListToRem} from "../../fontSize";
import {IThemeConfig} from "../../types/IThemeConfig";

const DefaultThemeConfig: IThemeConfig = {
  // NOTE: Commons
  color: Colors,
  fontSize: fontSizeListToRem,
  fontFamily: "Rubik",
  page: {
    bgColor: Colors.white,
  },
  // NOTE: Component - button
  button: {
    primary: {
      main: Colors.orange,
      text: Colors.white,
    },
    secondary: {
      main: Colors.lightOrange,
      text: Colors.orange,
    },
    info: {
      main: Colors.mediumOrange,
      text: Colors.white,
    },
    link: {
      main: Colors.none,
      text: Colors.gray500,
    },
    ghost: {
      main: Colors.none,
      text: Colors.orange,
      border: Colors.orange,
    }
  },
  radio: {
    color: Colors.orange,
  },
  card: {
    color: Colors.orange,
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
export default DefaultThemeConfig;
