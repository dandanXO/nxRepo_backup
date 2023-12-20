import {environment} from "../../../../environments/environment";
import React from "react";
import {twJoin, twMerge} from "tailwind-merge"
import {AppLocalStorage} from "../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {useLocalStorage} from "usehooks-ts";
import {AppEnvironment} from "../../../device/appEnvironment";
import {usePageNavigate} from "../../hooks/usePageNavigate";
import {appSlice} from "../../../reduxStore/appSlice";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router";
import cx from "classnames";

export const AddToMobileShortcut = ({isShowTabbar}:{isShowTabbar: boolean}) => {
  const dispatch = useDispatch();
  const [_, setHideAddToMobileShortcut ] = useLocalStorage(AppLocalStorageKey.hideAddToMobileShortcut, false)
  const onClose = () => {
    // AppLocalStorage.setItem(AppLocalStorageKey.hideAddToMobileShortcut, "true");
    setHideAddToMobileShortcut(true);
  }

  const {onClickToOpenDownload} = usePageNavigate();

  const onDownload = () => {
    if(AppEnvironment.isAndroid()) {
      onClickToOpenDownload();
    } else {
      dispatch(appSlice.actions.setShowiOSDownloadPopover(true));
    }
    // setHideAddToMobileShortcut(true);
  }

  return (
    <div className={cx("w-full h-[40px] md:h-[56px] bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] px-4 py-3 z-10",
        "fixed left-0 right-0",
        "flex row justify-between",
        {"bottom-[60px]": isShowTabbar},
        {"bottom-0": !isShowTabbar},
      )}>
      <div className={"w-full flex row justify-between items-center"}>
        <span className={"flex row items-center w-full"} onClick={onDownload}>
          <img alt={"icon-add"} className={"w-[20px] md:w-[27px] h-[20px] md:h-[27px] mr-2"} src={`assets/shared/icon=add.svg`}/>
          <span className={"text-sm leading-8 text-white"}>Clique em Adicionar ao ecrã principal</span>
        </span>
        <img
          className="w-[20px] h-[20px] md:w-[32px] md:h-[32px] cursor-pointer" alt={"close"} src={`assets/${environment.assetPrefix}/icon=close.png`}
          onClick={onClose}
        />
      </div>

    </div>
  )
}
