import {environment} from "../../../../environments/environment";
import {GameBackNavigation as CocoGameBackNavigation} from "./env/coco/CocoGameBackNavigation";
import {PernambucanaGameBackNavigation as PernambucanaGameBackNavigation} from "./env/pernambucana/PernambucanaGameBackNavigation";

export const GameBackNavigation = environment.assetPrefix === "coco777bet" ? CocoGameBackNavigation : PernambucanaGameBackNavigation;
