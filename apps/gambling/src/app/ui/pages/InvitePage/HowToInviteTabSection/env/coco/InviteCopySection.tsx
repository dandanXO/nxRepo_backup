import {CopyLinkItem} from "../../../../../components/CopyLinkItem";
import {useLazyGetInviteRewardDataQuery} from "../../../../../../external";
import {useEffect} from "react";

export const InviteCopySection = () => {
  const [triggerGetInviteReward, { currentData: inviteInfo, isFetching: isInviteInfoFetching }] =
    useLazyGetInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  useEffect(()=>{
    triggerGetInviteReward({});
  },[])

  const inviteUrl = inviteInfo?.data?.inviteUrl || '';

  return (
    <div className="w-full text-center">
      <p className="mt-4 text-[#ffd624] text-xs leading-none mb-2">Copie o link e cole-o no navegador do seu computador para abri-lo em seu computador</p>
      <CopyLinkItem url={inviteUrl} className={'rounded'} urlClassName="py-2 text-sm" buttonClassName={'rounded'} />
    </div>
  )
}