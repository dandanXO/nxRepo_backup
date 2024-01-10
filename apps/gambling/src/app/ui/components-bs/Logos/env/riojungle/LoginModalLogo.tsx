import React from "react";
import {environment} from "../../../../../../environments/environment";
import cx from "classnames";
import {twMerge} from "tailwind-merge";

type ILoginModalLogo = {
  className?: string;
}
export const LoginModalLogo = (props: ILoginModalLogo) => {
  return (
    <img alt="logo-login-modal"  className={twMerge("w-[196px] h-[77px]",
      )} src={`assets/${environment.uVersion}/${environment.mvVersion}/logo.png`}/>
    // <img className={twMerge("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
