import {environment} from "../../../../../../environments/environment";
import React from "react";
import {twMerge} from "tailwind-merge";

type IMenuSmallLogo = {
  className?: string;
}
export const MenuSmallLogo = (props: IMenuSmallLogo) => {
  return (
    <img
      alt="logo-menu"
      // className="max-w-[56px] max-h-[56px]"
      className={twMerge("w-[40px] h-[40px]", props.className)}
      src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-mobile.png`}
    />
  )
}
