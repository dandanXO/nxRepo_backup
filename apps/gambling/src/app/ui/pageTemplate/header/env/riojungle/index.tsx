import {renderByRWD} from "../../../../utils/renderByRWD";
import {MobileHeader} from "./MobileHeader";
import {DesktopHeader} from "./DesktopHeader";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {IHeader} from "../../types/IHeader";

export const Header = (props: IHeader) => {
  const device = useBreakpoint();
  return (
    <>
      {renderByRWD({
        mobile: (
          <MobileHeader {...props}/>
        ),
        tablet: (
          <MobileHeader {...props}/>
        ),
        desktop: (
          <div className={"h-24 fixed top-0 left-0 right-0 z-10"}>
            <DesktopHeader {...props}/>
          </div>
        )
      }, device)}
    </>
  )
}
