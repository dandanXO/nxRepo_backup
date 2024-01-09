import {renderByPlatform} from "../../utils/renderByPlatform";
import {ToolButton as WToolButton} from "../../components-bs/Buttons/env/wild/ToolButton";
import {ToolButton as CToolButton} from "../../components-bs/Buttons/env/coco/ToolButton";
import {ToolButton as RToolButton} from "../../components-bs/Buttons/env/riojungle/ToolButton";

export const ToolButton = renderByPlatform({
  "wild777bet": WToolButton,
  "u1": CToolButton,
  "riojungle777bet": RToolButton,
}, CToolButton)
