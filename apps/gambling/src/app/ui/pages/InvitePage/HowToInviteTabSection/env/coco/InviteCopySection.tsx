import {CopyInputUrlItem} from "../../../../../components/CopyInputUrlItem";
import {useLazyGetInviteRewardDataQuery} from "../../../../../../external";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../reduxStore";

export const InviteCopySection = () => {
  const {isLogin} = useSelector((state: RootState) => state.app)
  const [triggerGetInviteReward, { currentData: inviteInfo, isFetching: isInviteInfoFetching }] =
    useLazyGetInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  useEffect(()=>{
    if(isLogin) triggerGetInviteReward({});
  },[isLogin])

  const inviteUrl = inviteInfo?.data?.inviteUrl || '';

  return (
    <div className="w-full text-center">
      <p className="mt-5 text-[var(--secondary-assistant)] text-xs leading-4 mb-4">Copie o link e cole-o no navegador do seu computador para abri-lo em seu computador</p>
      <CopyInputUrlItem url={isLogin ? inviteUrl : location.href} className={'rounded break-all text-left'} urlClassName="py-2 text-sm" buttonClassName={'rounded'} />
    </div>
  )
}
