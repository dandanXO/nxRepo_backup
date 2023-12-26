import {environment} from "../../../../../../../environments/environment";
import React from "react";

export const MenuLogo = () => {
  return (
    <img
      alt="logo-menu"
      // className="max-w-[56px] max-h-[56px]"
      className="max-w-[160px] max-h-[66px]"
      src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-menu.png`}
    />
  )
}
