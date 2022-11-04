import PopperJS, {Data, Placement, ReferenceObject} from "popper.js";
import {useCallback, useEffect, useRef, useState} from "react";

const initialPopperStyles = {
    position: "absolute",
    top: "0",
    left: "0",
    opacity: "0",
    pointerEvents: "none",
};
const initialArrowStyles = {};

interface UseProperOptions {
    placement: Placement;
    positionFixed: boolean;
    modifiers?: {
        arrow?: {
            element?: any;
        };
    };
    enableEvents: boolean;
}

type UseProperOptionsState = {
    scheduleUpdate: () => void;
    outOfBoundaries: boolean;
    styles: {};
    arrowStyles: {};
    placement: Placement;
};

export default function usePopper(
    referenceElement: Element | ReferenceObject,
    popperElement: Element | null,
    {placement = "bottom", positionFixed = false, modifiers = {}}: UseProperOptions
) {
    const popperInstanceRef = useRef<PopperJS>();
    const hasArrow = !!(modifiers.arrow && modifiers.arrow.element);
    const scheduleUpdate = useCallback(() => {
        if (!popperInstanceRef || !popperInstanceRef.current) return;
        popperInstanceRef.current.scheduleUpdate();
    }, []);
    const [state, setState] = useState<UseProperOptionsState>({
        placement,
        scheduleUpdate,
        outOfBoundaries: false,
        styles: initialPopperStyles,
        arrowStyles: initialArrowStyles,
    });

    useEffect(() => {
        scheduleUpdate();
    }, [scheduleUpdate]);

    useEffect(() => {
        if (referenceElement == null || popperElement == null) {
            return undefined;
        }
        const arrow = modifiers.arrow && {
            ...modifiers.arrow,
            element: modifiers.arrow.element,
        };
        // console.log("=======");
        // console.log("placement", placement);
        // console.log("positionFixed", positionFixed);
        // console.log("referenceElement", referenceElement);
        // console.log("popperElement", popperElement);
        // console.log("hasArrow", hasArrow);
        // console.log("modifiers", modifiers);

        popperInstanceRef.current = new PopperJS(referenceElement, popperElement, {
            placement,
            positionFixed,
            // Default
            eventsEnabled: true,
            // Change
            // eventsEnabled: false,
            modifiers: {
                ...modifiers,
                arrow,
                applyStyle: {enabled: false},
                updateStateModifier: {
                    enabled: true,
                    order: 900,
                    fn(data: Data) {
                        // console.log("data", data);
                        const popper = data.offsets.popper as any;
                        setState({
                            scheduleUpdate,
                            styles: {
                                ...data.styles,
                                // REFACTORING: Before
                                position: popper.position,
                                // REFACTORING: After
                                // ...data.offsets.popper,
                            },
                            arrowStyles: data.arrowStyles,
                            outOfBoundaries: data.hide,
                            placement: data.placement,
                        });
                        return data;
                    },
                },
            },
            onCreate: data => {
                // console.log("onCreate.data", data);
            },
            onUpdate: data => {
                // console.log("onUpdate.data", data);
            },
        });
        return () => {
            // popperInstanceRef!.current!.destroy();
            if (!popperInstanceRef.current) return;
            popperInstanceRef.current.destroy();
        };
        // notice: modifiers infinite loop
    }, [placement, positionFixed, referenceElement, popperElement, hasArrow, scheduleUpdate]);

    return state;
}
