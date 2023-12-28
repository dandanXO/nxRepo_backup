import React from "react";
import {environment} from "../../../../../../../environments/environment";
import cx from "classnames";
import {twMerge} from "tailwind-merge";

type ILoginModalLogo = {
  className?: string;
}
export const LoginModalLogo = (props: ILoginModalLogo) => {
  return (
    <img alt="logo-login-modal"  className={twMerge("w-[51.25px] h-[20px]",
      )} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo.png`}/>
    // <img className={twMerge("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
