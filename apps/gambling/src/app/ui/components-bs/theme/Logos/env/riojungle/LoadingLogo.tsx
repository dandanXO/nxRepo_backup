import React from "react";
import {environment} from "../../../../../../../environments/environment";
import {twMerge} from "tailwind-merge";

type ILogo = {
  className?: string;
}
export const LoadingLogo = (props: ILogo) => {
  return (
    <img alt="logo-loading" className={twMerge(
      "w-[320px] h-[128px]",
      props.className
    )} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo.png`}/>
    // <img className={twMerge("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
