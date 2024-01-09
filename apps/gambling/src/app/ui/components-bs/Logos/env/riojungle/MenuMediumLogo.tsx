import {environment} from "../../../../../../environments/environment";
import React from "react";
import {twMerge} from "tailwind-merge";
import {ILogo} from "../types";

export const MenuMediumLogo = (props: ILogo) => {
  return (
    <img
      alt="logo-menu"
      // className="max-w-[56px] max-h-[56px]"
      className={twMerge("w-[102px] h-[40px]", props.className)}
      src={`assets/${environment.uVersion}/${environment.assetVersionPrefix}/logo.png`}
    />
  )
}
