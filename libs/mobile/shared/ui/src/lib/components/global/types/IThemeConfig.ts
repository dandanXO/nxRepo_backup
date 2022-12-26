import {Colors} from "../Colors";
import {fontSizeListToRem} from "../fontSize";

export interface IThemeConfig {
  color: typeof Colors;
  fontSize: typeof fontSizeListToRem;
  fontFamily: string;
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
    ghost: {
      main: Colors;
      text: Colors;
      border: Colors;
    }
  },
  radio: {
    color: Colors;
  },
  card: {
    color: Colors;
  },
  repaymentAdsModal: {
    main: {
      bg: string;
    },
    secondary: {
      bg: string;
    }
  }
}
