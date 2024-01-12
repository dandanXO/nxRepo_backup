import {renderByUVersion} from "../../utils/renderByUVersion";
import {ToolButton as WToolButton} from "../../components-bs/Buttons/env/wild/ToolButton";
import {ToolButton as CToolButton} from "../../components-bs/Buttons/env/u1/ToolButton";
import {ToolButton as RToolButton} from "../../components-bs/Buttons/env/u2/ToolButton";

export const ToolButton = renderByUVersion({
  "wild777bet": WToolButton,
  "u1": CToolButton,
  "u2": RToolButton,
}, CToolButton)
