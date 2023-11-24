import { CopyInputUrlItem } from "../../../../../components/CopyInputUrlItem";
import { useLazyGetInviteRewardDataQuery } from "../../../../../../external";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../reduxStore";
import useBreakpoint from "apps/gambling/src/app/ui/hooks/useBreakpoint";

export const InviteCopySection = () => {
  const { isLogin } = useSelector((state: RootState) => state.app);
  const { isMobile } = useBreakpoint();

  const [triggerGetInviteReward, { currentData: inviteInfo, isFetching: isInviteInfoFetching }] =
    useLazyGetInviteRewardDataQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  useEffect(() => {
    if (isLogin) triggerGetInviteReward({});
  }, [isLogin])

  const inviteUrl = inviteInfo?.data?.inviteUrl || '';

  return (
    <div className="w-full text-center sm:text-left">
      <p className="my-3.5 sm:mb-2 text-[var(--secondary-assistant)] sm:text-white text-sm md:text-xl">{`${!isMobile ? 'Passo 1:' : ''}Clique no botão para copiar o link do convite`}</p>
      <CopyInputUrlItem url={isLogin ? inviteUrl : location.href} className={'rounded break-all text-left'} urlClassName="py-2 text-sm" buttonClassName={'rounded'} />
    </div>
  )
}
