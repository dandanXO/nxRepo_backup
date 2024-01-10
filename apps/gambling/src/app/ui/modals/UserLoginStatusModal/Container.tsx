import {renderByUVersion} from "../../utils/renderByUVersion";

import {Container as PContainer} from "./env/pernambucana/Container";
import {Container as WContainer} from "./env/wild/Container";
import {Container as CContainer} from "./env/coco/Container";
import {Container as RContainer} from "./env/riojungle/Container";
import {IContainer} from "./types";

export const Container = (props: IContainer) => {
  return renderByUVersion({
    "wild777bet": <WContainer {...props}/>,
    "u1": <CContainer {...props}/>,
    "u2": <RContainer {...props}/>,
  }, <CContainer {...props}/>);
}
