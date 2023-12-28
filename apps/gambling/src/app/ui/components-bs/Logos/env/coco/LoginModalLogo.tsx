import React from "react";
import {environment} from "../../../../../../environments/environment";
import cx from "classnames";
import {twMerge} from "tailwind-merge";
import {ILogo} from "../types";
export const LoginModalLogo = (props: ILogo) => {
  return (
    <img
      alt="logo-login-modal"
      className={twMerge("w-[76px] h-[76px]", props.className)}
         src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-login-modal.png`}/>
    // <img className={twMerge("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
