import { IMobileDailyTable } from "../index";
import { MobileDailyTable as CMobileDailyTable } from "../env/u1/MobileDailyTable";
import { MobileDailyTable as PMobileDailyTable } from "../env/pernambucana/MobileDailyTable";
import { MobileDailyTable as WMobileDailyTable } from "../env/wild/MobileDailyTable";
import { MobileDailyTable as RMobileDailyTable } from "../env/u2/MobileDailyTable";
import { renderByUVersion } from "../../../../utils/renderByUVersion";

export const MobileDailyTable = (props: IMobileDailyTable) => {
  return renderByUVersion({
    "wild777bet": <WMobileDailyTable {...props} />,
    "u1": <CMobileDailyTable {...props} />,
    "u2": <RMobileDailyTable {...props} />
  }, <PMobileDailyTable {...props} />)
}

