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
  bg-[#333333] flex flex-row justify-center rounded-lg
  text-base md:text-lg lg:text-2xl
  font-medium text-white

  mr-0 lg:mr-0
  `;

  const rateStyle =
  `
  text-xs md:text-xs lg:text-xs  
  mt-1 rounded-lg px-3.5 py-0.5
 
  `;

  return {
    rechargeValue: `R$ ${formatLocaleMoney(rechargeValue)}`,
    rechargeClassName: rechargeStyle,
    className: `min-h-[68px] flex-col lg:flex-col bg-[#333333] py-3 md:py-2.5 lg:py-2 md:mb-4 lg:mb-5 rounded-lg items-center justify-center`,
    activeRechargeClassName: `${rechargeStyle} text-[#10b98f]`,
    bgClassName: 'bg-[#333333]',
    activeBgClassName: 'bg-[#333333]',
    rate: `+ R$ ${rate}`,
    rateClassName: `text-[#e6e6e6] bg-[#4d4d4d] ${rateStyle} `,
    activeRateClassName: `text-[#333333] bg-[#10b98f] ${rateStyle}`,
    isRateTag: false,
    rateTagClassName: '',
  }
}
