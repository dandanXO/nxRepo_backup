import { InitialChargeContent as CInitialChargeContent } from "./env/coco/InitialChargeContent";
import { InitialChargeContent as PInitialChargeContent } from "./env/pernambucana/InitialChargeContent";
import { InitialChargePage as RioInitialChargePage } from './env/riojungle';

import { InitialChargeContent as WInitialChargeContent } from "./env/wild/InitialChargeContent";
import { renderByPlatform } from "../../utils/renderByPlatform";



export const InitialChargePage = () => {

  return renderByPlatform({
    "wild777bet": <WInitialChargeContent />,
    "coco777bet": <CInitialChargeContent />,
    "riojungle777bet": <RioInitialChargePage />,
  }, <PInitialChargeContent />)
}
