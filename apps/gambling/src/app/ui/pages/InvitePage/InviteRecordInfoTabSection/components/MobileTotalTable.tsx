import { IBoardData, IMobileTotalTable, ITabType } from "../index";
import { ReactElement, ReactNode } from "react";
import { MobileTotalTable as CMobileTotalTable } from "../env/u1/MobileTotalTable";
import { MobileTotalTable as PMobileTotalTable } from "../env/pernambucana/MobileTotalTable";
import { MobileTotalTable as WMobileTotalTable } from "../env/wild/MobileTotalTable";
import { MobileTotalTable as RMobileTotalTable } from "../env/u2/MobileTotalTable";
import { renderByUVersion } from "../../../../utils/renderByUVersion";

export const MobileTotalTable = (props: IMobileTotalTable) => {
  return renderByUVersion({
    "wild777bet": <WMobileTotalTable {...props} />,
    "u1": <CMobileTotalTable {...props} />,
    "u2": <RMobileTotalTable {...props} />
  }, <PMobileTotalTable {...props} />)
}

