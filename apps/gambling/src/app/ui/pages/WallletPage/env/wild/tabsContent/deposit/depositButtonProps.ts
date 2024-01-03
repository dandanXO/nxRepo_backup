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
  return {
    rechargeValue: `R$ ${rechargeValue}`,
    rechargeClassName: 'text-base xl:text-4xl lg:text-2xl md:text-lg items-baseline',
    className: `min-h-[50px] ${isMobile ? 'pt-3' : ''} justify-around items-center rounded-md shadow-[0_0px_2px_#000c27,0_1px_2px_rgba(187,160,255,0.76)_inset,0_-2px_1px_rgba(39,8,74,0.76)_inset]`,
    activeRechargeClassName: 'text-[#7a2800]',
    bgClassName: 'bg-gradient-to-b from-[#5A16B7] to-[#7800FF]',
    activeBgClassName: 'bg-gradient-to-t from-[#FB7000] to-[#FFC000] shadow-[0_0px_2px_#000c27,0_1px_2px_rgba(255,243,160,0.76)_inset,0_-2px_2px_rgba(122,40,0,0.76)_inset]',
    rate: `+ R$ ${rate}`,
    rateClassName: `${!isMobile ? 'text-[#fff600]' : ''} text-base lg:text-2xl md:text-base`,
    activeRateClassName: `${!isMobile ? 'text-[#7a2800]' : ''}`,
    isRateTag: isMobile,
    rateTagClassName: 'text-xs pt-0.5 pr-1 text-[#fbd81e] absolute bg-gradient-to-r from-[transparent] via-[#FF3838]  to-[#FF3838] top-0 right-0 rounded-tr-lg',
  }
}
