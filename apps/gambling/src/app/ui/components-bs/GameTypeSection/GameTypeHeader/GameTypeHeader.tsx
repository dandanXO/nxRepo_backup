import { renderByPlatform } from "../../../utils/renderByPlatform";
import { GameTypeHeader as PGameTypeHeader } from "../env/pernambucana/GameTypeHeader"
import { GameTypeHeader as WGameTypeHeader } from "../env/wild/GameTypeHeader"
import { GameTypeHeader as CGameTypeHeader } from "../env/coco/GameTypeHeader"
import { GameTypeHeader as RGameTypeHeader } from "../env/riojungle/GameTypeHeader"

export const GameTypeHeader = renderByPlatform({
  "wild777bet": WGameTypeHeader,
  "coco777bet": CGameTypeHeader,
  "riojungle777bet": RGameTypeHeader
}, CGameTypeHeader)
