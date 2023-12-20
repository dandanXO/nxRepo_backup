import { IBoardData } from "../index";
import { ReactElement, ReactNode } from "react";
import { MobileCommonTotalTable as CMobileCommonTotalTable } from "../env/coco/MobileCommonTotalTable";
import { MobileCommonTotalTable as PMobileCommonTotalTable } from "../env/pernambucana/MobileCommonTotalTable";
import { MobileCommonTotalTable as WMobileCommonTotalTable } from "../env/wild/MobileCommonTotalTable";
import { MobileCommonTotalTable as RMobileCommonTotalTable } from "../env/riojungle/MobileCommonTotalTable";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export interface IBoardContainer {
  children: ReactNode | ReactNode[];
}

export const MobileCommonTotalTable = (props: IBoardData) => {
  return renderByPlatform({
    "wild777bet": <WMobileCommonTotalTable {...props} />,
    "coco777bet": <CMobileCommonTotalTable {...props} />,
    "riojungle777bet": <RMobileCommonTotalTable {...props} />
  }, <PMobileCommonTotalTable {...props} />)
}

