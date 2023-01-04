
import { useEffect, useState } from "react";
import { useLazyGetUserReveiwRecordOperatorListQuery } from "../api/operatorListApi";


const useGetUserReviewRecordOperatorEnum = () => {

    // 用戶審核紀錄操作人
    const [triggerGetOperatorList, { currentData: operatorListData, isSuccess }] = useLazyGetUserReveiwRecordOperatorListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [userReviewRecordOperatorEnum, setUserReviewRecordOperatorEnum] = useState(null)

    useEffect(() => {

        let operatorList = new Map().set('', { text: '不限' });
        operatorListData && operatorListData?.map((i) => {
            return operatorList.set(i.operatorId, { text: i.operatorName })
        });
        setUserReviewRecordOperatorEnum(operatorList)

    }, [isSuccess])


    return { triggerGetOperatorList, userReviewRecordOperatorEnum }
}

export default useGetUserReviewRecordOperatorEnum;