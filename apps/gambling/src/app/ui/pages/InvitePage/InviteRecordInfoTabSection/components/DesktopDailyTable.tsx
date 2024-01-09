import { IDailyType } from "../index";
import { DesktopDailyTable as CDesktopDailyTable } from "../env/coco/DesktopDailyTable";
import { DesktopDailyTable as PDesktopDailyTable } from "../env/pernambucana/DesktopDailyTable";
import { DesktopDailyTable as WDesktopDailyTable } from "../env/wild/DesktopDailyTable";
import { DesktopDailyTable as RDesktopDailyTable } from "../env/riojungle/DesktopDailyTable";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export const DesktopDailyTable = (props: IDailyType) => {
  return renderByPlatform({
    "wild777bet": <WDesktopDailyTable {...props} />,
    "u1": <CDesktopDailyTable {...props} />,
    "u2": <RDesktopDailyTable {...props} />
  }, <PDesktopDailyTable {...props} />)
}

