import {environment} from "../../../environments/environment";
import React from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import styled from "styled-components";

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
export const Toolbox = (props: IToolbox) => {
  const {isMobile} = useBreakpoint();
  const isShowToolbox = props.showToolbox === undefined ? true : props.showToolbox;

  return (
    <>
      {isMobile && isShowToolbox ? (
        <div className={"z-10 fixed right-[-23px] bottom-[68px]"}>
          <div className={"mb-2"}>
            <button className={""} onClick={props.onClickToDownload}>
              <img alt={"download"} className="w-[50%]" src={`assets/${environment.assetPrefix}/icon-download.png`}/>
            </button>
          </div>

          <div>
            <button className={""} onClick={props.onClickToOpenTelegramService}>
              <img alt={"telegram"} className="w-[50%]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
            </button>
          </div>
        </div>
      ): isShowToolbox ? (
        <div className={"fixed right-[0px] bottom-[68px] text-white w-[100px] flex flex-col p-[10px] z-20"}>
          <FixedToolContainer className={"flex flex-col justify-center items-center px2 py-3 mb-4"}>
            <div className={"text-xs font-light"}>Download</div>

            <button
              onClick={props.onClickToDownload}>
              <img alt={"download"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-download.png`}/>
            </button>

          </FixedToolContainer>

          <FixedToolContainer className={"flex flex-col justify-center items-center p-4"}>
            <div className={"text-xs font-lights mb-1"}>Contate-nos</div>

            <div className={"mb-1"}>
              <button
                onClick={props.onClickToOpenTelegramService}>
                <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
              </button>
              <div className={"text-xs font-light"}>Serviço</div>
            </div>

            <div className={"mb-1"}>
              <button
                onClick={props.onClickToOpenTelegramManager}>
                <img alt={"telegram"} className="w-[40px]" src={`assets/${environment.assetPrefix}/icon-telegram.png`}/>
              </button>
              <div className={"text-xs font-lights"}>Gerente</div>
            </div>
          </FixedToolContainer>
        </div>
      ): null}
    </>
  )
}
