import {WithdrawMobileInput as PCWithdrawMobileInput} from "./env/pernambucana/WithdrawMobileInput";
import {WithdrawMobileInput as CWithdrawMobileInput} from "./env/u1/WithdrawMobileInput";
import {WithdrawMobileInput as WWithdrawMobileInput} from "./env/wild/WithdrawMobileInput";
import {WithdrawMobileInput as RWithdrawMobileInput} from "./env/u2/WithdrawMobileInput";

import {renderByUVersion} from "../../utils/renderByUVersion";

// export const MobileInput = WithdrawMobileInput;
export const MobileInput = renderByUVersion({
  "u1": CWithdrawMobileInput,
  "wild777bet": WWithdrawMobileInput,
  "u2": RWithdrawMobileInput
}, PCWithdrawMobileInput);
