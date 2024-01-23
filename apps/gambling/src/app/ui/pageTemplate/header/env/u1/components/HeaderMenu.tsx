import { ReactElement } from "react";
import cx from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import { usePageNavigate } from "../../../../../router/hooks/usePageNavigate";
import {RootState} from "../../../../../../reduxStore";

const MenuItem = (props: {
  menuText: string | ReactElement | ReactElement[],
  className?: string,
  onClick?: () => void
}) => {
  return (
    <button
      onClick={props.onClick}
      className={cx("mb-5 text-base text-[var(--white)] hover:underline hover:text-[var(--secondary-assistant)] text-center flex justify-center items-center", props.className)}
    >
      {props.menuText}
    </button>
  )

}
export const HeaderMenu = () => {
  const { onClickToTelegram, onClickToCheckInDaily, onClickToFirstDeposit, onClickToDepositCashback, onClickToCompanyProfile, onClickToLicense } = usePageNavigate();
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);
  const recharge_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_cashback_rate);
  return (
    <div className="py-6 h-[205px] z-10 w-full fixed top-[66px] left-0 flex items-center bg-[var(--background-submenu)]">
      <div className="w-[158px]"></div>

      <div className="basis-[116px] shrink-0 flex flex-col justify-between self-start">
        <MenuItem menuText={'Telegrama'} className="" onClick={onClickToTelegram} />
        <MenuItem menuText={'Sobre nós'} className="" onClick={onClickToCompanyProfile} />
        <MenuItem menuText={'Gaming Curaçao'} className="" onClick={onClickToLicense} />
      </div>

      <div className="basis-[116px] shrink-0 flex flex-col justify-between self-start">
        <MenuItem menuText={'Check-in'} onClick={onClickToCheckInDaily}/>
        <MenuItem menuText={<div className="">Primeiro depósito<span className="ml-1 text-[var(--state-error-main)]">+{recharge_first_cashback_rate}</span></div>} onClick={onClickToFirstDeposit}/>
        <MenuItem menuText={<div className="">Recarregar Cashback<span className="ml-1 text-[var(--state-error-main)]">+{recharge_cashback_rate}</span></div>} onClick={onClickToDepositCashback}/>
      </div>

    </div>
  )
}
