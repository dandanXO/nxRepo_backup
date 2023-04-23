import {Colors} from "../Colors";
import {fontSizeListToRem} from "../fontSize";

export interface IThemeConfig {
  color: typeof Colors;
  fontSize: typeof fontSizeListToRem;
  fontFamily: string;
  page: {
    bgColor: Colors | string;
  },
  button: {
    primary: {
      main: Colors | string;
      text: Colors | string;
    },
    secondary: {
      main: Colors | string;
      text: Colors | string;
    },
    info: {
      main: Colors | string;
      text: Colors | string;
    },
    link: {
      main: Colors | string;
      text: Colors | string;
    },
    ghost: {
      main: Colors | string;
      text: Colors | string;
      border: Colors | string;
    }
  },
  radio: {
    color: Colors | string;
  },
  card: {
    color: Colors | string;
  },
  repaymentAdsModal: {
    main: {
      bg: string;
      text: string;
    },
    secondary: {
      bg: string;
      text: string;
    }
  }
}
