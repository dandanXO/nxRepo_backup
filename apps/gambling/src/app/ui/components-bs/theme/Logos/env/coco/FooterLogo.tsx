import React from "react";
import {environment} from "../../../../../../../environments/environment";
import cx from "classnames";

type IFooterLogo = {
  className?: string;
}
export const FooterLogo = (props: IFooterLogo) => {
  return (
    <img alt="logo-footer" className={cx("w-[50px] h-[50px]",
    )} src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/logo-footer.png`}/>
  )
}
