import {renderByPlatform} from "../../utils/renderByPlatform";
import {PersonalControl as PernambucanaPersonalControl} from "./env/pernambucana/PersonalControl";
import {PersonalControl as WildPersonalControl} from "./env/wild/components/PersonalControl";
import {PersonalControl as CocoPersonalControl} from "./env/coco/PersonalControl";

export const PersonalControl = renderByPlatform({
  "wild777bet" : WildPersonalControl,
  "u1": CocoPersonalControl,
}, CocoPersonalControl)
