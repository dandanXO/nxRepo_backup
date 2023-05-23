import { StatusContainer } from './StatusContainer';
import React from 'react';
import './style.scss';
import { QuotaSliderStatus } from './QuotaSliderStatus';
import { LatestOrderStatus } from './LatestOrderStatus';
import { UserInfoSupportSection } from './UserInfoSupportSection';
import { IndexPageProps } from '../../../../../reduxStore';
import { UnAuthenticationStatus } from './UnAuthenticationStatus';
import { PageState } from '../../index';
import { USER_AUTH_STATE } from '../../../../../domain/user/USER_AUTH_STATE';
import { ORDER_STATE } from '../../../../../domain/order/ORDER_STATE';

type Props = IndexPageProps &
  PageState & {
    setQuotaBarTargetPrice: React.Dispatch<React.SetStateAction<number>>;
    countdown: string;
    onClickToCustomerService: () => void;
  };

export const UserInformationSection = (props: Props) => {
  const hasInComingOverdueOrder = props.state.order.state === ORDER_STATE.hasInComingOverdueOrder;
  const hasOverdueOrder = props.state.order.state === ORDER_STATE.hasOverdueOrder;
  return (
    <div className={'h-42 flex flex-col items-center bg-orange-100 px-3 pt-2'}>
      <div className={'mb-3 w-full'}>
        {/*NOTE: 顯示歡迎與是否顯示使用者與客服按鈕*/}
        <UserInfoSupportSection state={props.state} onClickToCustomerService={props.onClickToCustomerService} />
      </div>

      {/*NOTE: 顯示即將逾期與逾期的狀態*/}
      {props.state.user.state === USER_AUTH_STATE.success && (hasInComingOverdueOrder || hasOverdueOrder) && (
        <div className={'mb-3 w-full'}>
          <LatestOrderStatus state={props.state} />
        </div>
      )}

      <StatusContainer state={props.state} pageState={props.pageState}>
        {/*NOTE: 用戶尚未驗證*/}
        {/*NOTE: 顯示尚未驗證CTA*/}
        {props.state.user.state === USER_AUTH_STATE.ready && <UnAuthenticationStatus state={props.state} />}

        {/*NOTE: 用戶拒絕、認證中、已認證*/}
        {/*NOTE: 是否顯示 QuotaSlider*/}
        {props.state.user.state !== USER_AUTH_STATE.ready && (
          <QuotaSliderStatus
            state={props.state}
            setQuotaBarTargetPrice={props.setQuotaBarTargetPrice}
            countdown={props.countdown}
          />
        )}
      </StatusContainer>
    </div>
  );
};
