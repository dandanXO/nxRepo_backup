import {PageOrModalPathEnum} from "../../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../../environments/environment";
import React from "react";
import {useNavigate} from "react-router";
import {usePageNavigate} from "../../../../../router/hooks/usePageNavigate";

export const WebsiteLogo = () => {
  const {onClickToIndex} = usePageNavigate();
  return (
    <div className={"w-[200px]"}>
      <a>
        <img onClick={() => {
          onClickToIndex()
        }} alt={"logo"} src={`assets/${environment.uVersion}/LOGO.png`}/>
      </a>
    </div>
  )
}
