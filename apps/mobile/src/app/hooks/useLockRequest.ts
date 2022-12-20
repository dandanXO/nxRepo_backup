import {useRef} from "react";

export const useLockRequest = (identity: string) => {
  const map = useRef(new Map());

  const setIsRequestPending = (identity: string, isPending: boolean) => {
    map.current.set(identity, isPending);
  }

  const isRequestPending = (identity: string) => {
    return map.current.get(identity);
  }

  const setRequest = (identity: string, isPending: boolean) => {
    setIsRequestPending(identity, isPending);
  }

  const startRequest = (identity: string) => {
    if (isRequestPending(identity)) {
      console.log(`${identity} is requesting!`)
    } else {
      setRequest(identity, true)
    }
  }

  const endRequest = (identity: string) => {
    setRequest(identity, false)
  }

  return {
    startRequest,
    endRequest,
    isRequestPending,
  }
}
