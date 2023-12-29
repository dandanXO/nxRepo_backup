import {environment} from "../../../../../../environments/environment";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {TShowToolboxConfig} from "../../../base/types";
import {FixedToolStyle} from "../../FixedToolStyle";
import {ToolButton} from "../../ToolButton";

const FixedToolContainer = styled.div`
    width: 80px;
    border-radius: 11px 0 0 11px;
    overflow: hidden;
    z-index: 10;
    ${FixedToolStyle}
`

export type IToolbox = {
  showToolboxConfig?: TShowToolboxConfig;
  onClickToDownload: () => void;
  onClickToOpenTelegramService: () => void;
  onClickToOpenTelegramManager: () => void;
}

export const Toolbox = (props: IToolbox) => {
  const { showToolboxConfig } = props;
  const mobileShowToolbox = showToolboxConfig === undefined || ( typeof showToolboxConfig !== 'boolean' && showToolboxConfig.mobile !== false);
  const desktopShowToolbox = showToolboxConfig === undefined || ( typeof showToolboxConfig !== 'boolean' && showToolboxConfig.desktop !== false)

  // 預設關
  const mobileShowDownload = showToolboxConfig !== undefined && typeof showToolboxConfig !== 'boolean' && showToolboxConfig.mobile !== undefined && typeof showToolboxConfig.mobile !== 'boolean' && showToolboxConfig.mobile.download === true;
  // 預設關
  const mobileShowCustomerService =  showToolboxConfig !== undefined && typeof showToolboxConfig !== 'boolean' && showToolboxConfig.mobile !== undefined && typeof showToolboxConfig.mobile !== 'boolean' && showToolboxConfig.mobile.customerService === true;

  const desktopShowDownload = showToolboxConfig === undefined || (typeof showToolboxConfig !== 'boolean' && (showToolboxConfig.desktop === undefined || (typeof showToolboxConfig.desktop !=='boolean' && showToolboxConfig.desktop.download !==false)))
  const desktopShowCustomerService = showToolboxConfig === undefined || (typeof showToolboxConfig !== 'boolean' && (showToolboxConfig.desktop === undefined || (typeof showToolboxConfig.desktop !=='boolean' && showToolboxConfig.desktop.customerService !==false)))
  const desktopShowManage = showToolboxConfig === undefined || (typeof showToolboxConfig !== 'boolean' && (showToolboxConfig.desktop === undefined || (typeof showToolboxConfig.desktop !=='boolean' && showToolboxConfig.desktop.manager !==false)))

  const {isMobile} = useBreakpoint();
  const dispatch=useDispatch();

  return (
    <>
      {
        isMobile && mobileShowToolbox && (mobileShowDownload || mobileShowCustomerService) && (
          <div className={"z-10 fixed right-[16px] bottom-[68px]"}>
            {mobileShowDownload && (
              <div className={"mb-2"}>
                <ToolButton isMobile={isMobile} className={""} onClick={props.onClickToDownload}>
                  <img alt={"download"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-download.png`}/>
                </ToolButton>
              </div>
            )}
            {
              mobileShowCustomerService && (
                <div>
                  <ToolButton isMobile={isMobile} className={""} onClick={() => {
                    dispatch(appSlice.actions.setShowTelegramDetailContactModal(true))
                  }}>
                    <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/customer-service-2.png`} />
                  </ToolButton>
                </div>
              )
            }
          </div>
        )
      }

      {
        !isMobile && desktopShowToolbox && (desktopShowDownload || desktopShowCustomerService || desktopShowManage) && (
          <div className={"fixed right-0 bottom-[68px] text-white flex flex-col z-20"}>

            {
              desktopShowDownload && (
                <FixedToolContainer className={"flex flex-col justify-center items-center px2 py-3 mb-4"}>
                  <div className={"text-xs font-light mb-2"}>Download</div>
                  <ToolButton
                    onClick={props.onClickToDownload}>
                    <img alt={"download"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-download.png`}/>
                  </ToolButton>
                </FixedToolContainer>
              )
            }

            {
              (desktopShowCustomerService || desktopShowManage) && (
                <FixedToolContainer className={"flex flex-col justify-center items-center p-4 text-center"}>
                  <div className={"text-xs font-lights mb-2 whitespace-nowrap"}>Contate-nos</div>
                  {
                    desktopShowCustomerService && (
                      <div className={"mb-2"}>
                        <ToolButton
                          className={"mb-1"}
                          onClick={props.onClickToOpenTelegramService}
                        >
                          <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
                        </ToolButton>
                        <div className={"text-xs font-light"}>Serviço</div>
                      </div>
                    )
                  }

                  {
                    desktopShowManage && (
                      <div className={""}>
                        <ToolButton
                          className={"mb-1"}
                          onClick={props.onClickToOpenTelegramManager}
                        >
                          <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
                        </ToolButton>
                        <div className={"text-xs font-lights"}>Gerente</div>
                      </div>
                    )
                  }
                </FixedToolContainer>
              )
            }
          </div>
        )
      }
    </>
  )
}
