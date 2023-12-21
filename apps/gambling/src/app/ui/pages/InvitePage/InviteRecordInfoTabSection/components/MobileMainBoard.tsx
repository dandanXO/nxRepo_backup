import { IBoardData } from "../index";
import { ReactElement, ReactNode } from "react";
import { MobileMainBoard as CMobileMainBoard } from "../env/coco/MobileMainBoard";
import { MobileMainBoard as PMobileMainBoard } from "../env/pernambucana/MobileMainBoard";
import { MobileMainBoard as WMobileMainBoard } from "../env/wild/MobileMainBoard";
import { MobileMainBoard as RMobileMainBoard } from "../env/riojungle/MobileMainBoard";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export interface IBoardContainer {
  children: ReactNode | ReactNode[];
}

export const MobileMainBoard = (props: IBoardData) => {
  return renderByPlatform({
    "wild777bet": <WMobileMainBoard {...props} />,
    "coco777bet": <CMobileMainBoard {...props} />,
    "riojungle777bet": <RMobileMainBoard {...props} />
  }, <PMobileMainBoard {...props} />)
}

