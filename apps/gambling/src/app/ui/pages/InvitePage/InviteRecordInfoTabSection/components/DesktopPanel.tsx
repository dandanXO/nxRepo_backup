import { IBoardData, IDesktopPanel } from "../index";
import { ReactElement, ReactNode } from "react";
import { DesktopPanel as CDesktopPanel } from "../env/coco/DesktopPanel";
import { DesktopPanel as PDesktopPanel } from "../env/pernambucana/DesktopPanel";
import { DesktopPanel as WDesktopPanel } from "../env/wild/DesktopPanel";
import { DesktopPanel as RDesktopPanel } from "../env/riojungle/DesktopPanel";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export const DesktopPanel = (props: IDesktopPanel) => {
  return renderByPlatform({
    "wild777bet": <WDesktopPanel {...props} />,
    "u1": <CDesktopPanel {...props} />,
    "riojungle777bet": <RDesktopPanel {...props} />
  }, <PDesktopPanel {...props} />)
}

