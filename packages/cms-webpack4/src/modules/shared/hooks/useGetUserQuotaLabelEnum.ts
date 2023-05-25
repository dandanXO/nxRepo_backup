import { useEffect, useState } from "react";
import { useLazyGetUserQuotaLabelSelectQuery } from "../api/userQuotaLabelApi";
const useGetUserQuotaLabelEnum = () => {

    // 注册渠道
    const [triggerGetUserQuotaLable, { currentData: userQuotaLableData, isSuccess: isUserQuotaLableDataSuccess ,isFetching }] = useLazyGetUserQuotaLabelSelectQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [userQuotaLablEnum, setUserQuotaLablEnum] = useState(null);
    const [userQuotaLablSelect, setUserQuotaLablSelect] = useState(null);

    const colorEnum = {
        'blue': { text: '蓝色', color: '#1890FF' },
        'geek blue': { text: '深蓝色', color: '#2F54EB' },
        'purple': { text: '紫色', color: '#722ED1' },
        'green': { text: '绿色', color: '#52C41A' },
        'lime': { text: '青绿色', color: '#A0D911' },
        'yellow': { text: '黄色', color: '#FADB14' },
        'orange': { text: '橘色', color: '#FA8C16' },
        'red': { text: '红色', color: '#FF4D4F' },
        'pink': { text: '粉红色', color: '#FF85C0' },
        'gray': { text: '灰色', color: '#D9D9D9' },
    };

    useEffect(() => {
        if (userQuotaLableData) {
            const userQuotaLablEnumData = new Map().set('', { text: '不限', color: colorEnum['blue'] });
            userQuotaLableData && userQuotaLableData?.map((i) => {
                return userQuotaLablEnumData.set(i.id, { text: i.labelName, color: colorEnum[i.labelColor].color, id: i.id });
            });

            const userQuotaLablSelectData = userQuotaLableData?.map((i) => {
                return { value: i.id, label: i.labelName };
            });

            setUserQuotaLablEnum(userQuotaLablEnumData);
            setUserQuotaLablSelect([{ value: '', label: '额度标签' }, ...userQuotaLablSelectData, { value: 0, label: '移除配置' }]);
        }
    }, [isFetching]);


    return { triggerGetUserQuotaLable, userQuotaLablEnum, userQuotaLablSelect, colorEnum };
};

export default useGetUserQuotaLabelEnum;
