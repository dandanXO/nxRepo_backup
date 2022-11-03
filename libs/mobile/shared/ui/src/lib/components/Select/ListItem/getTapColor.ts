// NOTE: 點擊瞬間的顏色
import {getXuJieTapColor} from "../layoutSkin/ListItem/getXuJieTapColor";

export const getTapColor = () => {
  // return getGeneralTapColor();
  return getXuJieTapColor();
}

const getGeneralTapColor = () => {
  return `
    &:active {
          background-color: #36a9fb;
          color: white;
      }
  `
}

