
import { useLazyGetProviderListQuery } from "../../api/providerApi";
import { useEffect, useState } from "react";

const useGetProviderEnum = () => {

    // 风控应用
    const [triggerGetProviderList, { currentData: providerListData, isSuccess: isProviderListDataSuccess }] = useLazyGetProviderListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [providerListEnum, setProviderListEnum] = useState(null);

    useEffect(() => {
        if (providerListData) {
            const providerList = new Map().set('', { text: '不限' });
            providerListData && providerListData?.map((i) => {
                return providerList.set(i.code, { text: i.displayName });
            });
            setProviderListEnum(providerList);
        }

    }, [isProviderListDataSuccess]);

    return { triggerGetProviderList, providerListEnum };
};

export default useGetProviderEnum;
