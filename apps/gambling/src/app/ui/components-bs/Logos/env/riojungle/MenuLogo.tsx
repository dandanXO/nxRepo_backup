import {environment} from "../../../../../../environments/environment";
import React from "react";
import {twMerge} from "tailwind-merge";
import {ILogo} from "../types";

export const MenuLogo = (props: ILogo) => {
  return (
    <img
      alt="logo-menu"
      // className="max-w-[56px] max-h-[56px]"
      className={twMerge("w-[148px] h-[58px]", props.className)}
      src={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/logo.png`}
    />
  )
}
