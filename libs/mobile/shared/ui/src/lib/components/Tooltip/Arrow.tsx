import styled from "styled-components";
import {Placement} from "popper.js";
import {TooltipOverylayCustomDisplay} from "./index";

interface StyledArrowProps {
    placement: Placement;
}
type StyledArrowInterface = Pick<TooltipOverylayCustomDisplay, "backgroundColor" | "borderWidth" | "borderColor"> &
    StyledArrowProps;

const StyledArrow = styled.div<StyledArrowInterface>`
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    //background: inherit;
    background: ${props => props.backgroundColor};
    // frag
    ${props => getBoxShadow(props.borderWidth, props.borderColor)};
    ${props => getPlcamentDirection(props.placement)};
`;

export default StyledArrow;

function getBoxShadow(size: number = 0, borderColor: string = "black") {
    if (size === 0) {
        return ``;
    } else if (size === 1) {
        return `
            box-shadow: inset -5px -5px 0px -4px ${borderColor};
        `;
    } else {
        return `
            box-shadow: inset -6px -6px 0px ${-6 + size}px ${borderColor};
        `;
    }
}

function getPlcamentDirection(placement: Placement) {
    if (placement === "top") {
        return `
            transform: rotate(45deg);
            bottom: 3px;
        `;
    } else if (placement === "right") {
        return `
            transform: rotate(135deg);
            left: 3px;
        `;
    } else if (placement === "bottom") {
        return `
            transform: rotate(${45 + 180}deg);
            top: 3px
        `;
    } else if (placement === "left") {
        return `
            transform: rotate(${135 + 180}deg);            
            right: 3px;
        `;
    }
}
