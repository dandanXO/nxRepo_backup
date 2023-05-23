// import Button from "../../components/Button";
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import cx from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { getToken } from '../../../modules/querystring/getToken';
import { RootState } from '../../../reduxStore';
import UserIcon from '../../components/images/UserIcon.svg';
import { Button } from '../../components/layouts/Button';
import { Page } from '../../components/layouts/Page';
import { LoanOverViewSection } from '../../components/sections/LoanOverViewSection';
import { IndexPageSagaAction } from '../IndexPage/userUsecaseSaga/indexPageActions';
import { PagePathEnum } from '../PagePathEnum';
import Card from './Card';
import LinkItem from './LinkItem';
import { PersonalInfoPageSagaActions } from './userUsecaseSaga';

const PersonalInfoPage = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.app.isInit);

  useEffect(() => {
    if (isInitialized) {
      dispatch(PersonalInfoPageSagaActions.system.init());
    }
    return () => {
      if (!isInitialized) {
      }
    };
  }, [isInitialized]);

  const navigate = useNavigate();
  const { indexPage, app } = useSelector((state: RootState) => state);
  const { user } = indexPage;

  const onClickVerify = () => {
    dispatch(IndexPageSagaAction.user.authenticateSaga());
  };

  return (
    <Page className="flex flex-col ">
      <div className={`my-4 flex flex-row items-center justify-center`}>
        <div className={`mr-3`}>
          <img src={UserIcon} />
        </div>
        <div className={`flex flex-col items-center justify-center `}>
          <div className={`font-bold`}>{user.userName}</div>
          <div
            className={cx('mt-1 grow rounded-2xl py-1 px-4 text-center text-sm leading-none', {
              'border border-orange-500 text-orange-500': user.state !== USER_AUTH_STATE.success,
              'border border-emerald-500 text-emerald-500': user.state === USER_AUTH_STATE.success,
            })}
          >
            {user.state !== USER_AUTH_STATE.success ? 'Not Verified' : 'Verified'}
          </div>
        </div>
      </div>
      {user.state === USER_AUTH_STATE.ready && (
        <div className={`flex flex-row items-center justify-around bg-orange-100 py-2 px-4`}>
          <div>Verify now for highest amount</div>
          <Button
            onClick={onClickVerify}
            className={'w-auto py-1  px-2'}
            text={<div className="flex flex-row items-center">Verify Now{<FiChevronRight className="ml-1" />}</div>}
          />
        </div>
      )}

      <div className="m-2">
        {user.state === USER_AUTH_STATE.success && (
          <div className={`m-2 justify-end rounded-md p-4 shadow-[0_0px_8px_rgba(0,0,0,0.1)]`}>
            <LoanOverViewSection state={indexPage} />
          </div>
        )}
        <Card>
          <LinkItem title={'Bank Card'} to={`${PagePathEnum.BankcardListPage}?token=${getToken()}`} />
        </Card>
        <Card>
          <LinkItem title={'Privacy Policy'} to={PagePathEnum.PrivacyPolicyPage} />
          <LinkItem title={'Disclosure Statement'} to={PagePathEnum.DisclosureStatementPage} />
        </Card>
        <Card>
          {app?.init?.partnership ? <LinkItem title={'Partner'} to={'/partner'} /> : <></>}
          <LinkItem title={'Customer Service'} to={PagePathEnum.CustomerServicePage} />
        </Card>
        {/* <Card><LinkItem title={'Rate Us 5 starts'} to={''} /></Card> */}
        {/* <div>Setting</div>
              <Card>
                  <ListItem title={'Privacy Policy'} text={''} />
                  <LinkItem title={'Disclosure Statement'} to={''} />
              </Card> */}
      </div>
      <div className="my-2 text-center">
        <div
          onClick={() => {
            navigate(`${PagePathEnum.PersonalInfoPage}/log-out-modal`);
          }}
        >
          Log out
        </div>
      </div>

      <Outlet />
    </Page>
  );
};

export default PersonalInfoPage;
