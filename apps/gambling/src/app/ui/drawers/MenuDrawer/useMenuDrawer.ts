import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";

export const useMenuDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  const onClickToFirstDeposit = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.InitialChargePage)
    }
  }
  const onClickToDepositCashback = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.RechargeActivityPage)
    }
  }

  const onClickToInvite = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.InvitePage)
    }
  }

  const onClickToVipGrade = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.VIPGradePage)
    }
  }

  const onClickToCheckInDaily = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.DailySignInPage)
    }
  }
  const onClickToTelegram = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.TelegramPage)
    }
  }
  return {
    onClickToFirstDeposit,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
  }
}
