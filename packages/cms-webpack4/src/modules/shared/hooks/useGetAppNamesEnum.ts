import { useEffect, useState } from "react";
import { useLazyGetAppNamesQuery } from '../api/appNamesApi';


const useGetAppNamesEnum = (): {
    triggerGetAppNames: any,
    appNamesEnum: Record<any, any>
} => {

    // 产品列表下拉选单
    const [triggerGetAppNames, { currentData, isSuccess }] = useLazyGetAppNamesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [appNamesEnum, setAppNamesEnum] = useState(null);

    useEffect(() => {

        const appNames = new Map().set('', { text: '不限' });
        currentData && currentData?.map((i) => {
            return appNames.set(i, { text: i });
        });
        setAppNamesEnum(appNames);

    }, [isSuccess]);


    return { triggerGetAppNames, appNamesEnum };
};

export default useGetAppNamesEnum;
