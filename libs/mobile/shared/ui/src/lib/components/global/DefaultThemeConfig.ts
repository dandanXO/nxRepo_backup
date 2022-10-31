import {Colors} from "./Colors";
import {fontSizeListToRem} from "./fontSize";
import {IThemeConfig} from "./types/IThemeConfig";

const defaultThemeConfig: IThemeConfig = {
  // NOTE: Commons
  color: Colors,
  fontSize: fontSizeListToRem,

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
    link: {
      main: Colors.none,
      text: Colors.gray500,
    },
  },
}
export default defaultThemeConfig;
