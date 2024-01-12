import { InputProps } from 'libs/mobile/shared/ui/src/lib/components/Input/Input';
import React, { ClipboardEvent, useEffect } from 'react';

import { Input } from '@frontend/mobile/shared/ui';

import { InputValue } from '../form/InputValue';
import { environment } from "../../../../environments/environmentModule/environment";
import {
  PakistanCountry,
} from '@frontend/shared/domain';

type Props = {
  inputData: InputValue<string>;
  setInputData: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateData: any;
  inputLength?: number;
} & InputProps;

const ValidateInput = (props: Props) => {
  const { inputData, setInputData, inputLength = 1, onCopy, onCut } = props;
  const preventCopyPaste = (e: ClipboardEvent<any>) => {
    if (onCopy) return;
    e.preventDefault();
  };

  const preventCutPaste = (e: ClipboardEvent<any>) => {
    if (onCut) return;
    e.preventDefault();
  };

  const handleOnchange = (e: any) => {
    setInputData({
      ...props.inputData,
      data: e.target.value,
    });
  };

  const handleOnblur = () => {
    if (inputData.isEdit) return;
    handleValidate();
  };

  const handleValidate = () => {
    setInputData(props.validateData(inputData.data));
  };

  useEffect(() => {
    if (
      (inputLength && inputData.data.length >= inputLength) ||
      inputData.isEdit
    ) {
      handleValidate();
    }
  }, [inputData.data]);

  return (
    <Input
      {...props}
      onChange={handleOnchange}
      onBlur={handleOnblur}
      onCopy={(e) => { if(environment.country === PakistanCountry.country) { preventCopyPaste(e)}}}
      onCut={(e) => preventCutPaste(e)}
    />
  );
};

export default ValidateInput;
