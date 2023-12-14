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
    rechargeValue: `${rechargeValue}`,
    rate: `+ ${rate}`,
    className: 'italic'
  }
}
