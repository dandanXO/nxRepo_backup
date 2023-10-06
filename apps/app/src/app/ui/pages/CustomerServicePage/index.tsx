import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { isShowNavigation } from '../../../device/isShowNavigation';
import { USER_AUTH_STATE } from '../../../domain/user/USER_AUTH_STATE';
import { RootState } from '../../../reduxStore';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { Horizontal } from '../../core-components/Horizontal';
import { Navigation } from '../../core-components/Navigation';
import { useMailToRUL } from '../../hooks/useMailToRUL';
import CustomServiceIcon from './CustomServiceIcon';

const CustomerServicePage = () => {
  const navigate = useNavigate();
  const { app, indexPage } = useSelector((state: RootState) => state);
  const mailContentName =
    indexPage.user.state === USER_AUTH_STATE.ready
      ? 'guest'
      : indexPage?.user?.bankCardName || '';
  const { mailToURL } = useMailToRUL(mailContentName);

  return (
    <div className="flex h-full w-screen flex-col">
      <div
        className={`from-primary-assistant to-primary-main flex h-2/5  w-full flex-col rounded-b-[50px] bg-gradient-to-br `}
      >
        {isShowNavigation() && (
          <Navigation
            className="top-0 left-0 w-full bg-transparent"
            title={'Customer Service'}
            back={() => {
              navigate(
                `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`
              );
            }}
          />
        )}
        <div className="flex grow items-center justify-center">
          <CustomServiceIcon />
        </div>
      </div>
      <div className="mt-[-16px] w-full grow">
        <div className="bg-cbg-secondary mx-6 mt-[-16px] h-full rounded-md p-6 shadow-[0_0px_8px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between text-sm">
            <div>
              <div className="text-primary-main grow font-bold">
                {'Contact by Mail'}
              </div>
              <div>{app?.init?.csEmail || ''}</div>
            </div>
            <a href={mailToURL} className="self-center">
              <Button className={'py-1 px-5'} text={'Go'} />
            </a>
          </div>
          <div className="my-5">
            <Horizontal />
          </div>
          {indexPage.user.state !== USER_AUTH_STATE.ready &&
            indexPage.user.state !== USER_AUTH_STATE.authing &&
            indexPage.indexAPI?.customerServiceUrl &&
            indexPage.indexAPI?.customerServiceUrl !== '' && (
              <>
                <div className="flex justify-between text-sm ">
                  <div>
                    <div className="text-primary-main grow font-bold">
                      {'Online Customer Service'}
                    </div>
                    <div>{app?.init?.csServiceTime || ''}</div>
                  </div>
                  <div className="self-center">
                    <Button
                      text={'Go'}
                      className="w-auto py-1 px-5"
                      onClick={() => {
                        navigate(
                          `/v2/online-customer-service?token=${getToken()}`
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="my-5">
                  <Horizontal />
                </div>
              </>
            )}
          <div className="flex justify-between text-sm ">
            <div>
              <div className="text-primary-main grow font-bold">
                {'Feedback'}
              </div>
              <div>{app?.init?.csServiceTime || ''}</div>
            </div>
            <div className="self-center">
              <Button
                text={'Go'}
                className="w-auto py-1 px-5"
                onClick={() => {
                  navigate(
                    `${PageOrModalPathEnum.FeedbackPage}?token=${getToken()}`
                  );
                }}
              />
            </div>
          </div>
          {app?.init?.csContactNumber?.trim() && (
            <>
              <div className="my-5">
                <Horizontal />
              </div>
              <div className="flex justify-between text-sm ">
                <div>
                  <div className="text-primary-main grow font-bold">
                    {'Phone'}
                  </div>
                  <div>{app?.init?.csContactNumber || ''}</div>
                  <div>{app?.init?.csServiceTime || ''}</div>
                </div>
                <a
                  href={`tel:${app?.init?.csContactNumber || ''}`}
                  className="self-center"
                >
                  <Button className={'py-1 px-5'} text={'Go'} />
                </a>
              </div>
            </>
          )}
          {app?.init?.csWhatsApp?.trim() && (
            <>
              <div className="my-5">
                <Horizontal />
              </div>
              <div className="flex justify-between text-sm ">
                <div>
                  <div className="text-primary-main grow font-bold">
                    {'Whatsapp'}
                  </div>
                  <div>{app?.init?.csWhatsApp || ''}</div>
                  <div>{app?.init?.csServiceTime || ''}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerServicePage;
