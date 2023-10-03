import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { RootState } from '../../../reduxStore';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { getToken } from '../../../modules/querystring/getToken';
import { Button } from '../../core-components/Button';
import { Input, InputValue } from '@frontend/mobile/shared/ui';
import { useState } from 'react';

const AccountVerificationPage = () => {
    const navigate = useNavigate();
    const userPhoneNumber = useSelector((state: RootState) => state.app.androidAppInfo?.phoneNo) || '';

    const [isInputChange,setIsInputChange]=useState(false)
    const [phoneNumber, setPhoneNumber] = useState<InputValue<string>>({
        data: '',
        isValidation: false,
        errorMessage: '',
    });
    const onPhoneNumberChange = (event: any) => {
        const value = event.target.value
        setPhoneNumber(prev => ({
            ...prev,
            data: value
        }))
        if (isInputChange || value.length >= 10 || !(/^\d*$/.test(value))) {
            validatePhoneNumber(event);
        }
    }


    const validatePhoneNumber = (event: any) => {
        const value = event.target.value
        const isValidPhoneNumber = !(/^\d*$/.test(value) && value.length === 10);
        const isUserPhoneNumber = value !== userPhoneNumber
        setPhoneNumber(prev => ({
            ...prev,
            isValidation: isValidPhoneNumber || isUserPhoneNumber,
            errorMessage: isValidPhoneNumber ? 'Please enter the correct phone number.' :
                isUserPhoneNumber ? 'Please double-check the number you entered as it does not match the registered number.' : '',
        }))

        if(!isInputChange){
            setIsInputChange(true)
        }
    }

    return (
        <Page className={`flex flex-col`}>
            <Navigation
                title={'Account Verification'}
                back={() => {
                    navigate(`${PageOrModalPathEnum.DeleteAccountPage}?token=${getToken()}`);
                }}
            />
            <div className={`p-4 pt-0`}>
                <div>
                    <div className='font-bold text-base text-ctext-primary mb-4 leading-none'>
                        Please enter the phone number used during registration for identity verification.
                    </div>
                    <div className={'text-sm mb-1'}>{'Phone Number'}</div>
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
                                if (phoneNumber.data === '' || phoneNumber.isValidation) return
                                navigate(`delete-confirm-modal?token=${getToken()}`);
                            }}
                            text={'Confirm'}
                            type={'ghost'}
                        />
                    </div>
                    <div className={` ml-1.5 w-full`}>
                        <Button
                            onClick={() => {
                                navigate(`${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`);
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
