import { Colors } from "../../Colors";
import { fontSizeListToRem } from "../../fontSize";
import { IThemeConfig } from "../../types/IThemeConfig";


export const GreenThemeConfig: IThemeConfig = {
  color: Colors,
  fontSize: fontSizeListToRem,
  page: {
    bgColor: Colors.superLightGreen,
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
  },
  radio: {
    color: Colors.green,
  }
}
