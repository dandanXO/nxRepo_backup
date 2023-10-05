import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';

import { Button } from '../../core-components/Button';
import { PersonalInfoPageSagaActions } from '../../pages/PersonalInfoPage/userUsecaseSaga';
import {RootState} from "../../../reduxStore";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appName: string =  useSelector((state: RootState) => state.app.appName);

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
