import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLazyGetMerchantListQuery } from '../../api/merchantListApi';
import { getIsSuperAdmin } from '../../storage/getUserInfo';

const useGetMerchantEnum = (): {
    merchantListEnum: any;
    triggerGetMerchantList: any;
} => {
    const isSuperAdmin = getIsSuperAdmin();
    const { t } = useTranslation();

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
            const merchantList = new Map().set('', { text: t('noRestriction') });
            merchantListData &&
                merchantListData?.map((i) => {
                    return merchantList.set(i.merchantId, { text: i.name });
                });
            setMerchantListEnum(merchantList);
        }
    }, [isMerchantListDataSuccess, i18next.language]);

    return { triggerGetMerchantList, merchantListEnum };
};

export default useGetMerchantEnum;
