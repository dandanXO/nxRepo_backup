import {useNavigate} from "react-router-dom";
import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {
  useGetLoanDetailQuery,
  useGetRepayTypesQuery,
  useLazyGetRepayTypesQuery,
  usePostRepayCreateMutation,
} from "../api";
import {useCallback, useEffect, useState} from "react";
import {PostRepayCreateRequestBody, PostRepayCreateResponse,} from "../api/postRepayCreate";
import * as Sentry from "@sentry/react";
import {CustomAxiosError} from "../api/base/axiosBaseQuery";

const useLoanDetailStory = () => {
    const navigate = useNavigate();

    const pageQueryString = useLocationOrderQueryString();

    // NOTE: useGetLoanDetailQuery
    const {
      currentData,
      isLoading: isGetLoanDetailQueryLoading,
      isFetching: isGetLoanDetailQueryFetching
    } = useGetLoanDetailQuery({
        orderNo: pageQueryString.orderNo,
    });

    // NOTE: useGetRepayTypesQuery
    const {
        currentData: repayTypes,
        isLoading: isRepayTypesLoading,
        isFetching: isRepayTypesFetching,
    } = useGetRepayTypesQuery({orderNo: pageQueryString.orderNo});

  const [triggerGetRepayTypesQuery, { currentData: repayTypes2 , isLoading, isFetching }] = useLazyGetRepayTypesQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false
  });


    const orderNo = pageQueryString.orderNo;
    const token = pageQueryString.token;
    const [payType, setPayType] = useState<number>(0);

    // NOTE: navigate
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


    // NOTE: usePostRepayCreateMutation
    const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] = usePostRepayCreateMutation();

    const postRepayCreateRequest = (props: PostRepayCreateRequestBody) => new Promise((resolve, reject) => {
      postRepayCreate(props)
        .unwrap()
        .then((data: PostRepayCreateResponse) => {
          // console.log("data", data);
          // NOTICE: 跳轉至付款頁面
          window.location.href = data.nextUrl;
          resolve("");
        })
        .catch((err: CustomAxiosError) => {
          const error = new Error();
          error.name = "postRepayCreate"
          if(err) error.message = JSON.stringify(err)
          Sentry.captureException(error);
          reject(err);
        })

    })
  const handlePostRepayCreate = (isExtend: boolean, isForceApplyAfterRepay: true, repayAmount: number) => {
      if(!repayTypes) {
        console.log("repayTypes: false");
        Sentry.captureMessage("repayTypes: false")
        triggerGetRepayTypesQuery({orderNo: pageQueryString.orderNo})
          .unwrap()
          .then((repayTypes2) => {
            console.log("repayTypes2", repayTypes2);
            return postRepayCreateRequest({
              extend: isExtend,
              forceApplyAfterRepay: isForceApplyAfterRepay,
              orderNo: orderNo,
              payType: repayTypes2 && repayTypes2[payType].payType,
              repayAmount: repayAmount,
            });
          })
      } else {
        console.log("repayTypes: true");
        Sentry.captureMessage("repayTypes: true")
        return postRepayCreateRequest({
          extend: isExtend,
          forceApplyAfterRepay: isForceApplyAfterRepay,
          orderNo: orderNo,
          payType: repayTypes && repayTypes[payType].payType,
          repayAmount: repayAmount,
        });
      }


    }

    return {
        currentData,
        navigateToUploadPaymentReceiptPage,
        handlePostRepayCreate,
        paymentMethodList,
        setPayType,
    };
};
export default useLoanDetailStory;
