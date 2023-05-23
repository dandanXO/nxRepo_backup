import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { Overlay } from '@frontend/mobile/shared/ui';

import { Button } from '../../components/layouts/Button';
import { PersonalInfoPageSagaActions } from '../../pages/PersonalInfoPage/userUsecaseSaga';

const LogoutModal = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('extend location', location);

  const appName = 'App Name';
  const onClickConfirm = () => {
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
                  <Button type={'secondary'} className={'w-full'} text={'Cancel'} onClick={() => navigate(-1)} />
                </div>
                <div className={`ml-1.5 grow`}>
                  <Button className={'w-full'} text={'Confirm'} onClick={onClickConfirm} />
                </div>
              </div>
            </div>
          );
        }}
        // enableTitleHorizontal={true}
      ></Overlay>
    </div>
  );
};

export default LogoutModal;
