type IdepositButtonProps = {
  rechargeValue: number;
  isMobile: boolean;
  rate: string;
}
export const depositButtonProps = ({
                                     rechargeValue,
                                     isMobile,
                                     rate,
                                   }: IdepositButtonProps) => {


  const rechargeStyle='text-sm md:text-2xl md:text-center md:flex-1';
  const rateStyle=`w-full text-xs text-right md:w-auto md:flex-1 md:text-xl md:text-left`;


  return {
    rechargeValue: `R$ ${rechargeValue}`,
    rechargeClassName: rechargeStyle,
    className: `px-1 min-h-[50px] rounded-md text-white flex-col-reverse items-center justify-center`,
    activeRechargeClassName: `${rechargeStyle} text-[var(--text-deposit)]`,
    bgClassName: 'bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]',
    activeBgClassName: 'bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)]',
    rate: `+ R$ ${rate}`,
    rateClassName: ` text-[var(--secondary-assistant)] ${rateStyle} `,
    activeRateClassName: `text-[var(--state-error-main)] ${rateStyle}`,
    isRateTag: false,
    rateTagClassName: '',
  }
}
