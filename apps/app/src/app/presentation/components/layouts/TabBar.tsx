import { RiUser3Line } from '@react-icons/all-files/ri/RiUser3Line';
import { MdPayment } from '@react-icons/all-files/md/MdPayment';
import { RiMoneyDollarCircleFill } from '@react-icons/all-files/ri/RiMoneyDollarCircleFill';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { getToken } from '../../../modules/querystring/getToken';
import { RootState } from '../../../reduxStore';
import { IndexPageSagaAction } from '../../pages/IndexPage/userUsecaseSaga/indexPageActions';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { SystemCaseActions } from '../../../usecaseFlow/type/systemUsecaseSaga/systemCaseActions';

type Props = {
  hasOrder: boolean;
};
export const TabBar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log("location", location);
  const isInPage = (pageName: PagePathEnum, exact?: boolean) => {
    if (pageName === PagePathEnum.IndexPage) {
      return location.pathname === pageName;
    }
    return location.pathname.indexOf(pageName) > -1;
  };
  const userStatus: USER_AUTH_STATE = useSelector((state: RootState) => state.indexPage.user.state);
  return (
    <div className={'fixed left-0 right-0 bottom-0 flex h-16 flex-row border-t bg-white'}>
      <div
        className={'flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          dispatch(SystemCaseActions.SystemFetchCouponSaga());
          navigate(`${PagePathEnum.IndexPage}?token=${getToken()}`);
        }}
      >
        <RiMoneyDollarCircleFill className={isInPage(PagePathEnum.IndexPage) ? 'fill-primary-main' : 'fill-cstate-disable-main'} size={24} />
        <div
          className={cx('text-xs mt-1.5',{
            'text-primary-main': isInPage(PagePathEnum.IndexPage),
            'text-cstate-disable-main': !isInPage(PagePathEnum.IndexPage),
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
            navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`);
          }
        }}
      >
        <MdPayment className={isInPage(PagePathEnum.RepaymentPage) ? 'fill-primary-main' : 'fill-cstate-disable-main'} size={24} />
        <div
          className={cx('text-xs mt-1.5',{
            'text-primary-main': isInPage(PagePathEnum.RepaymentPage),
            'text-cstate-disable-main': !isInPage(PagePathEnum.RepaymentPage),
          })}
        >
          Payment
        </div>
        {props.hasOrder && <div data-testing-id={'tab-payment-notice'} className={'absolute right-1/3 top-2 h-2 w-2 rounded-full bg-cstate-error-main'}></div>}
      </div>

      <div
        className={'flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`);
        }}
      >
        <RiUser3Line className={isInPage(PagePathEnum.PersonalInfoPage) ? 'fill-primary-main' : 'fill-cstate-disable-main'} size={24} />
        <div
          className={cx('text-xs mt-1.5',{
            'text-primary-main': isInPage(PagePathEnum.PersonalInfoPage),
            'text-cstate-disable-main': !isInPage(PagePathEnum.PersonalInfoPage),
          })}
        >
          Account
        </div>
      </div>
    </div>
  );
};
