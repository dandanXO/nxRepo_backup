import { useNavigate } from "react-router-dom";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import { useCallback, useEffect, useState } from "react";
import { useLazyGetRepayTypesQuery } from "../../api";

type paymentMethodValueType = {
    type: string;
    label: string;
};

const useRepayTypes = () => {

    const [triggerGetList, { currentData: repayTypesData, isLoading, isFetching: isRepayTypesFetching, isSuccess, isError, isUninitialized }] = useLazyGetRepayTypesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [repayTypesList, setRepayTypesList] = useState<paymentMethodValueType[]>([]);
    const [repayType, setRepayType] = useState(repayTypesList[0]);

    useEffect(() => {
        if (repayTypesData !== undefined) {
            const options = repayTypesData && repayTypesData?.map((item: any) => {
                return { type: item.payType, label: item.payTypeAlias }
            });
            setRepayTypesList(options);
            setRepayType(options[0])
        }
    }, [isSuccess])


    return { triggerGetList, isRepayTypesFetching, repayTypesList, repayType, setRepayType };
};
export default useRepayTypes;
