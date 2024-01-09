import {renderByUVersion} from "../../utils/renderByUVersion";
import {InviteButton as PInviteButton} from "./env/pernambucana/InviteButton";
import {InviteButton as WInviteButton} from "./env/wild/InviteButton";
import {InviteButton as CInviteButton} from "./env/coco/InviteButton";
export const InviteButton = renderByUVersion({
  "wild777bet": WInviteButton,
  "u1": CInviteButton,
}, PInviteButton)
