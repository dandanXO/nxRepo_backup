// import AppContext from "utils/AppContext";
import React, {useEffect, useRef, useState} from "react";
import Overlay from "../Overlay";
import {Tooltip} from "./Tooltip";
import {Placement} from "popper.js";

// const defaultProps = {
//     fontColor: "#FFFFFF",
//     borderColor: "#de5852",
//     backgroundColor: "#de5852",
//     opacity: 1,
//     borderWidth: 1,
//     noContentPadding: false,
// };

// Display
export interface TooltipOverlayProps {
    // Display
    className?: string;
}

export interface ToolTipOverlayDisplay {
    customStyle?: boolean;
    show: boolean;
    opacity?: number;
    showArrow?: boolean;
    placement?: Placement;
    noContentPadding?: boolean;
}

// Custom Display
export interface TooltipOverylayCustomDisplay {
    fontColor?: string;
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
}

// Reference
export interface TooltipOverlayReference {
    target: React.RefObject<HTMLElement> | null;
    children: React.ReactNode;
    zIndex?: number;
}
type TooltipOverlayInterface = TooltipOverlayProps &
    ToolTipOverlayDisplay &
    TooltipOverylayCustomDisplay &
    TooltipOverlayReference;

// NOTE: Compose Overlay and Tooltip
const TooltipOverlay = ({
    target,
    show,
    placement,
    children,
    className,
    showArrow,
    customStyle,
    zIndex,
    fontColor,
    borderColor,
    backgroundColor,
    opacity,
    borderWidth,
    noContentPadding,
}: TooltipOverlayInterface) => {
    const setupRef = useRef(false);
    const [scheduleUpdate, setScheduleUpdate] = useState<() => void>();

    useEffect(() => {
        if (setupRef.current && scheduleUpdate) {
            scheduleUpdate();
        }
    });
    // console.log("Tooltip.target", target);

    return (
        <Overlay target={target && target.current} show={show} placement={placement} zIndex={zIndex}>
            {overlayProps => {
                if (!setupRef.current) {
                    setupRef.current = true;
                    setScheduleUpdate(overlayProps.scheduleUpdate);
                }
                return (
                    <Tooltip
                        // overlayProps
                        ref={overlayProps.ref}
                        style={overlayProps.style}
                        arrowProps={overlayProps.arrowProps}
                        outOfBoundaries={overlayProps.outOfBoundaries}
                        scheduleUpdate={overlayProps.scheduleUpdate}
                        // outerProps
                        className={className}
                        show={show}
                        placement={placement}
                        showArrow={customStyle === true ? false : showArrow}
                        customStyle={customStyle}
                        fontColor={fontColor}
                        borderColor={borderColor}
                        backgroundColor={backgroundColor}
                        opacity={opacity}
                        borderWidth={borderWidth}
                        noContentPadding={noContentPadding}
                    >
                        {children}
                    </Tooltip>
                );
            }}
        </Overlay>
    );
};
TooltipOverlay.displayName = "TooltipOverlay";
export default TooltipOverlay;
