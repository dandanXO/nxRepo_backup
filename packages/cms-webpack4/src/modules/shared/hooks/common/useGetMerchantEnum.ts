import { useLazyGetMerchantListQuery } from "../../api/merchantListApi";
import { useEffect, useState } from "react";
import { getIsSuperAdmin } from "../../storage/getUserInfo";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const useGetMerchantEnum = () => {
    const isSuperAdmin = getIsSuperAdmin();
    const { t } = useTranslation();

    // 可用商戶
    const [triggerGetMerchantList, { currentData: merchantListData, isLoading, isFetching, isSuccess: isMerchantListDataSuccess, isError, isUninitialized }] = useLazyGetMerchantListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [merchantListEnum, setMerchantListEnum] = useState(null)

    useEffect(() => {
        if (isSuperAdmin && merchantListData) {
            let merchantList = new Map().set('', { text: t('noRestriction') });
            merchantListData && merchantListData?.map((i) => {
                return merchantList.set(i.merchantId, { text: i.name })
            });
            setMerchantListEnum(merchantList)
        }
    }, [isMerchantListDataSuccess, i18next.language])

    return { triggerGetMerchantList, merchantListEnum }
}

export default useGetMerchantEnum;
