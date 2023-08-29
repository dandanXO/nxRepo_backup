import * as Sentry from '@sentry/react';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { environment } from '../../../environments/environmentModule/environment';
import { AppFlag } from '../../../environments/flag';
import { PostRepayCreateRequest } from '../../api/loanService/PostRepayCreateRequest';
import { PostRepayCreateResponse } from '../../api/loanService/PostRepayCreateResponse';
import { usePostRepayCreateMutation } from '../../api/rtk';
import { CustomAxiosError } from '../../api/rtk/axiosBaseQuery';
import { getToken } from '../../modules/querystring/getToken';
import { modalSlice } from '../../reduxStore/modalSlice';
import { PagePathEnum } from '../pages/PagePathEnum';
import { RepaymentDetailPageUseCaseActions } from '../pages/RepaymentDetailPage/userUsecaseSaga';

const useRepayCreate = () => {
  const navigate = useNavigate();
  const pageQueryString = useLocationOrderQueryString();
  const dispatch = useDispatch();

  const orderNo = pageQueryString.orderNo;
  const token = pageQueryString.token;

  // NOTE: usePostRepayCreateMutation
  const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] =
    usePostRepayCreateMutation();
  const postRepayCreateRequest = (props: PostRepayCreateRequest) =>
    new Promise((resolve, reject) => {
      // console.log('[repay] postRepayCreateRequest.props', props);
      postRepayCreate(props)
        .unwrap()
        .then((data: PostRepayCreateResponse) => {
          if (data.nextStep === 'html') {
            navigate(`${PagePathEnum.RepaymentInfoPage}?token=${getToken()}`, {
              state: data,
            });
          }
          if (data.nextStep === 'jumpUrl') {
            // NOTICE: 跳轉至付款頁面
            window.location.href = data.nextUrl;
          }
          if (environment.country === IndiaCountry.country) {
            navigate(
              `${
                PagePathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${props.orderNo}`,
              { replace: true }
            );

            // NOTICE: 取得是否要跳出複借預約彈窗
            dispatch(
              RepaymentDetailPageUseCaseActions.system.showReservation()
            );
          }
          resolve('');
        })
        .catch((err: CustomAxiosError) => {
          // const error = new Error();
          // error.name = "postRepayCreate"
          // if (err) error.message = JSON.stringify(err)

          //   SentryModule.captureException(error);
          reject(err);
        });
    });
  const handlePostRepayCreate = (
    isForceApplyAfterRepay: boolean,
    orderNo: string,
    repayAmount: number,
    payType: string,
    couponRedeemNo: string
  ) => {
    return postRepayCreateRequest({
      extend: false,
      forceApplyAfterRepay: isForceApplyAfterRepay,
      orderNo: orderNo,
      payType: payType,
      repayAmount: repayAmount,
      couponRedeemNo: couponRedeemNo,
    });
  };

  return {
    handlePostRepayCreate,
    isPostRepayCreateLoading,
  };
};
export default useRepayCreate;
