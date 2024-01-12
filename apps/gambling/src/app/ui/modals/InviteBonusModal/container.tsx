import {renderByUVersion} from "../../utils/renderByUVersion";
import {Container as WContainer} from "./env/wild/Container";
import {Container as CContainer} from "./env/u1/Container";
import {Container as PContainer} from "./env/pernambucana/Container";

export const Container = renderByUVersion({
  "wild777bet": WContainer,
  "u1": CContainer,
}, PContainer)
