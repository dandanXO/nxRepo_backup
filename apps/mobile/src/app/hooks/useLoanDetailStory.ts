import {useNavigate} from "react-router-dom";
import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {useGetLoanDetailQuery, useGetRepayTypesQuery, usePostRepayCreateMutation,} from "../api";
import {useCallback, useEffect, useState} from "react";
import {PostRepayCreateRequestBody, PostRepayCreateResponse,} from "../api/postRepayCreate";

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
    } = useGetRepayTypesQuery({orderNo: pageQueryString.orderNo});
    const orderNo = pageQueryString.orderNo;
    const token = pageQueryString.token;
    const [payType, setPayType] = useState<number>(0);

    // NOTICE:
    const navigateToUploadPaymentReceiptPage = useCallback(() => {
        navigate(`/upload-payment-receipt?token=${token}&orderNo=${orderNo}`);
    }, [token, orderNo]);

    const [paymentMethodList, setPaymentMethodList] = useState<string[]>([]);

    useEffect(() => {
      if(!repayTypes) return;
      const methods = repayTypes.map(item => {
        return item.payTypeAlias ? item.payTypeAlias :"";
      })
      setPaymentMethodList(methods);
    }, [repayTypes])

    // NOTICE:
    const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] =
        usePostRepayCreateMutation();

    const postRepayCreateRequest = useCallback(
        (props: PostRepayCreateRequestBody) => {
            postRepayCreate(props)
                .unwrap()
                .then((data: PostRepayCreateResponse) => {
                    // NOTICE: 跳轉至付款頁面
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
            repayAmount: number,
        ) => {
            postRepayCreateRequest({
                extend: isExtend,
                forceApplyAfterRepay: isForceApplyAfterRepay,
                orderNo: orderNo,
                payType: repayTypes && repayTypes[payType].payType,
                repayAmount: repayAmount,
            });
        },
        [orderNo, payType, repayTypes]
    );
    return {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        paymentMethodList,
        setPayType,
    };
};
export default useLoanDetailStory;
