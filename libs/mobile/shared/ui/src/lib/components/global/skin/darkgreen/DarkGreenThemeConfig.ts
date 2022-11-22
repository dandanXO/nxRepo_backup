import { Colors } from "../../Colors";
import { fontSizeListToRem } from "../../fontSize";
import { IThemeConfig } from "../../types/IThemeConfig";


export const DarkGreenThemeConfig: IThemeConfig = {
  color: Colors,
  fontSize: fontSizeListToRem,
  fontFamily: "Rubik",
  page: {
    bgColor: Colors.superLightGreen,
    // bgColor: Colors.mediumGreen,
  },
  button: {
    primary: {
      main: Colors.darkGreen,
      text: Colors.white,
    },
    secondary: {
      main: Colors.lightDarkGreen,
      text: Colors.darkGreen,
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
      text: Colors.darkGreen,
      border: Colors.darkGreen,
    }
  },
  radio: {
    color: Colors.darkGreen,
  },
  card: {
    color: Colors.lightBlue,
  }
}
