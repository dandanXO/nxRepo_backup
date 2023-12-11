import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';

import { getToken } from '../../application/getToken';
import { PostRepayCreateRequest } from '../../externel/backend/loanService/PostRepayCreateRequest';
import { PostRepayCreateResponse } from '../../externel/backend/loanService/PostRepayCreateResponse';
import { usePostRepayCreateMutation } from '../../externel/backend/rtk';
import { CustomAxiosError } from '../../externel/backend/rtk/axiosBaseQuery';
import { PageOrModalPathEnum } from '../PageOrModalPathEnum';
import { MexicoCountry, PhilippinesCountry } from '@frontend/shared/domain';
import { environment } from 'apps/app/src/environments/environmentModule/environment';
import {openWindow} from "../../application/openWindow";

const useExtendCreate = () => {
  const navigate = useNavigate();
  const pageQueryString = useLocationOrderQueryString();

  // const orderNo = pageQueryString.orderNo;
  // const token = pageQueryString.token;

  // NOTE: usePostRepayCreateMutation
  const [postRepayCreate, { isLoading: isPostExtendCreateLoading }] =
    usePostRepayCreateMutation();

  const postRepayCreateRequest = (props: PostRepayCreateRequest) =>
    new Promise((resolve, reject) => {
      // console.log('[repay] postRepayCreateRequest.props', props);
      postRepayCreate(props)
        .unwrap()
        .then((data: PostRepayCreateResponse) => {
          if (data.nextStep === 'html' &&
            [MexicoCountry.country, PhilippinesCountry.country].includes(environment.country)) {
            navigate(`${PageOrModalPathEnum.PaymentCheckoutPage}?token=${getToken()}`, { state: data, replace: true });
            return;
          }
          if (data.nextStep === 'jumpUrl' || data.nextStep === 'html') {
            // NOTICE: 跳轉至付款頁面
            openWindow(data.nextUrl);
            navigate(
              `${
                PageOrModalPathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${props.orderNo}`,
              { replace: true }
            );
          }

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
    isPostExtendCreateLoading,
  };
};
export default useExtendCreate;
