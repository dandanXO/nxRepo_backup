import {renderByUVersion} from "../../utils/renderByUVersion";
import {GameImg as PGameImg} from "./env/pernambucana/GameImg"
import {GameImg as WGameImg} from "./env/wild/GameImg"
import {GameImg as CGameImg} from "./env/coco/GameImg"
export const GameImg = renderByUVersion({
  "wild777bet": WGameImg,
  "u1": CGameImg,
// }, PGameImg)
}, CGameImg)
