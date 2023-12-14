import {renderByRWD} from "../../../../utils/renderByRWD";
import {MobileHeader} from "./MobileHeader";
import {DesktopHeader} from "./DesktopHeader";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {IHeader} from "../../types/IHeader";
import {IMobileHeader} from "../../types/IMobileHeader";

export const Header = (props: IHeader | IMobileHeader) => {
  const device = useBreakpoint();
  return (
    <>
      {renderByRWD({
        mobile: (
          <MobileHeader {...props as IMobileHeader}/>
        ),
        tablet: (
          <MobileHeader {...props as IMobileHeader}/>
        ),
        desktop: (
          <DesktopHeader {...props as IHeader}/>
        )
      }, device)}
    </>
  )
}
