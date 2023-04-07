import { Button, Input, InputValue } from "@frontend/mobile/shared/ui";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";


export const LoginForm = () => {

    const [phoneNumberData, setPhoneNumberData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });
    const [otpData, setOtpData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const handleLogin = () => {
        if (phoneNumberData.data === '') {
            setPhoneNumberData({
                data: '',
                isValidation: false,
                errorMessage: '*Please enter the correct phone number.'

            });
        }

        if (otpData.data === '') {
            setOtpData({
                data: '',
                isValidation: false,
                errorMessage: '*Please confirm the code you received and try again.'
            });
        }

        if (phoneNumberData.isValidation && otpData.isValidation) {
            console.log('handleLogin')
        }

    }

    return (
        <>
            <div className={`grow`}>


                <div className={`text-slate-400`}>Phone Number</div>
                <Input
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
                            errorMessage: isError ? '*Please enter the correct phone number.' : ''
                        });
                    }}
                    onChange={(event: any) => {
                        const value = event.target.value;
                        if (String(Number(value)) === "NaN" || String(value) === "") {
                            setPhoneNumberData({
                                data: '',
                                isValidation: false,
                                errorMessage: '*Please enter the correct phone number.'

                            });
                        } else {
                            // if (Number(value) > Number(balance)) {
                            //     value = balance;
                            // }
                            setPhoneNumberData(prev => {
                                return {
                                    ...prev,
                                    data: value,
                                    isValidation: true,
                                }
                            });
                        }
                    }}
                />
                <div className={`text-slate-400 mt-4`}>OTP Verification Code</div>
                <Input
                    // label={'+91' as string}
                    // labelType="left"
                    value={otpData.data}
                    disabled={false}
                    errorMessage={otpData.errorMessage}
                    placeholder="OTP Verification Code"
                    onChange={(event: any) => {
                        const value = event.target.value;
                        if (String(Number(value)) === "NaN" || String(value) === "") {
                            setOtpData({
                                data: '',
                                isValidation: false,
                                errorMessage: '*Please confirm the code you received and try again.'
                            });
                        } else {
                            setOtpData(prev => {
                                return {
                                    ...prev,
                                    data: value,
                                    isValidation: true,
                                }
                            });
                        }
                    }}
                />
            </div>
            <div className={`py-2`}>
                <Button onClick={handleLogin}>{'Confirm'}</Button>
                <div className="leading-none py-4 text-sm"> By continuing, you agree and acknowledge you have read the
                    <Link className="text-sm underline decoration-blue-500 text-blue-500 mx-1" to={'/privacy-policy-modal'}>Privacy Policy</Link>
                    You also consent to receive SMS messages.Please carefully read the above agreement,
                    agreed to check and enter the next step.
                </div>
            </div>

        </>
    );
}