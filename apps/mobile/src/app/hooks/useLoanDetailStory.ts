import {useNavigate} from "react-router-dom";
import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {useGetLoanDetailQuery, useGetRepayTypesQuery, usePostRepayCreateMutation,} from "../api";
import {useCallback, useEffect, useState} from "react";
import {PostRepayCreateRequestBody, PostRepayCreateResponse,} from "../api/postRepayCreate";
import * as Sentry from "@sentry/react";

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
        .catch(({ error }) => {
          // console.log(error);
          Sentry.captureException(error);
          reject(error);
        })
    })
  const handlePostRepayCreate = (isExtend: boolean, isForceApplyAfterRepay: true, repayAmount: number) => {
      return postRepayCreateRequest({
        extend: isExtend,
        forceApplyAfterRepay: isForceApplyAfterRepay,
        orderNo: orderNo,
        payType: repayTypes && repayTypes[payType].payType,
        repayAmount: repayAmount,
      });
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
