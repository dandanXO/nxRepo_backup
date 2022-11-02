import styled from "styled-components";
import {IListItemType} from "./IListItemType";

const getDropdownButtonColor = (state: IListItemType, disabled: boolean, theme = "early") => {
    // if (disabled)
    //     return `
    //         border-color: ${theme === "early" ? "rgba(0, 0, 0, 0.13)" : "rgba(255, 255, 255, 0.13)"};
    //         color: ${theme === "early" ? "#a3a3a3" : "none"};
    //     `;
    // if (state !== "hover" && state !== "open") {
    //     // common
    //     return `
    //         color: #5e5e5e;
    //         background: rgba(255, 255, 255, 0.2);
    //         border-color: #a8a8a8;
    //     `;
    // } else if (state === "hover") {
    //     return `
    //         //color
    //         color: #52c8f9;
    //         background-color: rgba(255,255,255,0);
    //         border-color: #52c8f9;
    //         // box-shadow: 1px 1px 4px #52c8f9, -1px -1px 4px #52c8f9;
    //     `;
    // } else if (state === "open") {
    //     return `
    //         border-color: #35bff8;
    //         background-color: #36a9fb;
    //         color: #ffffff;
    //     `;
    // } else {
    //   return `
    //
    //     `;
    // }

    return `
        color: #aaaaaa;
        background: rgba(255, 255, 255, 0.2);
        border-color: #aaaaaa;
    `
};

const getWidth = (fixButtonWidth: number) => {
    if (!fixButtonWidth) return ``;
    return `width: ${fixButtonWidth}px`;
};

interface StyledSelectButtonProps {
    fixButtonWidth: number;
    state: IListItemType;
    disabled: boolean;
}

const StyledSelectButton = styled.div.attrs({
    className: "select-button",
})<StyledSelectButtonProps>`
    display: inline-block;
    position: relative;
    box-sizing: border-box;
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

const XuJieStyledSelectButton = styled(StyledSelectButton)`
  height: 49px;
  line-height: 49px;
  padding: 0px 20px;
`;

export default XuJieStyledSelectButton;
