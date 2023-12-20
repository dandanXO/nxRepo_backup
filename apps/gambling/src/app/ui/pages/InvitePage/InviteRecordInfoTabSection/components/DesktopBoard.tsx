import { IBoardData } from "../index";
import { ReactElement, ReactNode } from "react";
import { DesktopBoard as CDesktopBoard } from "../env/coco/DesktopBoard";
import { DesktopBoard as PDesktopBoard } from "../env/pernambucana/DesktopBoard";
import { DesktopBoard as WDesktopBoard } from "../env/wild/DesktopBoard";
import { DesktopBoard as RDesktopBoard } from "../env/riojungle/DesktopBoard";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export interface IBoardContainer {
  children: ReactNode | ReactNode[];
}

export const DesktopBoard = (props: IBoardData) => {
  return renderByPlatform({
    "wild777bet": <WDesktopBoard {...props} />,
    "coco777bet": <CDesktopBoard {...props} />,
    "riojungle777bet": <RDesktopBoard {...props} />
  }, <PDesktopBoard {...props} />)
}

