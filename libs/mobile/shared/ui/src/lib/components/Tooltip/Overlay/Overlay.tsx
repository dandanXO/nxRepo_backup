import React from "react";
import BaseOverlay, {OverlayReturn} from "../../core/Overlay";
import {Placement} from "popper.js";

interface OverlayProps {
    children: (options: {
        ref: any;
        show: boolean;
        arrowProps: {
            ref: any;
            style: {};
        };
        style: object;
        scheduleUpdate: () => void;
        outOfBoundaries: boolean;
    }) => React.ReactNode;

    zIndex?: number;

    show: boolean;
    placement?: Placement;
    flip?: boolean;
    containerPadding?: number;

    // Reference
    target: any;
    container?: any;

    // Extra
    popperConfig?: {
        modifiers?: any;
    };
}

function Overlay({
    children: overlay,
    zIndex,
    show,
    placement,
    flip,
    containerPadding,
    target,
    container,
    popperConfig,
}: OverlayProps) {
    return (
        <BaseOverlay
            show={show}
            placement={placement}
            flip={flip}
            containerPadding={containerPadding}
            target={target}
            container={container}
            popperConfig={popperConfig}
        >
            {({props, arrowProps, show, scheduleUpdate, outOfBoundaries}: OverlayReturn) => {
                return overlay({
                    // style: props.style,
                    ref: props.ref,
                    scheduleUpdate,
                    outOfBoundaries,
                    show,
                    arrowProps,
                    style: {
                        ...props.style,
                        // REFACTORING
                        zIndex,
                    },
                });
            }}
        </BaseOverlay>
    );
}

export default Overlay;
