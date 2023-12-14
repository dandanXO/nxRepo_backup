import {renderByPlatform} from "../../../utils/renderByPlatform";
import {GameTypeHeader as PGameTypeHeader} from "../env/pernambucana/GameTypeHeader"
import {GameTypeHeader as WGameTypeHeader} from "../env/wild/GameTypeHeader"
import {GameTypeHeader as CGameTypeHeader} from "../env/coco/GameTypeHeader"

export const GameTypeHeader = renderByPlatform({
  "wild777bet": WGameTypeHeader,
  "coco777bet": CGameTypeHeader,
// }, PGameTypeHeader)
}, CGameTypeHeader)
