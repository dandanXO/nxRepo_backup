
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {TelegramMobileModal} from "../../../../modals/TelegramMobileModal";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {TShowToolboxConfig} from "../../../base/types";
import {FixedToolStyle} from "../../FixedToolStyle";
import {ToolButton} from "../../ToolButton";
import {twMerge} from "tailwind-merge";
import {environment} from "../../../../../../environments/environment";

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
  className?: string;
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

  const {isDesktop, isMobile} = useBreakpoint();
  const dispatch=useDispatch();
  const {isShowTelegramMobileModal} = useSelector((state: RootState) => state.app);

  return (
    <>
      {/*NOTICE: refactor em */}
      {
        isShowTelegramMobileModal && (
          <TelegramMobileModal
            onClickToOpenTelegramService={props.onClickToOpenTelegramService}
            onClickToOpenTelegramManager={props.onClickToOpenTelegramManager}
            onClose={() => {
              dispatch(appSlice.actions.setShowTelegramMobileModal(false))
            }}
          />
        )
      }

      {
        !isDesktop && mobileShowToolbox && (mobileShowDownload || mobileShowCustomerService) && (
          <div className={twMerge(props.className)}>
            {mobileShowDownload && (
              <div className={"mb-2"}>
                <ToolButton isMobile={!isDesktop} className='bg-[#8547EB]' onClick={props.onClickToDownload}>
                  <img alt={"download"} className={twMerge("w-8", isMobile && "w-6")} src={`assets/${environment.assetPrefix}/icon-download-mobile.png`}/>
                </ToolButton>
              </div>
            )}
            {
              mobileShowCustomerService && (
                <div>
                  <ToolButton isMobile={!isDesktop} className='bg-[#10B98F]' onClick={() => {
                    dispatch(appSlice.actions.setShowTelegramMobileModal(true))
                  }}>
                    <img alt={"telegram"} className={twMerge("w-8", isMobile && "w-6")} src={`assets/${environment.assetPrefix}/icon-telegram-mobile.png`} />
                  </ToolButton>
                </div>
              )
            }
          </div>
        )
      }

      {
        isDesktop && desktopShowToolbox && (desktopShowDownload || desktopShowCustomerService || desktopShowManage) && (
          <div className={"fixed right-0 bottom-[300px] text-white flex flex-col z-20"}>

            {
              desktopShowDownload && (
                <FixedToolContainer className={"flex flex-col justify-center items-center px2 py-3 mb-4 bg-[#8547EB]"}>
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
                <FixedToolContainer className={"flex flex-col justify-center items-center p-4 text-center bg-[#10B98F]"}>
                  <div className={"text-xs font-lights mb-2 whitespace-nowrap"}>Contate-nos</div>
                  {
                    desktopShowCustomerService && (
                      <div>
                        <ToolButton
                          className={"mb-1"}
                          onClick={props.onClickToOpenTelegramService}
                        >
                          <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
                        </ToolButton>
                      </div>
                    )
                  }

                  {/*{*/}
                  {/*  desktopShowManage && (*/}
                  {/*    <div className={""}>*/}
                  {/*      <ToolButton*/}
                  {/*        className={"mb-1"}*/}
                  {/*        onClick={props.onClickToOpenTelegramManager}*/}
                  {/*      >*/}
                  {/*        <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>*/}
                  {/*      </ToolButton>*/}
                  {/*      <div className={"text-xs font-lights"}>Gerente</div>*/}
                  {/*    </div>*/}
                  {/*  )*/}
                  {/*}*/}
                </FixedToolContainer>
              )
            }
          </div>
        )
      }
    </>
  )
}
