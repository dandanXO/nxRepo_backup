import { Page } from '../../components/layouts/Page';
import { Outlet, useNavigate } from 'react-router';
import UserIcon from '../../components/images/UserIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
// import Button from "../../components/Button";
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';

import Card from './Card';
import LinkItem from './LinkItem';
import { getToken } from '../../../modules/querystring/getToken';
import { RootState } from '../../../reduxStore';
import { PagePathEnum } from '../PagePathEnum';
import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { LoanOverViewSection } from '../../components/sections/LoanOverViewSection';
import { useEffect } from 'react';
import { PersonalInfoPageSagaActions } from './userUsecaseSaga';
import { Button } from '../../components/layouts/Button';
import {IndexPageSagaAction} from "../IndexPage/userUsecaseSaga/indexPageActions";

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
  }

  return (
    <Page className="flex flex-col ">
      <div className={`flex flex-row justify-center items-center my-4`}>
        <div className={`mr-3`}>
          <img src={UserIcon} />
        </div>
        <div className={`flex flex-col justify-center items-center `}>
          <div className={`font-bold`}>{user.userName}</div>
          <div
            className={cx(
              'rounded-2xl py-1 px-4 grow text-center leading-none text-sm mt-1',
              {
                'border-orange-500 text-orange-500 border':
                  user.state !== USER_AUTH_STATE.success,
                'border-emerald-500 text-emerald-500 border':
                  user.state === USER_AUTH_STATE.success,
              }
            )}
          >
            {user.state !== USER_AUTH_STATE.success
              ? 'Not Verified'
              : 'Verified'}
          </div>
        </div>
      </div>
      {user.state === USER_AUTH_STATE.ready && (
        <div
          className={`flex flex-row justify-around items-center py-2 px-4 bg-orange-100`}
        >
          <div>Verify now for highest amount</div>
          <Button
            onClick={onClickVerify}
            className={'py-1 px-2  w-auto'}
            text={
              <div className="flex flex-row items-center">
                Verify Now{<FiChevronRight className="ml-1" />}
              </div>
            }
          />
        </div>
      )}

      <div className="m-2">
        {user.state === USER_AUTH_STATE.success && (
          <div
            className={`shadow-[0_0px_8px_rgba(0,0,0,0.1)] m-2 p-4 rounded-md justify-end`}
          >
            <LoanOverViewSection state={indexPage} />
          </div>
        )}
        <Card>
          <LinkItem
            title={'Bank Card'}
            to={`${PagePathEnum.BankcardListPage}?token=${getToken()}`}
          />
        </Card>
        <Card>
          <LinkItem
            title={'Privacy Policy'}
            to={PagePathEnum.PrivacyPolicyPage}
          />
          <LinkItem
            title={'Disclosure Statement'}
            to={PagePathEnum.DisclosureStatementPage}
          />
        </Card>
        <Card>
          {app?.init?.partnership ? (
            <LinkItem title={'Partner'} to={'/partner'} />
          ) : (
            <></>
          )}
          <LinkItem
            title={'Customer Service'}
            to={PagePathEnum.CustomerServicePage}
          />
        </Card>
        {/* <Card><LinkItem title={'Rate Us 5 starts'} to={''} /></Card> */}
        {/* <div>Setting</div>
              <Card>
                  <ListItem title={'Privacy Policy'} text={''} />
                  <LinkItem title={'Disclosure Statement'} to={''} />
              </Card> */}
      </div>
      <div className="text-center my-2">
        <div
          onClick={() => {
            navigate(`${PagePathEnum.PersonalInfoPage}/log-out-modal`)
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
