import { useLazyGetVIPInfoQuery } from "../../external";
import {getLocalStorageObjectByKey} from "../../persistant/getLocalStorageObjectByKey";
import {useEffect, useState} from "react";
import {setLocalStorageObjectByKey} from "../../persistant/setLocalStorageObjectByKey";
import {AppLocalStorage} from "../../persistant/localstorage";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";
import { GetVIPInfoResponse } from "../../external/UserEndpoint";

export const useLocalstorageGetUserVIPInfo = () => {
  const [triggerGetUserVIPInfo, { data: userVIPInfoResponseData, isUninitialized, isLoading: isGetUserVIPInfoLoading }] = useLazyGetVIPInfoQuery();
  const prevUserVIPInfo = getLocalStorageObjectByKey<GetVIPInfoResponse>(AppLocalStorageKey.useGetVIPInfoMutation);
  const [userVIPInfo, setUserVIPInfo] = useState<GetVIPInfoResponse>(prevUserVIPInfo)
  useEffect(() => {
    if(!isUninitialized && !isGetUserVIPInfoLoading && userVIPInfoResponseData && userVIPInfoResponseData.code === 200) {
      setLocalStorageObjectByKey(AppLocalStorageKey.useGetVIPInfoMutation, userVIPInfoResponseData);
      setUserVIPInfo(userVIPInfoResponseData);
    }
  }, [isUninitialized, isGetUserVIPInfoLoading, userVIPInfoResponseData ])

  useEffect(() => {
    const token = AppLocalStorage.getItem(AppLocalStorageKey.token);
    if(token && token !== "" && token !== "undefined") {
      triggerGetUserVIPInfo({
        token,
      });
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const token = AppLocalStorage.getItem(AppLocalStorageKey.token) || '';
      triggerGetUserVIPInfo({
        token,
      });
    }
    window.addEventListener("focus", handler)
    return () => {
      window.removeEventListener("focus", handler)
    }
  }, [])

  return {
    userVIPInfo,
    isGetUserVIPInfoLoading,
    triggerGetUserVIPInfo,
  }
}
