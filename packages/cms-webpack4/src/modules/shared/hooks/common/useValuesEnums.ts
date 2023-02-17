import {useGetChannelListQuery} from "../../api/channelListApi";
import { useGetOperatorListQuery ,useLazyGetOperatorListQuery} from "../../api/operatorListApi";
import { useGetProviderListQuery } from "../../api/providerApi";
import { useGetMerchantListQuery,useLazyGetMerchantListQuery } from "../../api/merchantListApi";
import {useEffect, useState} from "react";
import { getIsSuperAdmin } from "../../storage/getUserInfo";
import {ConstantRiskRankEnum} from "../../constants/constantRiskRankEnum";

const useValuesEnums = () => {

    const isSuperAdmin = getIsSuperAdmin();


    // 注册渠道
    const { currentData, isSuccess } = useGetChannelListQuery(null);
    const [channelListEnum, setChannelListEnum] = useState(null)
    useEffect(() => {
        const channelList = currentData && currentData?.reduce((prev, curr) => {
            return { ...prev, ...{ [curr.channelId]: { text: curr.name } } }
        }, {});
        setChannelListEnum({ ...channelList, '': { text: '不限' } })
    }, [isSuccess])


     // 操作人
    const [triggerGetOperatorList, { currentData: operatorListData, isSuccess: isOperatorListDataSuccess }] = useLazyGetOperatorListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [operatorListEnum, setOperatorListEnum] = useState(null)

    useEffect(() => {
        if (isSuperAdmin && operatorListData) {
            let operatorList = new Map().set('', { text: '不限' });
            operatorListData && operatorListData?.map((i) => {
                return operatorList.set(i.id, { text: i.name })
            });
            setOperatorListEnum(operatorList)
        }
    }, [isOperatorListDataSuccess])


    // 风控应用
    const { currentData: providerListData, isSuccess: isProviderListDataSuccess } = useGetProviderListQuery(null);
    const [providerListEnum, setProviderListEnum] = useState(null)

    useEffect(() => {
        const providerList = providerListData && providerListData?.reduce((prev, curr) => {
            return {...prev, ...{[curr.code]: { text: curr.displayName } } }
        }, {});
        setProviderListEnum({ ...providerList, '': { text: '不限' } })
    }, [isProviderListDataSuccess])




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

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
            triggerGetOperatorList(null);
        }
    }, [])

    return { channelListEnum, riskRankEnum: ConstantRiskRankEnum, operatorListEnum, providerListEnum, merchantListEnum }
}

export default useValuesEnums;