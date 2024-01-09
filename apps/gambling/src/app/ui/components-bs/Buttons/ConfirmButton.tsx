import {renderByPlatform} from "../../utils/renderByPlatform";
import {ConfirmButton as CConfirmButton} from "./env/coco/ConfirmButton";
import {ConfirmButton as PConfirmButton} from "./env/pernambucana/ConfirmButton";
import {ConfirmButton as WConfirmButton} from "./env/wild/ConfirmButton";

export const ConfirmButton = renderByPlatform({
  "u1": CConfirmButton,
  "wild777bet": WConfirmButton
}, PConfirmButton);
