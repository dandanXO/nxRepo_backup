import { IDepositPanel } from "../tabsContent/deposit/DepositPanel";

export const useGetConfig = (props: IDepositPanel) => {
  const getConfig = (rechargeValue: number) => {
    const configs = props.data?.config?.filter((configItem) => {
      if (Number(configItem.amount_min) <= Number(rechargeValue) && Number(rechargeValue) <= Number(configItem.amount_max)) {
        return true;
      } else {
        return false;
      }
    }) || []
    return configs[0]
  }

  return {
    getConfig
  }
}