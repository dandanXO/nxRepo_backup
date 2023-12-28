import { ArrowRight } from "../../../../Icons/ArrowRight";
import cx from 'classnames';
export const DepositNextPageBackButton = (props: { className?: string; onClick: () => void }) => {
  return (
    <button
      className={cx(`w-[264px] h-[45px] rounded-md
      bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]
      text-[var(--white)] flex justify-between items-center px-3.5 py-2 text-lg
      `, props.className)}
      onClick={props.onClick}
    >
      <span>Ja Pago</span>
      <ArrowRight className="w-[24px] h-[24px]"/>
    </button>
  )
};
