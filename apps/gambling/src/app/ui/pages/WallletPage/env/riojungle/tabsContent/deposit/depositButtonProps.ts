import { formatLocaleMoney } from "../../../../../../utils/format";

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

  const rechargeStyle =
  `
  bg-[var(--grayscale-20)] flex flex-row justify-center rounded-lg
  text-base md:text-lg lg:text-2xl
  font-medium text-white

  mr-0 lg:mr-0
  `;

  const rateStyle =
  `
  text-xs mt-1 rounded-xl px-3.5 py-0.5
  `;

  return {
    rechargeValue: `R$ ${formatLocaleMoney(rechargeValue)}`,
    rechargeClassName: rechargeStyle,
    className: `min-h-[68px] flex-col lg:flex-col bg-[var(--grayscale-20)] py-3 md:py-2.5 lg:py-2 md:mb-4 lg:mb-5 rounded-lg items-center justify-center`,
    activeRechargeClassName: `${rechargeStyle} text-[var(--secondary-main)]`,
    bgClassName: 'bg-[var(--grayscale-20)] border-2 border-solid border-[var(--grayscale-20)]',
    activeBgClassName: 'bg-[var(--grayscale-20)] border-2 border-solid border-[var(--secondary-main)]',
    rate: `R$ ${rate}`,
    rateClassName: `font-normal text-[#e6e6e6] bg-[var(--grayscale-30)] ${rateStyle} `,
    activeRateClassName: `font-bold text-[var(--grayscale-20)] bg-[var(--secondary-main)] ${rateStyle}`,
    isRateTag: false,
    rateTagClassName: '',
  }
}
