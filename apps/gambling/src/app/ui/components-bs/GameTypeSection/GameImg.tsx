import {renderByPlatform} from "../../utils/renderByPlatform";
import {GameImg as PGameImg} from "./env/pernambucana/GameImg"
import {GameImg as WGameImg} from "./env/wild/GameImg"
import {GameImg as CGameImg} from "./env/coco/GameImg"
export const GameImg = renderByPlatform({
  "wild777bet": WGameImg,
  "coco777bet": CGameImg,
// }, PGameImg)
}, CGameImg)
