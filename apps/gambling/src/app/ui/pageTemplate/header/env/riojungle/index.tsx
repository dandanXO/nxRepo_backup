import {renderByRWD} from "../../../../utils/renderByRWD";
import {MobileHeader} from "./MobileHeader";
import {DesktopHeader} from "./DesktopHeader";
import React from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";

export const Header = () => {
  const device = useBreakpoint();
  return (
    <>
      {renderByRWD({
        mobile: (
          <MobileHeader/>
        ),
        tablet: (
          <MobileHeader/>
        ),
        desktop: (
          <div className={"h-24 fixed top-0 left-0 right-0 z-10"}>
            <DesktopHeader/>
          </div>
        )
      }, device)}
    </>
  )
}
