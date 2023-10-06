// import Button from "../../components/Button";
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import cx from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { RISK_CONTROL_STATE } from '../../../domain/risk/RISK_CONTROL_STATE';
import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { RootState } from '../../../reduxStore';
import { modalSlice } from '../../../reduxStore/modalSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { TabPage } from '../../core-components/TabPage';
import { LoanOverViewSection } from '../../core-components/sections/LoanOverViewSection';
import { useGoToLogout } from '../../goTo/goToLogout';
import { useUserPhoneNumber } from '../../hooks/useUserPhoneNumber';
import StarRatingModal from '../../modals/StarRatingModal';
import StarRatingSuccessModal from '../../modals/StarRatingSuccessModal';
import { IndexPageSagaAction } from '../IndexPage/userUsecaseSaga/indexPageActions';
import Card from './components/Card';
import LinkItem from './components/LinkItem';
import UserIcon from './images/UserIcon.svg';
import { PersonalInfoPageSagaActions } from './userUsecaseSaga';

const PersonalInfoPage = () => {
  const dispatch = useDispatch();

  const modalState = useSelector((state: RootState) => state.model);

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
    goToLogout();
  };

  const { maskPhoneNumber } = useUserPhoneNumber();

  return (
    <TabPage className="bg-cbg-primary flex flex-col">
      <div className={`my-4 flex flex-row items-center justify-center`}>
        <div className={`mr-3`}>
          <img src={UserIcon} />
        </div>
        <div className={`flex flex-col items-center justify-center `}>
          <div className={`font-bold`}>{maskPhoneNumber}</div>
          <div
            className={cx(
              'mt-1 grow rounded-2xl py-1 px-4 text-center text-sm leading-none',
              {
                'border-cstate-error-main text-cstate-error-main border':
                  user.state === USER_AUTH_STATE.ready,
                'border-cstate-success-main text-cstate-success-main border':
                  user.state === USER_AUTH_STATE.success,
                'border-cstate-info-main text-cstate-info-main border':
                  user.state === USER_AUTH_STATE.authing,
                'border-cstate-disable-main text-cstate-disable-main border':
                  user.state === USER_AUTH_STATE.reject,
              }
            )}
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
        <div
          className={`bg-primary-assistant flex flex-row items-center justify-around py-2 px-4`}
        >
          <div>Verify now for highest amount</div>
          <Button
            onClick={onUserClickToVerify}
            className={'w-auto py-1  px-2'}
            text={
              <div className="flex flex-row items-center whitespace-nowrap">
                Verify Now{<FiChevronRight className="ml-1" />}
              </div>
            }
          />
        </div>
      )}

      <div className="m-2">
        {/*NOTE: 是否顯示可用度雷達圓餅圖*/}
        {user.state === USER_AUTH_STATE.success &&
          riskControl.state !== RISK_CONTROL_STATE.order_reject &&
          riskControl.state !== RISK_CONTROL_STATE.empty_quota && (
            <Card>
              <LoanOverViewSection state={indexPage} />
            </Card>
          )}
        {/*NOTE: 顯示綁卡項目*/}
        <Card>
          <LinkItem
            title={'Bank Card'}
            to={`${PageOrModalPathEnum.BankcardListPage}?token=${getToken()}`}
          />
        </Card>

        <Card>
          <LinkItem
            title={'Privacy Policy'}
            to={`${PageOrModalPathEnum.PrivacyPolicyPage}?token=${getToken()}`}
          />
          <LinkItem
            title={'Disclosure Statement'}
            to={`${
              PageOrModalPathEnum.DisclosureStatementPage
            }?token=${getToken()}`}
          />
        </Card>

        <Card>
          {/*NOTE: 是否顯示合作夥伴*/}
          {app?.init?.partnership ? (
            <LinkItem
              title={'Partner'}
              to={`${PageOrModalPathEnum.PartnerPage}?token=${getToken()}`}
            />
          ) : (
            <></>
          )}
          {/*NOTE: 顯示客服*/}
          <LinkItem
            title={'Customer Service'}
            to={`${
              PageOrModalPathEnum.CustomerServicePage
            }?token=${getToken()}`}
          />
        </Card>

        <Card>
          <LinkItem
            title={'My coupon'}
            to={`${PageOrModalPathEnum.MyCouponListPage}?token=${getToken()}`}
          />
        </Card>

        {/*NOTE: 五星好評*/}

        <Card>
          <LinkItem
            title={'Rate Us 5 stars'}
            to={''}
            onClick={() =>
              dispatch(modalSlice.actions.updateStarRatingModal({ show: true }))
            }
          />
        </Card>
        <div className="m-2 mt-6 text-base font-bold ">Setting</div>
        <Card>
          <LinkItem
            title={'Delete My Account'}
            to={`${PageOrModalPathEnum.DeleteAccountPage}?token=${getToken()}`}
          />
        </Card>
      </div>

      <div className="my-2 text-center">
        <div onClick={onUserClickToLogout}>Log out</div>
      </div>

      {modalState.starRatingModal.show && <StarRatingModal />}
      {modalState.starRatingSuccessModal.show && <StarRatingSuccessModal />}
      <Outlet />
    </TabPage>
  );
};

export default PersonalInfoPage;
