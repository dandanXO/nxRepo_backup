import { MdAccountBox } from '@react-icons/all-files/md/MdAccountBox';
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
          navigate(`${PagePathEnum.IndexPage}?token=${getToken()}`);
        }}
      >
        <RiMoneyDollarCircleFill color={isInPage(PagePathEnum.IndexPage) ? '#F58B10' : '#D7D7D7'} size={20} />
        <div
          className={cx({
            'text-orange-300': isInPage(PagePathEnum.IndexPage),
            'text-gray-300': !isInPage(PagePathEnum.IndexPage),
          })}
        >
          Loan
        </div>
      </div>

      <div
        className={'relative flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          if (userStatus === USER_AUTH_STATE.ready) {
            dispatch(IndexPageSagaAction.user.authenticateSaga());
          } else {
            navigate(`${PagePathEnum.RepaymentPage}?token=${getToken()}`);
          }
        }}
      >
        <MdPayment color={isInPage(PagePathEnum.RepaymentPage) ? '#F58B10' : '#D7D7D7'} size={20} />
        <div
          className={cx({
            'text-orange-300': isInPage(PagePathEnum.RepaymentPage),
            'text-gray-300': !isInPage(PagePathEnum.RepaymentPage),
          })}
        >
          Payment
        </div>
        {props.hasOrder && <div className={'absolute right-1/3 top-2 h-2 w-2 rounded-full bg-[#F24822]'}></div>}
      </div>

      <div
        className={'flex flex-1 flex-col items-center justify-center'}
        onClick={() => {
          navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`);
        }}
      >
        <MdAccountBox color={isInPage(PagePathEnum.PersonalInfoPage) ? '#F58B10' : '#D7D7D7'} size={20} />
        <div
          className={cx({
            'text-orange-300': isInPage(PagePathEnum.PersonalInfoPage),
            'text-gray-300': !isInPage(PagePathEnum.PersonalInfoPage),
          })}
        >
          Account
        </div>
      </div>
    </div>
  );
};
