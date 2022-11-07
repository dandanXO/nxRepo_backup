import { useNavigate } from "react-router-dom";
import { useLocationOrderQueryString } from "@frontend/mobile/shared/ui";
import {
    useGetLoanDetailQuery,
    useGetRepayTypesQuery,
    usePostRepayCreateMutation,
} from "../api";
import { useCallback, useEffect, useState } from "react";
import {
    PostRepayCreateRequestBody,
    PostRepayCreateResponse,
} from "../api/postRepayCreate";

const useLoanDetailStory = () => {
    const navigate = useNavigate();
    const pageQueryString = useLocationOrderQueryString();
    const { currentData, isLoading, isFetching } = useGetLoanDetailQuery({
        orderNo: pageQueryString.orderNo,
    });
    const {
        currentData: repayTypes,
        isLoading: isRepayTypesLoading,
        isFetching: isRepayTypesFetching,
    } = useGetRepayTypesQuery({});
    const orderNo = pageQueryString.orderNo;
    const token = pageQueryString.token;
    const [payType, setPayType] = useState<string>("");
    const navigateToUploadPaymentReceiptPage = useCallback(() => {
        navigate(`/upload-payment-receipt?token=${token}&orderNo=${orderNo}`);
    }, [token, orderNo]);

    useEffect(() => {
        if (!isRepayTypesLoading) {
            // NOTICE: 印度 API 產品, 預設第一種付款方式
            setPayType(
                repayTypes && repayTypes[0] && repayTypes[0].payType
                    ? repayTypes[0].payType
                    : ""
            );
        }
    }, [isRepayTypesLoading]);
    const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] =
        usePostRepayCreateMutation();

    const postRepayCreateRequest = useCallback(
        (props: PostRepayCreateRequestBody) => {
            postRepayCreate(props)
                .unwrap()
                .then((data: PostRepayCreateResponse) => {
                    // do nothing.
                    window.location.href = data.nextUrl;
                })
                .catch(({ error }) => {
                    console.log(error);
                })
                .finally(() => {
                    // do nothing.
                });
        },
        []
    );

    const handlePostRepayCreate = useCallback(
        (
            isExtend: boolean,
            isForceApplyAfterRepay: true,
            repayAmount: number
        ) => {
            postRepayCreateRequest({
                extend: isExtend,
                forceApplyAfterRepay: isForceApplyAfterRepay,
                orderNo: orderNo,
                payType: payType,
                repayAmount: repayAmount,
            });
        },
        [orderNo, payType]
    );
    return {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
    };
};
export default useLoanDetailStory;
