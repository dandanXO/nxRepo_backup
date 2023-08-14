
import { Input } from '@frontend/mobile/shared/ui';
import { t } from 'i18next';
import { InputValue } from 'apps/app/src/app/modules/form/InputValue';

import { z } from 'zod';
import React, { ClipboardEvent, useEffect, useState } from 'react';
import { InputProps } from 'libs/mobile/shared/ui/src/lib/components/Input/Input';

export const validateMobile = (data: string) => {

    const message = t('Account number should be 10 or 10 digits starting with 0.');
    const scheme = z.string().regex(/^0/, message).length(11, message);
    const scheme2 = z.string().length(10, message);
    const result = z.union([scheme, scheme2]).safeParse(data);

    const isValidation = result.success;
    const errorMessage = !isValidation ? result.error.format()._errors[0] : '';
    return {
        data,
        isValidation,
        errorMessage,
        isEdit: true
    }
}

type Props = {
    inputData: InputValue<string>;
    setInputData: React.Dispatch<React.SetStateAction<InputValue<string>>>
} & InputProps; 

const MobileInput = (props: Props) => {
    const { inputData, setInputData } = props
    const preventCopyPaste = (e: ClipboardEvent<any>) => {
        e.preventDefault();
    };

    const handleOnchange = (e: any) => {
        setInputData({
            ...props.inputData,
            data: e.target.value
        })
    }

    const handleOnblur = () => {
        if (inputData.isEdit) return
        handleValidate()
    }

    const handleValidate = () => {
        setInputData(validateMobile(inputData.data));
    }

    useEffect(() => {
        if (inputData.data.length >= 10 || inputData.isEdit) {
            handleValidate()
        }
    }, [inputData.data])

    return (
        <Input
            {...props}
            onChange={handleOnchange}
            onBlur={handleOnblur}
            onCopy={(e) => preventCopyPaste(e)}
            onCut={(e) => preventCopyPaste(e)}
        />
    )
}




export default MobileInput;