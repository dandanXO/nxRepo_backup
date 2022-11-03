// NOTE: General
import {ThemeModuleSkinType} from "../type/module";
import {getXuJieArrowICONColor} from "./layoutSkin/getArrowIconColor/getXuJieArrowICONColor";

export const getArrowIconColor = (state: string, disabled: boolean, mode: ThemeModuleSkinType = "early") => {
  // return getGeneralArrowICONColor();
  return getXuJieArrowICONColor(state, disabled, mode);
};

const getGeneralArrowICONColor = (state: string, disabled: boolean, mode: ThemeModuleSkinType = "early") => {
  if (disabled) return "#a3a3a3";
  if (state !== "hover" && state !== "open") {
    return mode == "early" ? "#5e5e5e" : "#ffffff";
  } else if (state === "hover") {
    return "#52c8f9";
  } else if (state === "open") {
    return "#ffffff";
  } else {
    return "#ffffff";
  }
};
