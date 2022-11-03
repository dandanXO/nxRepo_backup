import styled from "styled-components";
import {getListItemStatus} from "./getListItemStatus";
import {getTapColor} from "./getTapColor";
import {IListItemType} from "../IListItemType";
import {IThemeConfig} from "@frontend/mobile/shared/ui";

interface StyledListItemProps {
  state: IListItemType;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
  theme: IThemeConfig;
}

export const StyledListItem = styled.li<StyledListItemProps>`
    box-sizing: border-box;
    text-align: left;
    height: 28px;
    padding: 0 28px 0 20px;
    line-height: 28px;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    ${props => getListItemStatus(props.state)}
    ${props => getTapColor()};
`;
