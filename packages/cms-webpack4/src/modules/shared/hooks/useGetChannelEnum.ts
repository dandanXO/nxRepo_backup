import { useLazyGetChannelListQuery } from "../api/channelListApi";
import { useEffect, useState } from "react";

const useGetChannelEnum = () => {

    // 注册渠道
    const [triggerGetChannelList, { currentData: channelListData, isSuccess: isChannelListDataSuccess }] = useLazyGetChannelListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [channelListEnum, setChannelListEnum] = useState(null);

    useEffect(() => {
        if (channelListData) {
            const channelList = new Map().set('', { text: '不限' });
            channelListData && channelListData?.map((i) => {
                return channelList.set(i.channelId, { text: i.name });
            });
            setChannelListEnum(channelList);
        }
    }, [isChannelListDataSuccess]);


    return { triggerGetChannelList, channelListEnum };
};

export default useGetChannelEnum;
