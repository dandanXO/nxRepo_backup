import { InitialChargeContent as CInitialChargeContent } from "./env/u1/InitialChargeContent";
import { InitialChargeContent as PInitialChargeContent } from "./env/pernambucana/InitialChargeContent";
import { InitialChargePage as RioInitialChargePage } from './env/u2';

import { InitialChargeContent as WInitialChargeContent } from "./env/wild/InitialChargeContent";
import { renderByUVersion } from "../../utils/renderByUVersion";



export const InitialChargePage = () => {

  return renderByUVersion({
    "wild777bet": <WInitialChargeContent />,
    "u1": <CInitialChargeContent />,
    "u2": <RioInitialChargePage />,
  }, <PInitialChargeContent />)
}
