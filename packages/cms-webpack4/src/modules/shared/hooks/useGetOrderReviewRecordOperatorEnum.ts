
import { useEffect, useState } from "react";
import { useLazyGetOrderReveiwRecordOperatorListQuery } from "../api/operatorListApi";
import { getIsSuperAdmin } from "../i18n/getUserInfo";

const useGetOrderReviewRecordOperatorEnum = () => {

    const isSuperAdmin = getIsSuperAdmin();


    // 訂單審核紀錄操作人
    const [triggerGetOperatorList, { currentData: operatorListData, isSuccess }] = useLazyGetOrderReveiwRecordOperatorListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [orderReviewRecordOperatorEnum, setOrderReviewRecordOperatorEnum] = useState(null)

    useEffect(() => {

        let operatorList = new Map().set('', { text: '不限' });
        operatorListData && operatorListData?.map((i) => {
            return operatorList.set(i.operatorId, { text: i.operatorName })
        });
        setOrderReviewRecordOperatorEnum(operatorList)

    }, [isSuccess])


    return { triggerGetOperatorList, orderReviewRecordOperatorEnum }
}

export default useGetOrderReviewRecordOperatorEnum;
