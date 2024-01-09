import {renderByUVersion} from "../../utils/renderByUVersion";
import {PersonalControl as PernambucanaPersonalControl} from "./env/pernambucana/PersonalControl";
import {PersonalControl as WildPersonalControl} from "./env/wild/components/PersonalControl";
import {PersonalControl as CocoPersonalControl} from "./env/coco/PersonalControl";

export const PersonalControl = renderByUVersion({
  "wild777bet" : WildPersonalControl,
  "u1": CocoPersonalControl,
}, CocoPersonalControl)
