import {useMemo} from "react";

const toFnRef = ref =>
    !ref || typeof ref === "function"
        ? ref
        : value => {
              ref.current = value;
          };

export function mergeRefs(refA, refB) {
    const a = toFnRef(refA);
    const b = toFnRef(refB);
    return value => {
        if (a) a(value);
        if (b) b(value);
    };
}
function useMergedRefs(refA, refB) {
    return useMemo(() => mergeRefs(refA, refB), [refA, refB]);
}

export default useMergedRefs;
