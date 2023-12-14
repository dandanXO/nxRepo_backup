import {renderByPlatform} from "../../utils/renderByPlatform";
import {PersonalControl as PernambucanaPersonalControl} from "./env/pernambucana/PersonalControl";
import {PersonalControl as WildPersonalControl} from "./env/wild/components/PersonalControl";
import {PersonalControl as CocoPersonalControl} from "./env/coco/PersonalControl";
import {PersonalControl as RPersonalControl} from "./env/riojungle/PersonalControl";



export const PersonalControl = renderByPlatform({
  "wild777bet" : WildPersonalControl,
  "coco777bet": CocoPersonalControl,
  "riojungle777bet": RPersonalControl,
}, CocoPersonalControl)
