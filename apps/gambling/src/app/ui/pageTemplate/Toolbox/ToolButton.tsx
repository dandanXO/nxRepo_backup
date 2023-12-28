import {renderByPlatform} from "../../utils/renderByPlatform";
import {ToolButton as WToolButton} from "../../components-bs/theme/Buttons/env/wild/ToolButton";
import {ToolButton as CToolButton} from "../../components-bs/theme/Buttons/env/coco/ToolButton";
import {ToolButton as RToolButton} from "../../components-bs/theme/Buttons/env/riojungle/ToolButton";

export const ToolButton = renderByPlatform({
  "wild777bet": WToolButton,
  "coco777bet": CToolButton,
  "riojungle777bet": RToolButton,
}, CToolButton)
