import {environment} from "../../../../environments/environment";
import {BackNavigation as CocoBackNavigation} from "./env/coco/BackNavigation";
import {BackNavigation as PernambucanaBackNavigation} from "./env/pernambucana/BackNavigation";

export const BackNavigation = environment.assetPrefix === "coco777bet" ? CocoBackNavigation : PernambucanaBackNavigation;
