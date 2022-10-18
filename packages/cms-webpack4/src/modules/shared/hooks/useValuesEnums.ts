import {useGetChannelListQuery} from "../api/channelListApi";
import {useEffect, useState} from "react";

const useValuesEnums = () => {

    // 注册渠道
    const { currentData, isSuccess } = useGetChannelListQuery(null);
    const [channelListEnum, setChannelListEnum] = useState(null)
    useEffect(() => {
        const channelList = currentData && currentData?.reduce((prev, curr) => {
            return { ...prev, ...{ [curr.channelId]: { text: curr.name } } }
        }, { '': { text: '不限' } });
        setChannelListEnum(channelList)
    }, [isSuccess])


    // 风控标签
    const riskRankEnum = {
        '': { text: '不限', color: '' },
        'EXCELLENT': { text: '极好', color: 'green' },
        'NORMAL': { text: '正常', color: 'blue' },
        'ORDINARY': { text: '普通', color: 'gold' },
        'REJECT': { text: '拒绝', color: 'lightGray' },
        'GOOD': { text: '良好', color: 'orange' },
    }


    return { channelListEnum, riskRankEnum }
}

export default useValuesEnums;
