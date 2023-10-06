import { MdPayment } from '@react-icons/all-files/md/MdPayment';
import { RiMoneyDollarCircleFill } from '@react-icons/all-files/ri/RiMoneyDollarCircleFill';
import { RiUser3Line } from '@react-icons/all-files/ri/RiUser3Line';
import cx from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { getToken } from '../../application/getToken';
import { USER_AUTH_STATE } from '../../domain/user/USER_AUTH_STATE';
import { RootState } from '../../reduxStore';
import {
  repaymentPageInitialState,
  repaymentPageSlice,
} from '../../reduxStore/repaymentPageSlice';
import { PageOrModalPathEnum } from '../PageOrModalPathEnum';
import { IndexPageSagaAction } from '../pages/IndexPage/userUsecaseSaga/indexPageActions';

type Props = {
  hasOrder: boolean;
};
export const TabBar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isInPage = (pageName: PageOrModalPathEnum, exact?: boolean) => {
    if (pageName === PageOrModalPathEnum.IndexPage) {
      return location.pathname === pageName;
    }
    return location.pathname.indexOf(pageName) > -1;
  };

  useEffect(() => {
    if (location.pathname !== PageOrModalPathEnum.RepaymentPage) {
      dispatch(
        repaymentPageSlice.actions.updateRepaymentPage({
          paymentType: repaymentPageInitialState.paymentType,
          scrollPosition: repaymentPageInitialState.scrollPosition,
        })
      );
    }
  }, [location]);

  const userStatus: USER_AUTH_STATE = useSelector(
    (state: RootState) => state.indexPage.user.state
  );
  return (
    <div
      className={
        'fixed left-0 right-0 bottom-0 flex h-16 flex-row border-t bg-white'
      }
    >
      <div
        className={'flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          navigate(`${PageOrModalPathEnum.IndexPage}?token=${getToken()}`);
        }}
      >
        <RiMoneyDollarCircleFill
          className={
            isInPage(PageOrModalPathEnum.IndexPage)
              ? 'fill-primary-main'
              : 'fill-cstate-disable-main'
          }
          size={24}
        />
        <div
          className={cx('mt-1.5 text-xs', {
            'text-primary-main': isInPage(PageOrModalPathEnum.IndexPage),
            'text-cstate-disable-main': !isInPage(
              PageOrModalPathEnum.IndexPage
            ),
          })}
        >
          Loan
        </div>
      </div>

      <div
        data-testing-id={'tab-payment'}
        className={'relative flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          if (userStatus === USER_AUTH_STATE.ready) {
            dispatch(IndexPageSagaAction.user.authenticateSaga());
          } else {
            navigate(
              `${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`
            );
          }
        }}
      >
        <MdPayment
          className={
            isInPage(PageOrModalPathEnum.RepaymentPage)
              ? 'fill-primary-main'
              : 'fill-cstate-disable-main'
          }
          size={24}
        />
        <div
          className={cx('mt-1.5 text-xs', {
            'text-primary-main': isInPage(PageOrModalPathEnum.RepaymentPage),
            'text-cstate-disable-main': !isInPage(
              PageOrModalPathEnum.RepaymentPage
            ),
          })}
        >
          Payment
        </div>
        {props.hasOrder && (
          <div
            data-testing-id={'tab-payment-notice'}
            className={
              'bg-cstate-error-main absolute right-1/3 top-2 h-2 w-2 rounded-full'
            }
          ></div>
        )}
      </div>

      <div
        className={'flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          navigate(
            `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`
          );
        }}
      >
        <RiUser3Line
          className={
            isInPage(PageOrModalPathEnum.PersonalInfoPage)
              ? 'fill-primary-main'
              : 'fill-cstate-disable-main'
          }
          size={24}
        />
        <div
          className={cx('mt-1.5 text-xs', {
            'text-primary-main': isInPage(PageOrModalPathEnum.PersonalInfoPage),
            'text-cstate-disable-main': !isInPage(
              PageOrModalPathEnum.PersonalInfoPage
            ),
          })}
        >
          Account
        </div>
      </div>
    </div>
  );
};
