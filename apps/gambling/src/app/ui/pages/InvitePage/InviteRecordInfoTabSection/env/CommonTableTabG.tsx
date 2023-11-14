import {CommonTableTabG as Pernambucana} from "./pernambucana/CommonTableTabG";
import {CommonTableTabG as Coco} from "./coco/CommonTableTabG";
import {environment} from "../../../../../../environments/environment";
export const CommonTableTabG = environment.assetPrefix === "coco777bet" ? Coco : Pernambucana;
