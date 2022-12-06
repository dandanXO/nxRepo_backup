import {useGetChannelListQuery} from "../api/channelListApi";
import { useGetOperatorListQuery } from "../api/operatorListApi";
import { useGetProviderListQuery } from "../api/providerApi";
import {useEffect, useState} from "react";

const useValuesEnums = () => {

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
    const { currentData:operatorListData, isSuccess:isOperatorListDataSuccess } = useGetOperatorListQuery(null);
    const [operatorListEnum, setOperatorListEnum] = useState(null)

    useEffect(() => {
        const operatorList = operatorListData && operatorListData?.reduce((prev, curr) => {
            return { ...prev, ...{ [curr.id]: { text: curr.name } } }
        }, {});
        setOperatorListEnum({ ...operatorList, '': { text: '不限' } })
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

    // 风控标签
    const riskRankEnum = {
        '': { text: '不限', color: '' },
        'EXCELLENT': { text: '极好', color: 'green' },
        'NORMAL': { text: '正常', color: 'blue' },
        'ORDINARY': { text: '普通', color: 'gold' },
        'REJECT': { text: '拒绝', color: 'lightGray' },
        'GOOD': { text: '良好', color: 'orange' },
    }


    return { channelListEnum, riskRankEnum, operatorListEnum, providerListEnum }
}

export default useValuesEnums;
