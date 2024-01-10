import {renderByUVersion} from "../../utils/renderByUVersion";
import {ToolButton as WToolButton} from "../../components-bs/Buttons/env/wild/ToolButton";
import {ToolButton as CToolButton} from "../../components-bs/Buttons/env/coco/ToolButton";
import {ToolButton as RToolButton} from "../../components-bs/Buttons/env/riojungle/ToolButton";

export const ToolButton = renderByUVersion({
  "wild777bet": WToolButton,
  "u1": CToolButton,
  "u2": RToolButton,
}, CToolButton)
