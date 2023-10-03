import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';

import { NativeAppInfo } from '../../../persistant/nativeAppInfo';
import { Button } from '../../core-components/Button';
import { PersonalInfoPageSagaActions } from '../../pages/PersonalInfoPage/userUsecaseSaga';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appName = NativeAppInfo.appName;

  // NOTE: User Event
  const onUserClickToConfirm = () => {
    dispatch(PersonalInfoPageSagaActions.user.logout());
  };

  return (
    <div>
      <Overlay
        show={true}
        title="Confirm"
        content={(hide: () => void) => {
          return (
            <div className={`p-2`}>
              <div className="mb-4 text-xl font-bold">Confirm</div>
              <div>{`Are you sure you want to exit ${appName}?`}</div>
              <div className={`mt-6 flex flex-row`}>
                <div className={`mr-1.5 grow`}>
                  <Button type={'ghost'} ghostTheme={'tertiary'} className={'w-full'} text={'Cancel'} onClick={() => navigate(-1)} />
                </div>
                <div className={`ml-1.5 grow`}>
                  <Button className={'w-full'} text={'Log out'} onClick={onUserClickToConfirm} />
                </div>
              </div>
            </div>
          );
        }}
        // enableTitleHorizontal={true}
      />
    </div>
  );
};

export default LogoutModal;
