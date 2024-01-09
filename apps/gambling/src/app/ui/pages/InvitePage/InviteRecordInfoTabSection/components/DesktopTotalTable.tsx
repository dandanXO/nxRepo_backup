import { ITotal } from "../index";
import { DesktopTotalTable as CDesktopTotalTable } from "../env/coco/DesktopTotalTable";
import { DesktopTotalTable as PDesktopTotalTable } from "../env/pernambucana/DesktopTotalTable";
import { DesktopTotalTable as WDesktopTotalTable } from "../env/wild/DesktopTotalTable";
import { DesktopTotalTable as RDesktopTotalTable } from "../env/riojungle/DesktopTotalTable";
import { renderByPlatform } from "../../../../utils/renderByPlatform";

export const DesktopTotalTable = (props: ITotal & { type: string }) => {
  return renderByPlatform({
    "wild777bet": <WDesktopTotalTable {...props} />,
    "u1": <CDesktopTotalTable {...props} />,
    "riojungle777bet": <RDesktopTotalTable {...props} />
  }, <PDesktopTotalTable {...props} />)
}

