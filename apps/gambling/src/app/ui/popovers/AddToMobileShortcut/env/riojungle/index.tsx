import {environment} from "../../../../../../environments/environment";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {useLocalStorage} from "usehooks-ts";
import {AppEnvironment} from "../../../../../device/appEnvironment";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {useDispatch} from "react-redux";
import cx from "classnames";
import styled from "styled-components";

type IAddToMobileShortcut  = {
  isShowTabbar: boolean;
  className?: string
}

const Container = styled.div`
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25) inset, 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset;
`;

export const RionjungleAddToMobileShortcut = (props: IAddToMobileShortcut) => {
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
    <Container className={cx("bg-gradient-144 from-[#8547EB] to-[#10B98F]",
        "px-4 py-1.5 w-[95%] rounded-md",
        "flex row justify-between",
        props.className
      )}>
      <div className={"w-full flex row justify-between items-center"}>
        <span className={"flex row items-center w-full"} onClick={onDownload}>
          <img alt={"icon-add"} className={"w-[24px] md:w-[32px] h-[24px] md:h-[32px] mr-2"} src={`assets/shared/icon=add.svg`}/>
          <span className={"text-sm leading-8 text-white"}>Clique em Adicionar ao ecrã principal</span>
        </span>
        <img
          className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] cursor-pointer" alt={"close"} src={`assets/${environment.assetPrefix}/icon=close.png`}
          onClick={onClose}
        />
      </div>

    </Container>
  )
}