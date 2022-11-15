import styled from "styled-components";
import {IListItemType} from "../IListItemType";
import {getWidth} from "./getWidth";
import {getDropdownButtonColor} from "./getDropdownButtonColor";

interface StyledSelectButtonProps {
    fixButtonWidth: string;
    state: IListItemType;
    disabled: boolean;
}

export const StyledSelectButton = styled.div.attrs({
    className: "select-button",
})<StyledSelectButtonProps>`
    display: inline-block;
    position: relative;
    box-sizing: border-box;

    border-radius: 9px;
    border-style: solid;
    border-width: 1px;

    padding: 0px 9px;

    min-width: 90px;
    ${props => getWidth(props.fixButtonWidth)};
    //min-width: 60px;

    height: 30px;

    line-height: 30px;
    overflow: hidden;

    font-size: 14px;

    // Disabled
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};

    // Many Color
    ${props => getDropdownButtonColor(props.state, props.disabled, props.theme.mode)};
`;


