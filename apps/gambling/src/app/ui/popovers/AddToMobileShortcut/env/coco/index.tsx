import {environment} from "../../../../../../environments/environment";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {useLocalStorage} from "usehooks-ts";
import {AppEnvironment} from "../../../../../device/appEnvironment";
import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {useDispatch} from "react-redux";
import cx from "classnames";

type IAddToMobileShortcut  = {
  isShowTabbar: boolean;
  className?: string
}
export const CocoAddToMobileShortcut = (props: IAddToMobileShortcut) => {
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
    <div className={cx("bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)]",
        "px-4 w-full",
        "flex row justify-between",
        props.className
      )}>
      <div className={"w-full flex row justify-between items-center"}>
        <span className={"flex row items-center w-full"} onClick={onDownload}>
          <img alt={"icon-add"} className={"w-[20px] md:w-[27px] h-[20px] md:h-[27px] mr-2"} src={`assets/shared/icon=add.svg`}/>
          <span className={"text-sm leading-8 text-white"}>Clique em Adicionar ao ecrã principal</span>
        </span>
        <img
          className="w-[20px] h-[20px] md:w-[32px] md:h-[32px] cursor-pointer" alt={"close"} src={`assets/${environment.uVersion}/icon=close.png`}
          onClick={onClose}
        />
      </div>

    </div>
  )
}
