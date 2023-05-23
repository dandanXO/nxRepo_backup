import { MdPayment } from '@react-icons/all-files/md/MdPayment';
import { MdAccountBox } from '@react-icons/all-files/md/MdAccountBox';
import { RiMoneyDollarCircleFill } from '@react-icons/all-files/ri/RiMoneyDollarCircleFill';
import { useLocation, useNavigate } from 'react-router';

import cx from 'classnames';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { RootState } from '../../../reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { IndexPageSagaAction } from '../../pages/IndexPage/userUsecaseSaga/indexPageActions';

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
    <div className={'h-16 bg-white border-t sticky bottom-0 flex flex-row'}>
      <div
        className={'flex-1 flex flex-col justify-center items-center'}
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
        className={'flex-1 flex flex-col justify-center items-center relative'}
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
        {props.hasOrder && <div className={'bg-[#F24822] w-2 h-2 rounded-full absolute right-1/3 top-2'}></div>}
      </div>

      <div
        className={'flex-1 flex flex-col justify-center items-center'}
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
