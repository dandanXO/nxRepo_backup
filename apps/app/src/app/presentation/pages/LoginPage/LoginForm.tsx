import { Input, InputValue } from '@frontend/mobile/shared/ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { Button } from '../../components/layouts/Button';
import { LoginPageSagaActions } from '../../../usecaseFlow/usecaseActionSaga/userUsecaseSaga/loginPageSaga';
import { useNavigate } from 'react-router';
import { PagePathEnum } from '../PagePathEnum';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resendSeconds } = useSelector((state: any) => state.login);

  const [phoneNumberData, setPhoneNumberData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });
  const [enableGetOTP, setEnableGetOTP] = useState(false);
  const [hasSendOTP, setHasSendOTP] = useState(false);
  const [doingCountdownSendOTP, setDoingCountdownSendOTP] = useState(false);

  const [otpData, setOtpData] = useState<InputValue<string>>({
    data: '',
    isValidation: false,
    errorMessage: '',
  });

  const onClickGetOTP = () => {
    dispatch(
      LoginPageSagaActions.user.getOTP({
        phone: phoneNumberData.data,
      })
    );
    dispatch(LoginPageSagaActions.system.resendSeconds({ resendSeconds: 60 }));
    setHasSendOTP(true);
    setDoingCountdownSendOTP(true);
  };

  useEffect(() => {
    if (resendSeconds === 0) {
      setHasSendOTP(false);
      setDoingCountdownSendOTP(false);
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
        LoginPageSagaActions.user.login({
          phone: phoneNumberData.data,
          otp: otpData.data,
        })
      );
    }
  };

  return (
    <>
      <div className={`grow`}>
        <div className={`text-slate-400`}>Phone Number</div>
        <Input
          suffix={
            <Button
              dataTestingID={'getOTP'}
              text={
                !doingCountdownSendOTP
                  ? 'Get OTP'
                  : `Resend ( ${resendSeconds}s )`
              }
              className={cx(
                {
                  'bg-[#F58B10] text-white':
                    enableGetOTP && !hasSendOTP && !doingCountdownSendOTP,
                  'bg-[#D7D7D7]': !(
                    enableGetOTP &&
                    !hasSendOTP &&
                    !doingCountdownSendOTP
                  ),
                },
                'ml-2 py-1 px-2.5'
              )}
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
          disabled={false}
          errorMessage={phoneNumberData.errorMessage}
          onBlur={(event: any) => {
            const value = event.target.value;
            const isError = value.length !== 10;
            setPhoneNumberData({
              data: value,
              isValidation: !isError,
              errorMessage: isError
                ? '*Please enter the correct phone number.'
                : '',
            });
            setEnableGetOTP(!isError);
          }}
          onChange={(event: any) => {
            const value = event.target.value;
            if (String(Number(value)) === 'NaN' || String(value) === '') {
              setPhoneNumberData({
                data: '',
                isValidation: false,
                errorMessage: '*Please enter the correct phone number.',
              });
              setEnableGetOTP(false);
            } else if (value.length !== 10) {
              setPhoneNumberData({
                data: value,
                isValidation: false,
                errorMessage: '*Please enter the correct phone number.',
              });
              setEnableGetOTP(false);
            } else {
              setPhoneNumberData((prev) => {
                return {
                  ...prev,
                  data: value,
                  isValidation: true,
                  errorMessage: '',
                };
              });
              setEnableGetOTP(true);
            }
          }}
        />
        <div className={`text-slate-400 mt-4`}>OTP Verification Code</div>
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
          dataTestingID={'apply'}
          text={'Confirm'}
          className={cx('text-white', {
            'bg-[#F58B10]': true,
          })}
          onClick={() => {
            handleLogin();
          }}
        />
        <div className="py-4 text-xs text-[#7B7B7B]">
          {' '}
          By continuing, you agree and acknowledge you have read the
          <span
            className="underline decoration-blue-500 text-blue-500 mx-1"
            onClick={() => navigate(PagePathEnum.PrivacyPolicyModal)}
          >
            Privacy Policy
          </span>
          You also consent to receive SMS messages.Please carefully read the
          above agreement, agreed to check and enter the next step.
        </div>
      </div>
    </>
  );
};
