import {Colors} from "./Colors";
import {fontSizeListToRem} from "./fontSize";

const defaultThemeConfig = {
  // Commons
  color: Colors,
  fontSize: fontSizeListToRem,

  // Component - button
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
      main: 'none',
      text: Colors.gray500,
    },
  },

};
export default defaultThemeConfig;
