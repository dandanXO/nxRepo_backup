import styled from "styled-components";
import React from "react";
import {TooltipOverylayCustomDisplay} from "./index";

type StyledInnerContentProps = TooltipOverylayCustomDisplay;

const StyledInnerContent = styled.div.attrs({
    // className: "ud-tooltip-inner"
})<StyledInnerContentProps>`
    /* max-width: $tooltip-max-width; */
    /* NOTICE: For custom */
    /* padding: $tooltip-padding-y $tooltip-padding-x; */
    text-align: center;
    /* NOTICE: For custom */
    border-radius: 5px;
    color: ${props => (props.fontColor ? props.fontColor : "#000000")};
    background-color: ${props => props.backgroundColor};
    ${props => getBoxShadow(props.borderWidth, props.borderColor)};
`;

interface InnerContentPropTypes {
    children: React.ReactNode;
    customStyle?: boolean;
    noPadding?: boolean;
}
type InnerContentInterface = InnerContentPropTypes & TooltipOverylayCustomDisplay;

const InnerContent = (props: InnerContentInterface) => {
    return (
        <StyledInnerContent
            style={{
                // NOTE: For customStyle
                padding: props.customStyle || props.noPadding ? "0px" : "3px 7px",
                // backgroundColor: props.color || "#de5852",
                // border: "0.8px solid #d1ebf7"
            }}
            fontColor={props.fontColor}
            backgroundColor={props.backgroundColor}
            borderColor={props.borderColor}
            borderWidth={props.borderWidth}
        >
            {typeof props.children === "string" ? (
                <div className="dangerouslyHTML" dangerouslySetInnerHTML={{__html: props.children}} />
            ) : (
                props.children
            )}
        </StyledInnerContent>
    );
};
export default InnerContent;

function getBoxShadow(size: number = 0, borderColor: string = "black") {
    if (size === 1) {
        return `
            box-shadow: inset 0px 0px 0px 1px ${borderColor}, 0px 0px 0px 0px ${borderColor};
        `;
    } else {
        return `
            box-shadow: inset 0px 0px 0px ${size}px ${borderColor}, 0px 0px 0px 0px ${borderColor};
        `;
    }
}
