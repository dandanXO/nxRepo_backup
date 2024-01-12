import {useSelector} from "react-redux";
import {
  accountPromotedSwingSelector, accountPromotedWithdrawableSelector,
  toDepositAccountRemovableSelector,
  toDepositAccountSwingSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../../reduxStore/appSlice";
import cx from "classnames";

import {useEffect, useState} from "react";
import useBreakpoint from "../../../pageTemplate/hooks/useBreakpoint";

import { TotalSectionContainer as PTotalSectionContainer } from "../env/pernambucana/TotalSectionContainer";
import { TotalSectionContainer as WTotalSectionContainer } from "../env/wild/TotalSectionContainer";
import { TotalSectionContainer as CTotalSectionContainer } from "../env/u1/TotalSectionContainer";
import {renderByUVersion} from "../../../utils/renderByUVersion";

export const TotalSectionContainer = () => {
  const {isMobile} = useBreakpoint();

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  const totalReasableValue = useSelector(totalReasableSelector);
  const toDepositAccountSwingValue = useSelector(toDepositAccountSwingSelector);
  const toDepositAccountRemovableValue = useSelector(toDepositAccountRemovableSelector);
  const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);
  const accountPromotedWithdrawableValue = useSelector(accountPromotedWithdrawableSelector);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if(isMobile) {
      setExpand(false)
    } else {
      setExpand(true)
    }
  }, [isMobile])

  return renderByUVersion({
    "wild777bet": (
      <WTotalSectionContainer />
    ),
    "u1": (
      <CTotalSectionContainer />
    ),
  }, (
    <PTotalSectionContainer
      expand={expand}
      setExpand={setExpand}
      totalBalanceSheetValue={totalBalanceSheetValue}
      totalReasableValue={totalReasableValue}
      accountPromotedSwingValue={accountPromotedSwingValue}
      accountPromotedWithdrawableValue={accountPromotedWithdrawableValue}
    />
  ))

}
