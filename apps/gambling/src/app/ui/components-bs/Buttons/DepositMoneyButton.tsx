
import cx from 'classnames';
import useBreakpoint from '../../hooks/useBreakpoint';

interface IDepositButton {
  isActive: boolean;
  isShowRate: boolean;
  rechargeValue: string;
  rate: string;
  className?: string;
  rechargeClassName?: string;
  activeRechargeClassName?: string;
  rateClassName?: string;
  activeRateClassName?: string;
  isRateTag?: boolean;
  rateTagClassName?: string;
  bgClassName?: string;
  activeBgClassName?: string;
  onClick: () => void;
}

export const DepositMoneyButton = (props: IDepositButton) => {
  const { isMobile } = useBreakpoint();

  const {
    isActive, isShowRate,
    rechargeValue, rate,
    className,
    rechargeClassName, activeRechargeClassName,
    rateClassName, activeRateClassName,
    isRateTag, rateTagClassName,
    bgClassName, activeBgClassName
  } = props;

  const bgStyle = bgClassName ? bgClassName : "rounded-2xl border-[1px] border-[var(--medium)] bg-[var(--medium)] text-white"
  const activeBgStyle = activeBgClassName ? activeBgClassName : "border-[1px] rounded-2xl border-white bg-gradient-to-b from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)] text-[var(--main)]"

  return (
    <button
      className={cx(`flex flex-col lg:flex-row font-bold flex-1 mb-2 overflow-hidden w-full`,
        " min-h-[55px] whitespace-nowrap",
        {
          [bgStyle]: !isActive,
          [activeBgStyle]: isActive,
          'relative': isRateTag,
        }, className
      )}
      onClick={() => {
        props.onClick && props.onClick()
      }}
    >
      <div className={cx("value items-baseline lg:mr-2", {
        [rechargeClassName ? rechargeClassName : "text-white"]: !isActive,
        [activeRechargeClassName ? activeRechargeClassName : "text-main-primary-varient"]: isActive,
      })}>
        {rechargeValue}
      </div>


      {isShowRate &&
        (isRateTag
          ? (<div className={cx(rateTagClassName)}>{rate}</div>)
          : (<div className={cx("", {
            [rateClassName ? rateClassName : "text-main-secondary-main"]: !isActive,
            [activeRateClassName ? activeRateClassName : "text-varient "]: isActive,
          })}>
            {rate}
          </div>
          ))
      }
    </button>
  )
}
