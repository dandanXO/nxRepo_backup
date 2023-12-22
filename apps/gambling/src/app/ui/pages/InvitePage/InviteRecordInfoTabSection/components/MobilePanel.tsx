import { IMobilePanel } from "../index";
import { ReactElement, ReactNode } from "react";
import { MobilePanel as CMobilePanel } from "../env/coco/MobilePanel";
import { MobilePanel as PMobilePanel } from "../env/pernambucana/MobilePanel";
import { MobilePanel as WMobilePanel } from "../env/wild/MobilePanel";
import { MobilePanel as RMobilePanel } from "../env/riojungle/MobilePanel";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export const MobilePanel = (props: IMobilePanel) => {
  return renderByPlatform({
    "wild777bet": <WMobilePanel {...props} />,
    "coco777bet": <CMobilePanel {...props} />,
    "riojungle777bet": <RMobilePanel {...props} />
  }, <PMobilePanel {...props} />)
}

