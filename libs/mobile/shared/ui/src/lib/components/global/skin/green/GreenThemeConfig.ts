import { Colors } from "../../Colors";
import { fontSizeListToRem } from "../../fontSize";
import { IThemeConfig } from "../../types/IThemeConfig";


export const GreenThemeConfig: IThemeConfig = {
  color: Colors,
  fontSize: fontSizeListToRem,
  fontFamily: "Rubik",
  page: {
    bgColor: Colors.superLightGreen,
    // bgColor: Colors.mediumGreen,
  },
  button: {
    primary: {
      main: Colors.green,
      text: Colors.white,
    },
    secondary: {
      main: Colors.lightGreen,
      text: Colors.green,
    },
    info: {
      main: Colors.mediumGreen,
      text: Colors.white,
    },
    link: {
      main: Colors.none,
      text: Colors.green,
    },
    ghost: {
      main: Colors.none,
      text: Colors.green,
      border: Colors.green,
    }
  },
  radio: {
    color: Colors.green,
  },
  card: {
    color: Colors.orange,
  },
  repaymentAdsModal: {
    main: {
      bg: Colors.mediumGreen,
      text: "#FFFFFF",
    },
    secondary: {
      bg: Colors.green,
      text: "#FFFFFF",
    }
  }
}
