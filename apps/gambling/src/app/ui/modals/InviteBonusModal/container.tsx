import {renderByPlatform} from "../../utils/renderByPlatform";
import {Container as WContainer} from "./env/wild/Container";
import {Container as CContainer} from "./env/coco/Container";
import {Container as PContainer} from "./env/pernambucana/Container";

export const Container = renderByPlatform({
  "wild777bet": WContainer,
  "coco777bet": CContainer,
}, PContainer)
