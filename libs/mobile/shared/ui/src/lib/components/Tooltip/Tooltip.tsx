import React, {useEffect} from "react";
import cx from "classnames";
import Arrow from "./Arrow";
import InnerContent from "./InnerContent";
import styled from "styled-components";
import {Placement} from "popper.js";
import {ToolTipOverlayDisplay, TooltipOverylayCustomDisplay} from "./index";

interface StyledTooltipProps {
    show?: boolean;
    opacity?: number;
    placement?: Placement;
    ref?: React.RefObject<HTMLElement>;
}

const StyledTooltip = styled.div.attrs(props => {
    return {
        className: props.className,
        // style: props.style,
        role: "tooltip",
    };
})<StyledTooltipProps>`
    position: absolute;
    margin: 0;
    font-size: 12px;
    opacity: ${props => (props.show ? props.opacity : 0)};
    // display: ${props => (props.show ? "block" : "none")};
    visibility: ${props => (props.show ? "visible" : "hidden")};

    // NOTE: font-reset
    // We deliberately do NOT reset font-size.
    font-style: normal;
    font-weight: 400;
    line-height: 1.428571429; // 20/14
    line-break: auto;

    // Fallback for where \`start\` is not supported
    text-align: left;
    text-align: start;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-break: normal;
    word-spacing: normal;
    word-wrap: normal;
    white-space: normal;
    ${props => getPaddingByPlacement(props.placement)};
`;

interface TooltipProps {
    // Display
    className?: string;
    style: object;

    // Reference
    children: React.ReactNode;
    arrowProps: {
        ref: any;
        style: {};
    };
    outOfBoundaries: boolean;
    scheduleUpdate: () => void;
}

export type TooltipInterface = TooltipProps & ToolTipOverlayDisplay & TooltipOverylayCustomDisplay;

export const Tooltip = React.forwardRef(
    (
        {
            placement = "right",
            className,
            style,
            children,
            arrowProps,
            showArrow = true,
            customStyle = false,
            show,
            opacity,
            borderWidth,
            backgroundColor,
            borderColor,
            fontColor,
            noContentPadding,
            outOfBoundaries,
        }: TooltipInterface,
        ref
    ) => {
        useEffect(() => {});
        // console.log("Tooltip.style", style);
        return (
            <StyledTooltip
                // NOTICE: https://github.com/styled-components/styled-components/issues/2202
                ref={ref as any}
                className={cx(className, "ud-tooltip", {
                    "ud-tooltip-custom": customStyle,
                })}
                // NOTICE: Cannot use merge , it show slowly and will cause component position flash
                // style={{
                //     ...style,
                // opacity: String(props.opacity),
                // display: props.show ? "block" : "none"
                // }}
                style={style}
                show={show}
                placement={placement}
                opacity={opacity}
            >
                {showArrow && (
                    <Arrow
                        borderWidth={borderWidth}
                        borderColor={borderWidth === 0 ? backgroundColor : borderColor}
                        backgroundColor={backgroundColor}
                        placement={placement}
                        // REFACTORING
                        ///{...arrowProps}
                        ref={arrowProps.ref}
                        style={arrowProps.style}
                    />
                )}
                <InnerContent
                    borderWidth={borderWidth}
                    fontColor={fontColor}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    customStyle={customStyle}
                    noPadding={noContentPadding}
                >
                    {children}
                </InnerContent>
            </StyledTooltip>
        );
    }
);
Tooltip.displayName = "Tooltip";

function getPaddingByPlacement(placement: Placement = "top") {
    if (placement === "top") {
        return `
            padding: 0.4rem 0;
        `;
    } else if (placement === "right") {
        return `
            padding: 0 0.4rem;
        `;
    } else if (placement === "bottom" || placement === "bottom-start" || placement === "bottom-end") {
        return `
            padding: 0.4rem 0;
        `;
    } else if (placement === "left") {
        return `
            padding: 0 0.4rem;
        `;
    }
}
