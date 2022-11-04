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
    background-color: ${props => props.theme.mode === "early" ? "#2d3b58" : "#2e3e68"}};
    ${props => getBoxShadow(props.borderWidth, props.borderColor)};
`;

const XuJieStyledInnerContent = styled(StyledInnerContent)`
  background-color: #fff;
`

interface InnerContentPropTypes {
    children: React.ReactNode;
    customStyle?: boolean;
    noPadding?: boolean;
}
type InnerContentInterface = InnerContentPropTypes & TooltipOverylayCustomDisplay;

const InnerContent = (props: InnerContentInterface) => {
    return (
        <XuJieStyledInnerContent
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
        </XuJieStyledInnerContent>
    );
};
export default InnerContent;

function getBoxShadow(size = 0, borderColor = "black") {
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
