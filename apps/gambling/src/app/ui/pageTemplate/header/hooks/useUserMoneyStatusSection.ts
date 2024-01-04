import {usePageNavigate} from "../../../router/hooks/usePageNavigate";
import {useSelector} from "react-redux";
import {useAutoUpdateBalance} from "../../../hooks/useAutoUpdateBalance";
import {RootState} from "../../../../reduxStore";
import {totalBalanceSheetSelector} from "../../../../reduxStore/appSlice";

export const useUserMoneyStatusSection = () => {
  const {onClickToWallet} = usePageNavigate();

  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);

  const { update } = useAutoUpdateBalance({
    autoWindowFocusRefresh: false,
  });

  const isUserMoneyStatusLoading = useSelector((state: RootState) => state.app.isUserMoneyStatusLoading)
  return {
    onClickToWallet,
    totalBalanceSheetValue,
    update,
    isUserMoneyStatusLoading,

  }
}
