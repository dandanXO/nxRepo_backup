import { useAllowLoginRouterRules } from "../../router/hooks/useAllowLoginRouterRules";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { RechargeActivityContent as CRechargeActivityContent } from './env/coco/RechargeActivityContent';
import { RechargeActivityContent as PRechargeActivityContent } from './env/pernambucana/RechargeActivityContent';
import { RechargeActivityContent as WRechargeActivityContent } from './env/wild/RechargeActivityContent';
import { RechargeActivityPage as RioRechargeActivityPage } from './env/riojungle';


export const RechargeActivityPage = () => {
  useAllowLoginRouterRules();

  return renderByPlatform({
    "wild777bet": <WRechargeActivityContent />,
    "u1": <CRechargeActivityContent />,
    "u2": <RioRechargeActivityPage />,
  }, <PRechargeActivityContent />)
}
