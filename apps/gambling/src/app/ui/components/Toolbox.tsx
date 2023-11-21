import {environment} from "../../../environments/environment";
import React from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import styled from "styled-components";
import {useLocation} from "react-router";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import {renderByPlatform} from "../utils/renderByPlatform";
import {ToolButton as PToolButton} from "../components/Buttons/env/pernambucana/ToolButton"
import {ToolButton as WToolButton} from "../components/Buttons/env/wild/ToolButton"
import {ToolButton as CToolButton} from "../components/Buttons/env/coco/ToolButton"

const FixedToolContainer = styled.div`
    width: 80px;
    background-color: rgba(119, 136, 120, 0.4);
    border-radius: 11px 0 0 11px;
    overflow: hidden;
    z-index: 10;
`

export type IToolbox = {
  showToolbox?: boolean;
  onClickToDownload: () => void;
  onClickToOpenTelegramManager: () => void;
  onClickToOpenTelegramService: () => void;
}

const ToolButton = renderByPlatform({
  "wild777bet": WToolButton,
  "coco777bet": CToolButton,
}, PToolButton)

export const Toolbox = (props: IToolbox) => {
  const {isMobile} = useBreakpoint();
  const isShowToolbox = props.showToolbox === undefined ? true : props.showToolbox;
  const location = useLocation();
  const isMobileShowDownload = location.pathname === PageOrModalPathEnum.IndexPage;

  return (
    <>
      {isMobile && isShowToolbox ? (
        // <div className={"z-10 fixed right-[-23px] bottom-[68px]"}>
        <div className={"z-10 fixed right-[16px] bottom-[68px]"}>
          {isMobileShowDownload && (
            <div className={"mb-2"}>
              <ToolButton className={""} onClick={props.onClickToDownload}>
                <img alt={"download"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-download.png`}/>
              </ToolButton>
            </div>
          )}
          <div>
            <ToolButton className={""} onClick={props.onClickToOpenTelegramService}>
              <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
            </ToolButton>
          </div>
        </div>
      ): isShowToolbox ? (
        <div className={"fixed right-[0px] bottom-[68px] text-white w-[100px] flex flex-col p-[10px] z-20"}>

          <FixedToolContainer className={"flex flex-col justify-center items-center px2 py-3 mb-4"}>
            <div className={"text-xs font-light"}>Download</div>
            <ToolButton
              onClick={props.onClickToDownload}>
              <img alt={"download"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-download.png`}/>
            </ToolButton>

          </FixedToolContainer>

          <FixedToolContainer className={"flex flex-col justify-center items-center p-4"}>
            <div className={"text-xs font-lights mb-1"}>Contate-nos</div>

            <div className={"mb-1"}>
              <ToolButton
                onClick={props.onClickToOpenTelegramService}>
                <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
              </ToolButton>
              <div className={"text-xs font-light"}>Serviço</div>
            </div>

            <div className={"mb-1"}>
              <ToolButton
                onClick={props.onClickToOpenTelegramManager}>
                <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
              </ToolButton>
              <div className={"text-xs font-lights"}>Gerente</div>
            </div>
          </FixedToolContainer>
        </div>
      ): null}
    </>
  )
}
