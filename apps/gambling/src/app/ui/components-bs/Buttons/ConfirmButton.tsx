import {renderByUVersion} from "../../utils/renderByUVersion";
import {ConfirmButton as CConfirmButton} from "./env/u1/ConfirmButton";
import {ConfirmButton as PConfirmButton} from "./env/pernambucana/ConfirmButton";
import {ConfirmButton as WConfirmButton} from "./env/wild/ConfirmButton";

export const ConfirmButton = renderByUVersion({
  "u1": CConfirmButton,
  "wild777bet": WConfirmButton
}, PConfirmButton);
