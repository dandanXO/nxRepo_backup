import { IBoardData, IMobileTotalTable, ITabType } from "../index";
import { ReactElement, ReactNode } from "react";
import { MobileTotalTable as CMobileTotalTable } from "../env/coco/MobileTotalTable";
import { MobileTotalTable as PMobileTotalTable } from "../env/pernambucana/MobileTotalTable";
import { MobileTotalTable as WMobileTotalTable } from "../env/wild/MobileTotalTable";
import { MobileTotalTable as RMobileTotalTable } from "../env/riojungle/MobileTotalTable";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export const MobileTotalTable = (props: IMobileTotalTable) => {
  return renderByPlatform({
    "wild777bet": <WMobileTotalTable {...props} />,
    "u1": <CMobileTotalTable {...props} />,
    "u2": <RMobileTotalTable {...props} />
  }, <PMobileTotalTable {...props} />)
}

