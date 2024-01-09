import React from "react";
import {environment} from "../../../../../../environments/environment";
import {twMerge} from "tailwind-merge";

type IFooterLogo = {
  className?: string;
}
export const FooterLogo = (props: IFooterLogo) => {
  return (
    <img
      alt="logo-footer"
      className={twMerge("w-[82px] h-[32px]", props.className)}
      src={`assets/${environment.uVersion}/${environment.mvVersion}/logo.png`}
    />
  )
}
