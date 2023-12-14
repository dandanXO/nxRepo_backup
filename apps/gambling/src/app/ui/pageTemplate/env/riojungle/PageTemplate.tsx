
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig, useSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";

import React from "react";

import {Footer} from "../../footer";
import {TabBar} from "../../tabBar/env/coco";
import {Toolbox} from "../../../components/Toolbox";
import {UserLoginStatusModal} from "../../../modals/UserLoginStatusModal";
import {BaseLoadingOverlay} from "../../base/BaseLoadingOverlay";
import {useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {BaseErrorBoundary} from "../../base/BaseErrorBoundary";
import {TShowToolboxConfig} from "../../base/types";
import useBreakpoint from "../../../hooks/useBreakpoint";


import {MenuDrawer} from "../../../drawers/MenuDrawer/env/riojungle/MenuDrawer";
import cx from "classnames";
import {Header} from "../../header";

type IPageTemplate = IUseSingletonPageTemplateConfig & {
  children: React.ReactNode;
  showToolboxConfig?: TShowToolboxConfig;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  onClickToOpenTelegramService: () => void;
}
export const PageTemplate = (props:IPageTemplate) => {

  const {
    isShowMobileHeader,
    isShowDesktopHeader,
    isShowDesktopMenuDrawer,
    isShowMobileFooter,
    isShowDesktopFooter,
    isShowMobileTabbar,
  } = useSingletonPageTemplateConfig(props);

  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);


  const {isMobile} = useBreakpoint();

  return (
    <BaseStyledPageTemplate>
      <Header/>

      <div className={""}>
        {isShowDesktopMenuDrawer && (
          <div className={"w-[248px] fixed top-24 left-0"}>
            <MenuDrawer/>
          </div>
        )}
        <div
          className={cx("mt-24", {
            "ml-[248px]": !isMobile
          })}
        >
          <BaseErrorBoundary>
            {props.children}
          </BaseErrorBoundary>

          <Footer
            showMobileFooter={isShowMobileFooter}
            showDesktopFooter={isShowDesktopFooter}
          />
        </div>
      </div>

      {isShowMobileTabbar && (
        <TabBar isShowSlot={false} size={"big"}/>
      )}

      {props.showToolboxConfig !== false && (
        <Toolbox
          showToolboxConfig={props.showToolboxConfig}
          onClickToDownload={props.onClickToDownload}
          onClickToOpenTelegramManager={props.onClickToOpenTelegramManager}
          onClickToOpenTelegramService={props.onClickToOpenTelegramService}
        />
      )}

      {isUILoading && (
        <BaseLoadingOverlay/>
      )}

    </BaseStyledPageTemplate>
  )
}
