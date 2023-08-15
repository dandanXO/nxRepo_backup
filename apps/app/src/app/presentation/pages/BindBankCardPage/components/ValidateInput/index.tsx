
import { Input } from '@frontend/mobile/shared/ui';
import { InputValue } from 'apps/app/src/app/modules/form/InputValue';
import React, { ClipboardEvent, useEffect, useState } from 'react';
import { InputProps } from 'libs/mobile/shared/ui/src/lib/components/Input/Input';

type Props = {
    inputData: InputValue<string>;
    setInputData: React.Dispatch<React.SetStateAction<InputValue<string>>>;
    validateData: any;
    inputLength?: number;
} & InputProps; 

const ValidateInput = (props: Props) => {
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
        setInputData(props.validateData(inputData.data));
    }

    useEffect(() => {
        if ((props.inputLength && inputData.data.length >= props.inputLength) || inputData.isEdit) {
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




export default ValidateInput;