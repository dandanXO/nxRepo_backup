import {renderByPlatform} from "../../utils/renderByPlatform";
import {ToolButton as WToolButton} from "../../components-bs/theme/Buttons/env/wild/ToolButton";
import {ToolButton as CToolButton} from "../../components-bs/theme/Buttons/env/coco/ToolButton";

export const ToolButton = renderByPlatform({
  "wild777bet": WToolButton,
  "coco777bet": CToolButton,
  "riojungle777bet": CToolButton,
}, CToolButton)
