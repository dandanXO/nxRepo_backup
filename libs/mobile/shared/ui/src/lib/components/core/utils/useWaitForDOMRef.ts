import ownerDocument from "dom-helpers/ownerDocument";
import {useEffect, useState} from "react";

const resolveRef = (ref: any) => {
    if (typeof document === "undefined") return undefined;
    if (ref == null) return ownerDocument().body;
    if (typeof ref === "function") ref = ref();

    if (ref && ref.current) ref = ref.current;
    if (ref && ref.nodeType) return ref;

    return null;
};

export default function useWaitForDOMRef(ref: any, onResolved?: any) {
    const [resolvedRef, setRef] = useState(() => resolveRef(ref));

    if (!resolvedRef) {
        const earlyRef = resolveRef(ref);
        if (earlyRef) setRef(earlyRef);
    }

    useEffect(() => {
        if (onResolved && resolvedRef) {
            onResolved(resolvedRef);
        }
    }, [onResolved, resolvedRef]);

    useEffect(() => {
        const nextRef = resolveRef(ref);
        if (nextRef !== resolvedRef) {
            setRef(nextRef);
        }
    }, [ref, resolvedRef]);

    return resolvedRef;
}
