// import Button from "../../components/Button";
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import cx from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { getToken } from '../../../modules/querystring/getToken';
import { RootState } from '../../../reduxStore';
import UserIcon from './images/UserIcon.svg';
import { Button } from '../../core-components/Button';
import { Page } from '../../core-components/Page';
import { LoanOverViewSection } from '../../core-components/sections/LoanOverViewSection';
import { IndexPageSagaAction } from '../IndexPage/userUsecaseSaga/indexPageActions';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import Card from './components/Card';
import LinkItem from './components/LinkItem';
import { PersonalInfoPageSagaActions } from './userUsecaseSaga';
import { RISK_CONTROL_STATE } from '../../../domain/risk/RISK_CONTROL_STATE';
import StarRatingModal from '../../modals/StarRatingModal';
import { modalSlice } from '../../../reduxStore/modalSlice';
import StarRatingSuccessModal from '../../modals/StarRatingSuccessModal';
import {useGoToLogout} from "../../goTo/goToLogout";
import { useUserPhoneNumber } from '../../hooks/useUserPhoneNumber';

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalState = useSelector((state: RootState) => state.model)

  useEffect(() => {
    dispatch(PersonalInfoPageSagaActions.system.init());
  }, []);

  const { indexPage, app } = useSelector((state: RootState) => state);
  const { user, riskControl } = indexPage;

  // NOTE: User Event
  const onUserClickToVerify = () => {
    dispatch(IndexPageSagaAction.user.authenticateSaga());
  };

  const goToLogout = useGoToLogout();

  const onUserClickToLogout = () => {
    goToLogout()
  };

  const {maskPhoneNumber} = useUserPhoneNumber();
  
  return (
    <Page className="flex flex-col pb-20 bg-cbg-primary">
      <div className={`my-4 flex flex-row items-center justify-center`}>
        <div className={`mr-3`}>
          <img src={UserIcon} />
        </div>
        <div className={`flex flex-col items-center justify-center `}>
          <div className={`font-bold`}>{maskPhoneNumber}</div>
          <div
            className={cx('mt-1 grow rounded-2xl py-1 px-4 text-center text-sm leading-none', {
              'border border-cstate-error-main text-cstate-error-main': user.state === USER_AUTH_STATE.ready,
              'border border-cstate-success-main text-cstate-success-main': user.state === USER_AUTH_STATE.success,
              'border border-cstate-info-main text-cstate-info-main': user.state === USER_AUTH_STATE.authing,
              'border border-cstate-disable-main text-cstate-disable-main': user.state === USER_AUTH_STATE.reject,
            })}
          >
            {user.state === USER_AUTH_STATE.ready && 'Not Verified'}
            {user.state === USER_AUTH_STATE.success && 'Verified'}
            {user.state === USER_AUTH_STATE.authing && 'Under Review'}
            {user.state === USER_AUTH_STATE.reject && 'Reject'}
          </div>
        </div>
      </div>

      {/*NOTE: 使用者尚未認證*/}
      {user.state === USER_AUTH_STATE.ready && (
        <div className={`flex flex-row items-center justify-around bg-primary-assistant py-2 px-4`}>
          <div>Verify now for highest amount</div>
          <Button
            onClick={onUserClickToVerify}
            className={'w-auto py-1  px-2'}
            text={<div className="flex flex-row items-center whitespace-nowrap">Verify Now{<FiChevronRight className="ml-1" />}</div>}
          />
        </div>
      )}

      <div className="m-2">
        {/*NOTE: 是否顯示可用度雷達圓餅圖*/}
        {user.state === USER_AUTH_STATE.success &&
         riskControl.state!==RISK_CONTROL_STATE.order_reject &&
         riskControl.state!==RISK_CONTROL_STATE.empty_quota && (
          <Card>
            <LoanOverViewSection state={indexPage} />
          </Card>
        )}
        {/*NOTE: 顯示綁卡項目*/}
        <Card>
          <LinkItem title={'Bank Card'} to={`${PageOrModalPathEnum.BankcardListPage}?token=${getToken()}`} />
        </Card>

        <Card>
          <LinkItem title={'Privacy Policy'} to={`${PageOrModalPathEnum.PrivacyPolicyPage}?token=${getToken()}`} />
          <LinkItem title={'Disclosure Statement'} to={`${PageOrModalPathEnum.DisclosureStatementPage}?token=${getToken()}`} />
        </Card>

        <Card>
          {/*NOTE: 是否顯示合作夥伴*/}
          {app?.init?.partnership ? <LinkItem title={'Partner'} to={`${PageOrModalPathEnum.PartnerPage}?token=${getToken()}`} /> : <></>}
          {/*NOTE: 顯示客服*/}
          <LinkItem title={'Customer Service'} to={`${PageOrModalPathEnum.CustomerServicePage}?token=${getToken()}`} />
        </Card>

        <Card>
          <LinkItem title={'My coupon'} to={`${PageOrModalPathEnum.MyCouponListPage}?token=${getToken()}`} />
        </Card>

        {/*NOTE: 五星好評*/}

        <Card><LinkItem title={'Rate Us 5 stars'} to={''} onClick={()=>dispatch(modalSlice.actions.updateStarRatingModal({show:true}))}/></Card>
        <div className='font-bold text-base m-2 mt-6 '>Setting</div>
        <Card>
          <LinkItem title={'Delete My Account'} to={`${PageOrModalPathEnum.DeleteAccountPage}?token=${getToken()}`} />
        </Card>
      </div>

      <div className="my-2 text-center">
        <div onClick={onUserClickToLogout}>Log out</div>
      </div>

      {modalState.starRatingModal.show && <StarRatingModal/>}
      {modalState.starRatingSuccessModal.show && <StarRatingSuccessModal/>}
      <Outlet />
    </Page>
  );
};

export default PersonalInfoPage;
