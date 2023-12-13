import styled from "styled-components";
import {environment} from "../../../../../environments/environment";
import {BaseStyledPageTemplate} from "../../base/BaseStyledPageTemplate";
import {IUseSingletonPageTemplateConfig, useSingletonPageTemplateConfig} from "../../hooks/useSingletonPageTemplateConfig";
import {ErrorBoundary} from "react-error-boundary";
import React from "react";
import {Footer} from "../../../pageTemplateLayers/footer/coco/Footer";
import {TabBar} from "../../../pageTemplateLayers/tabBar";
import {Toolbox} from "../../../components/Toolbox";
import {UserLoginStatusModal} from "../../../pageTemplateLayers/modals/UserLoginStatusModal";
import {LoadingLogo} from "../../../components/Logos/LoadingLogo";
import {LoadingBar} from "../../../components/LoadingBar";
import {BaseLoadingOverlay} from "../../base/BaseLoadingOverlay";
import {useSelector} from "react-redux";
import {RootState} from "../../../../reduxStore";
import {BaseErrorBoundary} from "../../base/BaseErrorBoundary";
import {TShowToolboxConfig} from "../../base/types";
import {renderByRWD} from "../../../utils/renderByRWD";
import useBreakpoint from "../../../hooks/useBreakpoint";
import {HeaderMobile} from "../../../pageTemplateLayers/header/env/coco/HeaderMobile";
import {Header} from "../../../pageTemplateLayers/header/env/coco/Header";
import {MobileHeader} from "../../../pageTemplateLayers/header/env/riojungle/MobileHeader";
import {DesktopHeader} from "../../../pageTemplateLayers/header/env/riojungle/DesktopHeader";
import {MenuDrawer} from "../../../pageTemplateLayers/drawers/MenuDrawer/env/riojungle/MenuDrawer";

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
    isShowTabbar,
  } = useSingletonPageTemplateConfig(props);

  const isUILoading = useSelector((state: RootState) => state.app.isUILoading);

  const device = useBreakpoint();

  return (
    <BaseStyledPageTemplate>
      {renderByRWD({
        mobile: (
          <MobileHeader/>
        ),
        tablet: (
          <MobileHeader/>
        ),
        desktop: (
          <div className={"h-24 fixed top-0 left-0 right-0 z-10"}>
            <DesktopHeader/>
          </div>
        )
      }, device)}

      <div className={""}>
        {isShowDesktopMenuDrawer && (
          <div className={"w-[248px] fixed top-24 left-0"}>
            <MenuDrawer/>
          </div>
        )}
        <div className={"ml-[248px] mt-24"}>
          <BaseErrorBoundary>
            {props.children}
          </BaseErrorBoundary>

          <Footer
            showMobileFooter={isShowMobileFooter}
            showDesktopFooter={isShowDesktopFooter}
          />
        </div>
      </div>

      {isShowTabbar && (
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
