import { IDailyType } from "../index";
import { DesktopDailyTable as CDesktopDailyTable } from "../env/u1/DesktopDailyTable";
import { DesktopDailyTable as PDesktopDailyTable } from "../env/pernambucana/DesktopDailyTable";
import { DesktopDailyTable as WDesktopDailyTable } from "../env/wild/DesktopDailyTable";
import { DesktopDailyTable as RDesktopDailyTable } from "../env/u2/DesktopDailyTable";
import { renderByUVersion } from "../../../../utils/renderByUVersion";

export const DesktopDailyTable = (props: IDailyType) => {
  return renderByUVersion({
    "wild777bet": <WDesktopDailyTable {...props} />,
    "u1": <CDesktopDailyTable {...props} />,
    "u2": <RDesktopDailyTable {...props} />
  }, <PDesktopDailyTable {...props} />)
}

