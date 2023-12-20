import {WithdrawMobileInput as PCWithdrawMobileInput} from "./env/pernambucana/WithdrawMobileInput";
import {WithdrawMobileInput as CWithdrawMobileInput} from "./env/coco/WithdrawMobileInput";
import {WithdrawMobileInput as WWithdrawMobileInput} from "./env/wild/WithdrawMobileInput";
import {WithdrawMobileInput as RWithdrawMobileInput} from "./env/riojungle/WithdrawMobileInput";

import {renderByPlatform} from "../../utils/renderByPlatform";

// export const MobileInput = WithdrawMobileInput;
export const MobileInput = renderByPlatform({
  "coco777bet": CWithdrawMobileInput,
  "wild777bet": WWithdrawMobileInput,
  "riojungle777bet": RWithdrawMobileInput
}, PCWithdrawMobileInput);
