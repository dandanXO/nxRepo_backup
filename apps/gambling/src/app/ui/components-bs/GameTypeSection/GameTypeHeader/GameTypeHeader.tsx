import { renderByUVersion } from "../../../utils/renderByUVersion";
import { GameTypeHeader as PGameTypeHeader } from "../env/pernambucana/GameTypeHeader"
import { GameTypeHeader as WGameTypeHeader } from "../env/wild/GameTypeHeader"
import { GameTypeHeader as CGameTypeHeader } from "../env/coco/GameTypeHeader"
import { GameTypeHeader as RGameTypeHeader } from "../env/riojungle/GameTypeHeader"

export const GameTypeHeader = renderByUVersion({
  "wild777bet": WGameTypeHeader,
  "u1": CGameTypeHeader,
  "u2": RGameTypeHeader
}, CGameTypeHeader)
