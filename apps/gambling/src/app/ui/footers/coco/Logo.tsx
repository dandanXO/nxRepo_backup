import {environment} from "../../../../environments/environment";
import React from "react";

export const Logo = () => {
  return (
    <img className={"w-[50px] h-[50px]"} src={`assets/${environment.assetPrefix}/LOGO.png`}/>
  )
}
