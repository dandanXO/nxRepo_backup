import {WithdrawMobileInput as PCWithdrawMobileInput} from "./env/pernambucana/WithdrawMobileInput";
import {WithdrawMobileInput as CWithdrawMobileInput} from "./env/coco/WithdrawMobileInput";
import {WithdrawMobileInput as WWithdrawMobileInput} from "./env/wild/WithdrawMobileInput";
import {WithdrawMobileInput as RWithdrawMobileInput} from "./env/riojungle/WithdrawMobileInput";

import {renderByPlatform} from "../../utils/renderByPlatform";

// export const MobileInput = WithdrawMobileInput;
export const MobileInput = renderByPlatform({
  "u1": CWithdrawMobileInput,
  "wild777bet": WWithdrawMobileInput,
  "u2": RWithdrawMobileInput
}, PCWithdrawMobileInput);
