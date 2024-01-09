import {renderByPlatform} from "../../utils/renderByPlatform";
import {InviteButton as PInviteButton} from "./env/pernambucana/InviteButton";
import {InviteButton as WInviteButton} from "./env/wild/InviteButton";
import {InviteButton as CInviteButton} from "./env/coco/InviteButton";
export const InviteButton = renderByPlatform({
  "wild777bet": WInviteButton,
  "u1": CInviteButton,
}, PInviteButton)
