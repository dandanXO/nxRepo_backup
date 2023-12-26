import React from "react";
import {environment} from "../../../../../../../environments/environment";
import cx from "classnames";

type ILoginModalLogo = {
  className?: string;
}
export const LoginModalLogo = (props: ILoginModalLogo) => {
  return (
    <img alt="logo-login-modal"  className={cx("w-[76px] h-[76px]",
      // "border-solid border-white border-[2px] rounded-[10px]"
      )} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-login-modal.png`}/>
    // <img className={twMerge("w-[50px] h-[50px]", props.className)} src={AssetMappingCoco["logo"]}/>
  )
}
