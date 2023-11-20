type IdepositButtonProps = {
  rechargeValue: number;
  rate: string;
}
export const depositButtonProps = ({
                                     rechargeValue,
                                     rate,
                                   }: IdepositButtonProps) => {
  return {
    rechargeValue: `${rechargeValue}`,
    rate: `+ ${rate}`,
    className: 'italic'
  }
}
