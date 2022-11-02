import {Colors} from "../Colors";
import {fontSizeListToRem} from "../fontSize";

export interface IThemeConfig {
  color: typeof Colors;
  fontSize: typeof fontSizeListToRem;
  page: {
    bgColor: Colors;
  },
  button: {
    primary: {
      main: Colors;
      text: Colors;
    },
    secondary: {
      main: Colors;
      text: Colors;
    },
    info: {
      main: Colors;
      text: Colors;
    },
    link: {
      main: Colors;
      text: Colors;
    },
  },
  radio: {
    color: Colors;
  }
}
