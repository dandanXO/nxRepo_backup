import { ReactElement } from "react";
import cx from 'classnames';
import { usePageNavigate } from "../../../hooks/usePageNavigate";

const MenuItem = (props: {
  menuText: string | ReactElement | ReactElement[],
  className?: string,
  onClick?: () => void
}) => {
  return (
    <button
      onClick={props.onClick}
      className={cx("mb-5 text-base text-[var(--white)] hover:underline hover:text-[var(--secondary-main-from)] text-center flex justify-center items-center", props.className)}
    >
      {props.menuText}
    </button>
  )

}
export const HeaderMenu = () => {
  const { onClickToTelegram, onClickToCheckInDaily, onClickToFirstDeposit, onClickToDepositCashback } = usePageNavigate();

  return (
    <div className="py-6 h-[190px] z-10 w-full fixed top-[66px] left-0 flex items-center bg-[#040404e0]">
      <div className="w-[80px]"></div>
      <div className=" basis-[120px] self-start">
        <MenuItem menuText={'Telegrama'} className="" onClick={onClickToTelegram} />
      </div>
      <div className="flex flex-col basis-[120px] justify-between self-start">
        <MenuItem menuText={'Check-in'} onClick={onClickToCheckInDaily}/>
        <MenuItem menuText={<div className="leading-none">Primeiro depósito<span className="">+20%</span></div>} onClick={onClickToFirstDeposit}/>
        <MenuItem menuText={<div className="leading-none">Recarregar Cashback<span className="">+20%</span></div>} onClick={onClickToDepositCashback}/>
      </div>

    </div>
  )
}
