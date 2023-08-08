import * as Sentry from '@sentry/react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { AppFlag } from '../../../environments/flag';
import { PostRepayCreateRequest } from '../../api/loanService/PostRepayCreateRequest';
import { PostRepayCreateResponse } from '../../api/loanService/PostRepayCreateResponse';
import { usePostRepayCreateMutation } from '../../api/rtk';
import { CustomAxiosError } from '../../api/rtk/axiosBaseQuery';

const useExtendCreate = () => {
  const navigate = useNavigate();
  const pageQueryString = useLocationOrderQueryString();

  const orderNo = pageQueryString.orderNo;
  const token = pageQueryString.token;

  // NOTE: usePostRepayCreateMutation
  const [postRepayCreate, { isLoading: isPostExtendCreateLoading }] = usePostRepayCreateMutation();

  const postRepayCreateRequest = (props: PostRepayCreateRequest) =>
    new Promise((resolve, reject) => {
      // console.log('[repay] postRepayCreateRequest.props', props);
      postRepayCreate(props)
        .unwrap()
        .then((data: PostRepayCreateResponse) => {
          // console.log('data', data);
          // NOTICE: 跳轉至付款頁面
          window.location.href = data.nextUrl;
          resolve('');
        })
        .catch((err: CustomAxiosError) => {
          // const error = new Error();
          // error.name = "postRepayCreate"
          // if (err) error.message = JSON.stringify(err)
          //
          //   SentryModule.captureException(error);
          reject(err);
        });
    });
  const handlePostExtendCreate = (
    isForceApplyAfterRepay: boolean,
    orderNo: string,
    repayAmount: number,
    payType: string
  ) => {
    return postRepayCreateRequest({
      extend: true,
      forceApplyAfterRepay: isForceApplyAfterRepay,
      orderNo: orderNo,
      payType: payType,
      repayAmount: repayAmount,
    });
  };

  return {
    handlePostExtendCreate,
    isPostExtendCreateLoading
  };
};
export default useExtendCreate;
