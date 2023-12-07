import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLocationOrderQueryString } from '@frontend/mobile/shared/ui';
import {
  IndiaCountry,
  MexicoCountry,
  PhilippinesCountry,
} from '@frontend/shared/domain';

import { environment } from '../../../environments/environmentModule/environment';
import { getToken } from '../../application/getToken';
import { PostRepayCreateRequest } from '../../externel/backend/loanService/PostRepayCreateRequest';
import { PostRepayCreateResponse } from '../../externel/backend/loanService/PostRepayCreateResponse';
import { usePostRepayCreateMutation } from '../../externel/backend/rtk';
import { CustomAxiosError } from '../../externel/backend/rtk/axiosBaseQuery';
import { PageOrModalPathEnum } from '../PageOrModalPathEnum';
import { RepaymentDetailPageUseCaseActions } from '../pages/RepaymentDetailPage/userUsecaseSaga';
import { AllCountryIdentityName } from 'libs/shared/domain/src/country/enum/AllCountryIdentityName';

const useRepayCreate = () => {
  const navigate = useNavigate();
  const pageQueryString = useLocationOrderQueryString();
  const dispatch = useDispatch();

  // const orderNo = pageQueryString.orderNo;
  // const token = pageQueryString.token;

  // NOTE: usePostRepayCreateMutation
  const [postRepayCreate, { isLoading: isPostRepayCreateLoading }] =
    usePostRepayCreateMutation();
  const postRepayCreateRequest = (props: PostRepayCreateRequest) =>
    new Promise((resolve, reject) => {
      // console.log('[repay] postRepayCreateRequest.props', props);
      postRepayCreate(props)
        .unwrap()
        .then((data: PostRepayCreateResponse) => {
          if (data.nextStep === 'html' &&
            [MexicoCountry.country, PhilippinesCountry.country].includes(environment.country)) {
            navigate(`${PageOrModalPathEnum.PaymentCheckoutPage}?token=${getToken()}`, { state: data, replace: true  });
            return;
          }
          if (data.nextStep === 'jumpUrl' || data.nextStep === 'html') {
            // NOTICE: 跳轉至付款頁面
            // NOTE: For iOS
            // window.location.href = data.nextUrl;
            console.log("data.nextUrl:", data.nextUrl);
            // NOTE: For Android
            window.open(data.nextUrl)

            navigate(`${PageOrModalPathEnum.RepaymentDetailPage}?token=${getToken()}&orderNo=${props.orderNo}`, { replace: true });

             // NOTICE: 取得是否要跳出複借預約彈窗
            if ([IndiaCountry.country, MexicoCountry.country, PhilippinesCountry.country].includes(environment.country)) {
              dispatch(
                RepaymentDetailPageUseCaseActions.system.showReservation()
              );
            }
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
