import { IBoardData, IDesktopPanel } from "../index";
import { ReactElement, ReactNode } from "react";
import { DesktopPanel as CDesktopPanel } from "../env/coco/DesktopPanel";
import { DesktopPanel as PDesktopPanel } from "../env/pernambucana/DesktopPanel";
import { DesktopPanel as WDesktopPanel } from "../env/wild/DesktopPanel";
import { DesktopPanel as RDesktopPanel } from "../env/riojungle/DesktopPanel";
import { renderByUVersion } from "../../../../utils/renderByUVersion";

export const DesktopPanel = (props: IDesktopPanel) => {
  return renderByUVersion({
    "wild777bet": <WDesktopPanel {...props} />,
    "u1": <CDesktopPanel {...props} />,
    "u2": <RDesktopPanel {...props} />
  }, <PDesktopPanel {...props} />)
}

