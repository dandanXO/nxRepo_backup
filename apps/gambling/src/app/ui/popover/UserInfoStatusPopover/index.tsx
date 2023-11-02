import {Button} from "../../components/Button";
import cx from "classnames";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useSelector} from "react-redux";

import {
  accountPromotedSwingSelector,
  totalBalanceSheetSelector,
  totalReasableSelector
} from "../../../reduxStore/appSlice";
import {useLazyGetInviteRewardDataQuery, useLazyGetUnsettleInviteRewardDataQuery} from "../../../external";
import {useEffect, useMemo} from "react";

type IUserInfoStatusPopover = {
  close: () => void;
}
export const UserInfoStatusPopover = (props: IUserInfoStatusPopover) => {
  const navigate = useNavigate();

  // const { userAmount, user: {withdrawAmount} } = useSelector((state: RootState) => state.app.userStore as IUserStore)
  const totalBalanceSheetValue = useSelector(totalBalanceSheetSelector);
  console.log("totalBalanceSheetValue", totalBalanceSheetValue);
  const totalReasableValue = useSelector(totalReasableSelector);
  // const accountPromotedSwingValue = useSelector(accountPromotedSwingSelector);

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

  // console.log("inviteInfo", inviteInfo);
  // console.log("inviteUnsettle", inviteUnsettle);

  useEffect(() => {
    triggerGetInviteReward({});
    triggerGetUnsettleInviteReward({})
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

  return (
    <div className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full"} onClick={(event) => {
      props.close();
    }}>
      <div
        className={cx("fixed right-[144px] top-[100px] z-10 w-[400px] bg-[#090B0F] rounded-2xl p-4 flex flex-col flex-between text-sm", {

        })}
      >
        <Button className={"text-sm mb-4"} onClick={() => {
          navigate(PageOrModalPathEnum.SettingPage);
        }}>
          <span>Modificar dados</span>
          <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
        </Button>

        <Button className={"text-sm mb-4"} onClick={() => {
          navigate(PageOrModalPathEnum.GameRecordPage);
        }}>
          <span>Registro do jogo</span>
          <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
        </Button>

        <section className={"border-utils-orange flex flex-col min-h-[150px] mb-4"} onClick={() => {
          navigate(PageOrModalPathEnum.WalletPage);
        }}>
          <Button className={"text-sm mb-4 !shadow-none"} >
            <span className={"text-base"}>Total Da Conta</span>
            <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
          </Button>

          <div className={"flex flex-row justify-center items-center px-7"}>
            <div className={"flex flex-col mr-24"}>
              <span className={"text-[#FF7D03] text-lg"}>{totalBalanceSheetValue}</span>
              <span className={"text-white"}>Balanço Total</span>
            </div>
            <div className={"flex flex-col"}>
              <span className={"text-[#FF7D03] text-lg"}>{totalReasableValue}</span>
              <span className={"text-white"}>Retirável Total</span>
            </div>
          </div>
        </section>

        <section className={"border-utils-orange flex flex-col p-2"} onClick={() => {
          navigate(PageOrModalPathEnum.VIPGradePage)
        }}>
          <Button className={"text-sm mb-4 !shadow-none"}>
            <span className={"text-base"}>Conta Promovida</span>
            <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
          </Button>

          <div className={"flex flex-row justify-between items-start px-3"}>
            <div className={"flex flex-col mr-2"}>
              <span className={"text-[#FF7D03] text-lg"}>{totalPrize}</span>
              <span className={"text-white"}>Prêmio total</span>
            </div>

            <div className={"w-[1px] h-[30px] bg-[rgba(255,255,255,.1)] self-center mr-1"}/>

            <div className={"flex flex-col  mr-2"}>
              <span className={"text-[#FF7D03] text-lg"}>{bonusAwaitingSettlement}</span>
              <span className={"text-white"}>
              Bônus aguardando
              <br/>
              liquidação
            </span>
            </div>

            <div className={"w-[1px] h-[30px] bg-[rgba(255,255,255,.1)] self-center mr-1"}/>

            <div className={"flex flex-col"}>
              {/*<span className={"text-[#FF7D03] text-lg"}>{accountPromotedSwingValue}</span>*/}
              <span className={"text-[#FF7D03] text-lg"}>{fullWithdrawable}</span>
              <span className={"text-white"}>Retirável Total</span>
            </div>
          </div>
        </section>



      </div>
    </div>

  )
}
