import styled from "styled-components";
import {IListItemType} from "../IListItemType";
import {getWidth} from "./getWidth";
import {getDropdownButtonColor} from "./getDropdownButtonColor";

interface StyledSelectButtonProps {
    fixButtonWidth: number;
    state: IListItemType;
    disabled: boolean;
}

export const StyledSelectButton = styled.div.attrs({
    className: "select-button",
})<StyledSelectButtonProps>`
    display: inline-block;
    position: relative;
    //box-sizing: border-box;
    box-sizing: content-box;

    min-width: 90px;
    ${props => getWidth(props.fixButtonWidth)};
    //min-width: 60px;

    height: 30px;
    line-height: 30px;
    overflow: hidden;

    font-size: 14px;

    border-radius: 3px;
    border-style: solid;
    border-width: 1px;

    padding: 0px 9px;

    // Many Color
    ${props => getDropdownButtonColor(props.state, props.disabled, props.theme.mode)};

    // Disabled
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;


