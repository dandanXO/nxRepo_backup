import { useLazyGetInviteRewardDataQuery, useLazyGetUnsettleInviteRewardDataQuery } from "../../external";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import { useEffect, useMemo } from "react";


export const useInviteReward = () => {
  const [triggerGetInviteReward, { currentData: inviteInfo, isFetching: isInviteInfoFetching }] =
    useLazyGetInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const [triggerGetUnsettleInviteReward, { currentData: inviteUnsettle, isFetching: isInviteUnsettleFetching }] =
    useLazyGetUnsettleInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const { isLogin } = useSelector((state: RootState) => state.app);


  useEffect(() => {
    if(isLogin) {
      triggerGetInviteReward({});
      triggerGetUnsettleInviteReward({})
    }
  }, [])

  // A = /japi/invite/userInvite/queryInviteRewardData
  // B = /japi/invite/userInvite/queryUnsettleInviteRewardData
  const totalPrize = useMemo(() => {
    if(!inviteInfo || !inviteUnsettle) return 0;
    return parseFloat(((inviteInfo?.data?.reward + inviteUnsettle?.data?.reward + inviteUnsettle?.data?.firstRechargeReward)/100).toFixed(2))
  }, [inviteInfo, inviteUnsettle]);

  const bonusAwaitingSettlement = useMemo(() => {
    if(!inviteUnsettle) return 0
    return parseFloat(((inviteUnsettle?.data?.reward + inviteUnsettle?.data?.firstRechargeReward)/100).toFixed(2))
  }, [inviteUnsettle]);

  const fullWithdrawable = useMemo(() => {
    if(!inviteInfo) return 0
    return parseFloat(((inviteInfo?.data?.reward)/100).toFixed(2))
  }, [inviteInfo])

  return {
    totalPrize,
    bonusAwaitingSettlement,
    fullWithdrawable
  }
}
