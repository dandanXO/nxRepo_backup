import { IMobileDailyTable } from "../index";
import { MobileDailyTable as CMobileDailyTable } from "../env/coco/MobileDailyTable";
import { MobileDailyTable as PMobileDailyTable } from "../env/pernambucana/MobileDailyTable";
import { MobileDailyTable as WMobileDailyTable } from "../env/wild/MobileDailyTable";
import { MobileDailyTable as RMobileDailyTable } from "../env/riojungle/MobileDailyTable";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export const MobileDailyTable = (props: IMobileDailyTable) => {
  return renderByPlatform({
    "wild777bet": <WMobileDailyTable {...props} />,
    "coco777bet": <CMobileDailyTable {...props} />,
    "riojungle777bet": <RMobileDailyTable {...props} />
  }, <PMobileDailyTable {...props} />)
}

