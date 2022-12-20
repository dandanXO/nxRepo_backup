import { useLazyGetMerchantListQuery } from "../api/merchantListApi";
import { useEffect, useState } from "react";
import { getIsSuperAdmin } from "../utils/getUserInfo";

const useGetMerchantEnum = () => {

    const isSuperAdmin = getIsSuperAdmin();
    
    // 可用商戶
    const [triggerGetMerchantList, { currentData: merchantListData, isLoading, isFetching, isSuccess: isMerchantListDataSuccess, isError, isUninitialized }] = useLazyGetMerchantListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [merchantListEnum, setMerchantListEnum] = useState(null)

    useEffect(() => {
        if (isSuperAdmin && merchantListData) {
            let merchantList = new Map().set('', { text: '不限' });
            merchantListData && merchantListData?.map((i) => {
                return merchantList.set(i.merchantId, { text: i.name })
            });
            setMerchantListEnum(merchantList)
        }
    }, [isMerchantListDataSuccess])

    return { triggerGetMerchantList, merchantListEnum }
}

export default useGetMerchantEnum;
