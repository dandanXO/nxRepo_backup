import {useMemo} from "react";

const toFnRef = (ref: any) =>
    !ref || typeof ref === "function"
        ? ref
        : (value: any) => {
              ref.current = value;
          };

export function mergeRefs(refA: any, refB : any) {
    const a = toFnRef(refA);
    const b = toFnRef(refB);
    return (value: any) => {
        if (a) a(value);
        if (b) b(value);
    };
}
function useMergedRefs(refA: any, refB: any) {
    return useMemo(() => mergeRefs(refA, refB), [refA, refB]);
}

export default useMergedRefs;
