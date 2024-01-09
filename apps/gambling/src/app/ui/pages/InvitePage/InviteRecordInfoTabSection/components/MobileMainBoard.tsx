import { IBoardData } from "../index";
import { ReactElement, ReactNode } from "react";
import { MobileMainBoard as CMobileMainBoard } from "../env/coco/MobileMainBoard";
import { MobileMainBoard as PMobileMainBoard } from "../env/pernambucana/MobileMainBoard";
import { MobileMainBoard as WMobileMainBoard } from "../env/wild/MobileMainBoard";
import { MobileMainBoard as RMobileMainBoard } from "../env/riojungle/MobileMainBoard";
import { renderByUVersion } from "../../../../utils/renderByUVersion";

export interface IBoardContainer {
  children: ReactNode | ReactNode[];
}

export const MobileMainBoard = (props: IBoardData) => {
  return renderByUVersion({
    "wild777bet": <WMobileMainBoard {...props} />,
    "u1": <CMobileMainBoard {...props} />,
    "u2": <RMobileMainBoard {...props} />
  }, <PMobileMainBoard {...props} />)
}

