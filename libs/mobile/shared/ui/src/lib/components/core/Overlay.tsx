import {Placement} from "popper.js";
import React, {useState} from "react";
import ReactDOM from "react-dom";
import useCallbackRef from "./hooks/useCallbackRef";
import useMergedRefs from "./hooks/useMergedRefs";
import usePopper from "./usePopper";
import useWaitForDOMRef from "./utils/useWaitForDOMRef";

interface OverlayInterface {
    // Common
    show: boolean;
    placement?: Placement;
    flip?: boolean;
    containerPadding?: number;

    // Reference
    target: any;
    container: any;

    // Extra
    popperConfig?: {
        modifiers?: any;
    };
    children: (options: any) => React.ReactNode;
}

export interface OverlayReturn {
    outOfBoundaries: boolean;
    innerPlacement: Placement;
    scheduleUpdate: () => void;
    show: boolean;
    props: {
        style: {};
        ref: any;
    };
    arrowProps: {
        style: {};
        ref: any;
    };
}

const Overlay = React.forwardRef((props: OverlayInterface, outerRef) => {
    const {flip, placement: outerPlacement, containerPadding = 5, popperConfig = {}} = props;

    const [rootElement, attachRef] = useCallbackRef();
    const [arrowElement, attachArrowRef] = useCallbackRef();
    const mergedRef = useMergedRefs(attachRef, outerRef);

    const container = useWaitForDOMRef(props.container);
    const target = useWaitForDOMRef(props.target);

    const [exited, setExited] = useState(!props.show);

    const {modifiers = {}} = popperConfig;

    const {
        styles,
        arrowStyles,
        outOfBoundaries,
        placement: innerPlacement,
        scheduleUpdate,
    } = usePopper(target, rootElement, {
        ...popperConfig,
        positionFixed: false,
        placement: outerPlacement || "bottom",
        enableEvents: props.show,
        modifiers: {
            ...modifiers,
            preventOverflow: {
                padding: containerPadding || 5,
                ...modifiers.preventOverflow,
            },
            arrow: {
                ...modifiers.arrow,
                enabled: !!arrowElement,
                element: arrowElement,
            },
            flip: {
                enabled: !!flip,
                ...modifiers.preventOverflow,
            },
        },
    });

    if (props.show) {
        if (exited) setExited(false);
    } else if (!exited) {
        setExited(true);
    }

    const mountOverlay = props.show || !exited;
    if (!mountOverlay) {
        return null;
    }

    const child = props.children({
        outOfBoundaries,
        innerPlacement,
        scheduleUpdate,

        show: props.show,
        props: {
            style: styles,
            ref: mergedRef,
        },
        arrowProps: {
            style: arrowStyles,
            ref: attachArrowRef,
        },
    });
    return container ? ReactDOM.createPortal(child, container) : null;
});

Overlay.displayName = "Overlay";

export default Overlay;
