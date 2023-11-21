import {
  useLazyGetInviteConfigQuery,
} from "../../external";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore";


type IConfigItem = {
  num: string;
  reward: string;
}
export const useInviteConfig = (props?: any) => {
  const [triggerGetInviteConfig, { isLoading, data, isFetching, currentData }] = useLazyGetInviteConfigQuery();
  const [currentConfig, setCurrentConfig] = useState<IConfigItem[]>();
  const { isLogin } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if (isLogin) {
      triggerGetInviteConfig({})
    }
  }, [isLogin]);

  useEffect(() => {
    const currentProxyType = currentData?.data.filter(item => item.proxyType === 0);
    if (currentProxyType) {
      const configs: IConfigItem[] = JSON.parse(currentProxyType[0].firstRechargeLevel);
      setCurrentConfig(configs);
    }
  }, [currentData])

  return {
    currentConfig
  }
}
