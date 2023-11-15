
import cx from 'classnames';
import useBreakpoint from '../../../hooks/useBreakpoint';

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

export const DepositButton = (props: IDepositButton) => {
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
      className={cx(`flex font-bold lg:flex-row flex-col mb-2 mx-1 basis-[31%] `,
        "justify-around items-center min-h-[55px] whitespace-nowrap",
        {
          [bgStyle]: !isActive,
          [activeBgStyle]: isActive,
          'relative': isRateTag,
          'basis-1/3': !isMobile
        }, className
      )}
      onClick={() => {
        props.onClick && props.onClick()
      }}
    >
      <span className={cx("value items-baseline text-base xl:text-4xl lg:text-2xl md:text-lg md:mr-2", {
        [rechargeClassName ? rechargeClassName : "text-white"]: !isActive,
        [activeRechargeClassName ? activeRechargeClassName : "text-main-primary-varient"]: isActive,
      })}>
        {rechargeValue}
      </span>


      {isShowRate &&
        (isRateTag
          ? (<div className={cx(rateTagClassName)}>{rate}</div>)
          : (<span className={cx("text-base lg:text-2xl md:text-base", {
            [rateClassName ? rateClassName : "text-main-secondary-main"]: !isActive,
            [activeRateClassName ? activeRateClassName : "text-varient "]: isActive,
          })}>
            {rate}
          </span>
          ))
      }
    </button>
  )
}
