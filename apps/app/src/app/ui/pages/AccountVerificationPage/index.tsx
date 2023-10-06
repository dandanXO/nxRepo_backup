import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { Input, InputValue } from '@frontend/mobile/shared/ui';

import { getToken } from '../../../application/getToken';
import { RootState } from '../../../reduxStore';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';

const AccountVerificationPage = () => {
  const navigate = useNavigate();

  const loginPhoneNumber: string | undefined =
    useSelector((state: RootState) => state.login.phoneNo) || '';
  const webviewPhoneNumber =
    useSelector((state: RootState) => state.app.androidAppInfo?.phoneNo) || '';
  const userPhoneNumber = loginPhoneNumber || webviewPhoneNumber;

  const [isInputChange, setIsInputChange] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });
  const onPhoneNumberChange = (event: any) => {
    const value = event.target.value;
    setPhoneNumber((prev) => ({
      ...prev,
      data: value,
    }));
    if (isInputChange || value.length >= 10 || !/^\d*$/.test(value)) {
      validatePhoneNumber(event);
    }
  };

  const validatePhoneNumber = (event: any) => {
    const value = event.target.value;
    const isValidPhoneNumber = !(/^\d*$/.test(value) && value.length === 10);
    const isUserPhoneNumber = value !== userPhoneNumber;
    setPhoneNumber((prev) => ({
      ...prev,
      isValidation: isValidPhoneNumber || isUserPhoneNumber,
      errorMessage: isValidPhoneNumber
        ? 'Please enter the correct phone number.'
        : isUserPhoneNumber
        ? 'Please double-check the number you entered as it does not match the registered number.'
        : '',
    }));

    if (!isInputChange) {
      setIsInputChange(true);
    }
  };

  return (
    <Page className={`flex flex-col`}>
      <Navigation
        title={'Account Verification'}
        back={() => {
          navigate(
            `${PageOrModalPathEnum.DeleteAccountPage}?token=${getToken()}`
          );
        }}
      />
      <div className={`p-4 pt-0`}>
        <div>
          <div className="text-ctext-primary mb-4 text-base font-bold leading-none">
            Please enter the phone number used during registration for identity
            verification.
          </div>
          <div className={'mb-1 text-sm'}>{'Phone Number'}</div>
          <Input
            name={'Phone Number'}
            className="mb-2"
            label={'+91' as string}
            labelType={'left'}
            outlineType={'outlined'}
            placeholder={'Phone Number'}
            value={phoneNumber.data}
            onChange={(e) => onPhoneNumberChange(e)}
            onBlur={(e) => validatePhoneNumber(e)}
            errorMessage={phoneNumber.errorMessage}
            textAlign={'left'}
          />
        </div>
        <div className={`flex`}>
          <div className={`mr-1.5 w-full`}>
            <Button
              onClick={() => {
                if (phoneNumber.data === '' || phoneNumber.isValidation) return;
                navigate(`delete-confirm-modal?token=${getToken()}`);
              }}
              text={'Confirm'}
              type={'ghost'}
            />
          </div>
          <div className={` ml-1.5 w-full`}>
            <Button
              onClick={() => {
                navigate(
                  `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`
                );
              }}
              text={'Next Time'}
              className={`border-primary-main bg-primary-main border-[1.5px] border-solid text-white`}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </Page>
  );
};

export default AccountVerificationPage;
