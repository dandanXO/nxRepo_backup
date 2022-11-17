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
  },
  radio: {
    color: Colors.orange,
  },
  card: {
    color: Colors.orange,
  }
}
export default DefaultThemeConfig;
