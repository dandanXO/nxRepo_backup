import React from "react";
import {environment} from "../../../../../../environments/environment";
import cx from "classnames";
import {ILogo} from "../types";
import {twMerge} from "tailwind-merge";

export const FooterLogo = (props: ILogo) => {
  return (
    <img
      alt="logo-footer"
      className={twMerge("w-[50px] h-[50px]", props.className)}
      src={`assets/${environment.uVersion}/${environment.mvVersion}/logo-footer.png`}/>
  )
}
