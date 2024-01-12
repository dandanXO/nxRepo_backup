import {renderByUVersion} from "../../utils/renderByUVersion";
import {PersonalControl as PernambucanaPersonalControl} from "./env/pernambucana/PersonalControl";
import {PersonalControl as WildPersonalControl} from "./env/wild/components/PersonalControl";
import {PersonalControl as CocoPersonalControl} from "./env/u1/PersonalControl";

export const PersonalControl = renderByUVersion({
  "wild777bet" : WildPersonalControl,
  "u1": CocoPersonalControl,
}, CocoPersonalControl)
