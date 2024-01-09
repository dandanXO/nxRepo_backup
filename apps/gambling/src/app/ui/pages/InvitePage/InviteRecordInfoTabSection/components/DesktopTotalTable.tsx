import { ITotal } from "../index";
import { DesktopTotalTable as CDesktopTotalTable } from "../env/coco/DesktopTotalTable";
import { DesktopTotalTable as PDesktopTotalTable } from "../env/pernambucana/DesktopTotalTable";
import { DesktopTotalTable as WDesktopTotalTable } from "../env/wild/DesktopTotalTable";
import { DesktopTotalTable as RDesktopTotalTable } from "../env/riojungle/DesktopTotalTable";
import { renderByUVersion } from "../../../../utils/renderByUVersion";

export const DesktopTotalTable = (props: ITotal & { type: string }) => {
  return renderByUVersion({
    "wild777bet": <WDesktopTotalTable {...props} />,
    "u1": <CDesktopTotalTable {...props} />,
    "u2": <RDesktopTotalTable {...props} />
  }, <PDesktopTotalTable {...props} />)
}

