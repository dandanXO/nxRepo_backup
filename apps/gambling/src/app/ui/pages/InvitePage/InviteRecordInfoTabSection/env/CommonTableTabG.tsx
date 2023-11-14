import {CommonTableTabG as Pernambucana} from "./pernambucana/CommonTableTabG";
import {environment} from "../../../../../../environments/environment";
import {ImageTab as Coco} from "../../../../components/TabItem/ImageTab";
export const CommonTableTabG = environment.assetPrefix === "coco777bet" ? Coco : Pernambucana;
