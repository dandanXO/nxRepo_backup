import {environment} from "../../../../../../environments/environment";
import React from "react";
import {twMerge} from "tailwind-merge";

type IMenuLogo = {
  className?: string;
}
export const MenuLogo = (props: IMenuLogo) => {
  return (
    <img
      alt="logo-menu"
      className={twMerge("w-[148px] h-[58px]", props.className)}
      src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-menu.png`}
    />
  )
}
