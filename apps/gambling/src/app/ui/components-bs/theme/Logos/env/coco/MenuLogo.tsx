import {environment} from "../../../../../../../environments/environment";
import React from "react";
import {ILogo} from "../types";
import {twMerge} from "tailwind-merge";

export const MenuLogo = (props: ILogo) => {
  return (
    <img
      alt="logo-menu"
      // className="max-w-[56px] max-h-[56px]"
      className={twMerge("max-w-[160px] max-h-[66px]", props.className)}
      src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-menu.png`}
    />
  )
}
