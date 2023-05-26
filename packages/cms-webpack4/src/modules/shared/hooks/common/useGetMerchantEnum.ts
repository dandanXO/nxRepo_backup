import { useLazyGetMerchantListQuery } from '../../api/merchantListApi';
import { getIsSuperAdmin } from '../../storage/getUserInfo';
import { useEffect, useState } from 'react';

const useGetMerchantEnum = (): {
    triggerGetMerchantList: any;
    merchantListEnum: Record<any, any>;
} => {
    const isSuperAdmin = getIsSuperAdmin();

    // 可用商戶
    const [triggerGetMerchantList, { currentData: merchantListData, isSuccess: isMerchantListDataSuccess }] =
        useLazyGetMerchantListQuery({
            pollingInterval: 0,
            refetchOnFocus: false,
            refetchOnReconnect: false,
        });
    const [merchantListEnum, setMerchantListEnum] = useState(null);

    useEffect(() => {
        if (isSuperAdmin && merchantListData) {
            const merchantList = new Map().set('', { text: '不限' });
            merchantListData &&
                merchantListData?.map((i) => {
                    return merchantList.set(i.merchantId, { text: i.name });
                });
            setMerchantListEnum(merchantList);
        }
    }, [isMerchantListDataSuccess]);

    return { triggerGetMerchantList, merchantListEnum };
};

export default useGetMerchantEnum;
