import { useLazyGetChannelListQuery } from "../api/channelListApi";
import { useEffect, useState } from "react";
import { getIsSuperAdmin } from "../i18n/getUserInfo";

const useGetChannelEnum = () => {

    const isSuperAdmin = getIsSuperAdmin();

    // 注册渠道
    const [triggerGetChannelList, { currentData: channelListData, isSuccess: isChannelListDataSuccess }] = useLazyGetChannelListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [channelListEnum, setChannelListEnum] = useState(null)

    useEffect(() => {
        if (isSuperAdmin && channelListData) {
            let channelList = new Map().set('', { text: '不限' });
            channelListData && channelListData?.map((i) => {
                return channelList.set(i.channelId, { text: i.name })
            });
            setChannelListEnum(channelList)
        }
    }, [isChannelListDataSuccess])


    return { triggerGetChannelList, channelListEnum }
}

export default useGetChannelEnum;
