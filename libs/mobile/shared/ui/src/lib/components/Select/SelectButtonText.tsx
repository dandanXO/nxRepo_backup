import styled from "styled-components";
import {ThemeModuleSkinType} from "../type/module";
import {IListItemType} from "./IListItemType";

interface ButtonTextProps {
  disabled?: boolean;
  status: IListItemType;
}
const getTextColor = (disabled = false, skinType: ThemeModuleSkinType, status: IListItemType) => {
  if (!disabled) {
    if (skinType === "early") {
      if (status === "normal") {
        return "#5e5e5e";
      } else if (status === "open") {
        return "#ffffff";
      } else {
        return "#52c8f9";
      }
    } else {
      if (status === "normal") {
        return "#ffffff";
      } else if (status === "open") {
        return "#ffffff";
      } else {
        return "#52c8f9";
      }
    }
  } else {
    if (skinType === "early") {
      return "#a3a3a3";
    } else {
      return "rgba(255, 255, 255, 0.2)";
    }
  }
};

const SelectButtonText = styled.div<ButtonTextProps>`
    display: block;
    padding: 0 11px 0 0;
    // color: ${props => getTextColor(props.disabled, props.theme.mode, props.status)};
    color: #aaaaaa;
`;

export default SelectButtonText;

