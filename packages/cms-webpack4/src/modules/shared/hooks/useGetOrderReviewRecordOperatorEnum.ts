
import { useEffect, useState } from "react";
import { useLazyGetOrderReveiwRecordOperatorListQuery } from "../api/operatorListApi";
import { getIsSuperAdmin } from "../utils/getUserInfo";

const useGetOrderReviewRecordOperatorEnum = () => {

    const isSuperAdmin = getIsSuperAdmin();


    // 訂單審核紀錄操作人
    const [triggerGetOperatorList, { currentData: operatorListData, isSuccess }] = useLazyGetOrderReveiwRecordOperatorListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [orderReviewRecordOperatorEnum, setUrderReviewRecordOperatorEnum] = useState(null)

    useEffect(() => {

        let operatorList = new Map().set('', { text: '不限' });
        operatorListData && operatorListData?.map((i) => {
            return operatorList.set(i.operatorId, { text: i.operatorName })
        });
        setUrderReviewRecordOperatorEnum(operatorList)

    }, [isSuccess])


    return { triggerGetOperatorList, orderReviewRecordOperatorEnum }
}

export default useGetOrderReviewRecordOperatorEnum;
