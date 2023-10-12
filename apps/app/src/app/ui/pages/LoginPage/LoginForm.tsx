import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// refactor
import { Input, InputValue } from '@frontend/mobile/shared/ui';

import { RootState } from '../../../reduxStore';
import { loginSlice } from '../../../reduxStore/loginSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { Button } from '../../core-components/Button';
import { LoginPageUseCaseActionsInstance } from './userUsecaseSaga';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phoneNumber: string | undefined = useSelector(
    (state: RootState) => state.login.phoneNo
  );
  const [phoneNumberData, setPhoneNumberData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  const validatePhoneFormat = (value: string) => {
    const isError = String(Number(value)) === 'NaN' || String(value) === '' || value.length !== 10;
    setPhoneNumberData({
      data: value,
      isValidation: !isError,
      errorMessage: isError ? '*Please enter the correct phone number.' : '',
    });
    setEnableGetOTP(!isError);
    dispatch(loginSlice.actions.updatePhoneNo(value));
  };

  useEffect(() => {
    if (phoneNumber) {
      validatePhoneFormat(phoneNumber);
    }
  }, [phoneNumber]);

  const [enableGetOTP, setEnableGetOTP] = useState(false);
  const [hasSendOTP, setHasSendOTP] = useState(false);
  const [doingCountdownSendOTP, setDoingCountdownSendOTP] = useState(false);

  const { resendSeconds } = useSelector((state: any) => state.login);
  // console.log("resendSeconds: ", resendSeconds);

  const [otpData, setOtpData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  const onClickGetOTP = () => {
    setDoingCountdownSendOTP(true);
    setHasSendOTP(true);

    dispatch(
      LoginPageUseCaseActionsInstance.user.getOTP({
        phone: phoneNumberData.data,
      })
    );
    dispatch(
      LoginPageUseCaseActionsInstance.system.resendSeconds({
        resendSeconds: 60,
      })
    );
  };
  useEffect(() => {
    dispatch(
      LoginPageUseCaseActionsInstance.system.resendSeconds({
        resendSeconds: 0,
      })
    );
  }, [])
  useEffect(() => {
    if (resendSeconds === 0) {
      setHasSendOTP(false);
      setDoingCountdownSendOTP(false);
      setOtpData({
        data: '',
        isValidation: false,
        errorMessage: '',
      });
    } else if (resendSeconds) {
      setHasSendOTP(true);
      setDoingCountdownSendOTP(true);
    }
  }, [resendSeconds]);

  const handleLogin = () => {
    if (phoneNumberData.data === '') {
      setPhoneNumberData({
        data: '',
        isValidation: false,
        errorMessage: '*Please enter the correct phone number.',
      });
    }

    if (otpData.data === '') {
      setOtpData({
        data: '',
        isValidation: false,
        errorMessage: '*Please confirm the code you received and try again.',
      });
    }

    if (phoneNumberData.isValidation && otpData.isValidation) {
      dispatch(
        LoginPageUseCaseActionsInstance.user.login({
          phone: phoneNumberData.data,
          otp: otpData.data,
        })
      );
    }
  };

  const appName: string = useSelector((state: RootState) => state.app.appName);

  return (
    <>
      <div className={`grow`}>
        <div className={`text-cTextFields-placeholder-main`}>Phone Number</div>
        <Input
          suffix={
            <Button
              dataTestingID={'getOTP'}
              text={
                !doingCountdownSendOTP
                  ? 'Get OTP'
                  : `Resend ( ${resendSeconds}s )`
              }
              disable={!(enableGetOTP && !hasSendOTP && !doingCountdownSendOTP)}
              className={cx('ml-2 w-auto py-1 px-2.5')}
              onClick={() => {
                enableGetOTP &&
                  !hasSendOTP &&
                  !doingCountdownSendOTP &&
                  onClickGetOTP();
              }}
            />
          }
          label={'+91' as string}
          labelType="left"
          value={phoneNumberData.data}
          textAlign={'left'}
          disabled={false}
          errorMessage={phoneNumberData.errorMessage}
          onBlur={(event: any) => {
            validatePhoneFormat(event.target.value);
          }}
          onChange={(event: any) => {
            validatePhoneFormat(event.target.value);
          }}
        />
        <div className={`text-cTextFields-placeholder-main mt-4`}>
          OTP Verification Code
        </div>
        <Input
          labelType="none"
          value={otpData.data}
          disabled={false}
          errorMessage={otpData.errorMessage}
          placeholder="OTP Verification Code"
          onChange={(event: any) => {
            const value = event.target.value;
            if (String(Number(value)) === 'NaN' || String(value) === '') {
              setOtpData({
                data: '',
                isValidation: false,
                errorMessage:
                  '*Please confirm the code you received and try again.',
              });
            } else {
              setOtpData((prev) => {
                return {
                  ...prev,
                  data: value,
                  isValidation: true,
                };
              });
            }
          }}
        />
      </div>
      <div className={`py-2`}>
        <Button
          dataTestingID={'Confirm'}
          text={'Confirm'}
          onClick={() => {
            handleLogin();
          }}
        />

        <div className="text-ctext-secondary py-4 text-xs">
          By continuing, you agree to our
          <span
            className="text-cstate-info-main decoration-cstate-info-main mx-1 underline"
            onClick={() =>
              navigate(`${PageOrModalPathEnum.PrivacyPolicyModal}`)
            }
          >
            Privacy Policy
          </span>
          . “{appName}” will send an SMS message to verify your phone number and
          account.
        </div>
      </div>
    </>
  );
};
