import React, {useCallback, useState} from "react";
import {Input, InputValue} from "@frontend/mobile/shared/ui";
import {t} from "i18next";

//
// const InputExample = (props: any) => {
//   const [inputData, onInputBlur, onInputChange] = useInputContainer();
//   return (
//     <Input
//       className="mb"
//       labelType={'none'}
//       placeholder={'Ex. PK36FTBK0000111123456702'}
//       value={inputData.data}
//       errorMessage={inputData.errorMessage}
//       onChange={onInputChange}
//       onBlur={onInputBlur}
//     />
//   )
// }
//
// const useInputContainer = () => {
//   const [inputData, setInputData] = useState<InputValue<any | null>>({
//     data: null,
//     isValidation: false,
//     errorMessage: "",
//   });
//
//   const validateInput = useCallback(() => {
//     // const isValidateError = inputData.data === '' || inputData.data?.length !== 24;
//     const isValidateError = false;
//     setInputData({
//       data: inputData.data,
//       isValidation: !isValidateError,
//       errorMessage: isValidateError ?
//         inputData.data === '' ? t("This field cannot be left blank.") as string : t("IBAN number must be 24 digits only.") as string
//         : '',
//     });
//   }, [inputData.data])
//
//   const onInputChange = (event: any) => {
//     const value = event.target.value;
//     setInputData({
//       ...inputData,
//       data: value,
//     });
//   }
//
//   const onInputBlur = () => {
//     validateInput();
//   }
//
//   return [
//     inputData,
//     onInputBlur,
//     onInputChange,
//   ]
// }


// NOTE: 驗證 IBan Number
export const usePakistanIBanValidate = () => {
    // NOTE: FormInput - iBanNoData
    const [iBanData, setIBanData] = useState<InputValue<string>>({
      data: "",
      isValidation: false,
      errorMessage: "",
    });

    const validateIban = useCallback(() => {
        const isValidateError = iBanData.data === '' || iBanData.data.length !== 24;
        setIBanData({
            data: iBanData.data,
            isValidation: !isValidateError,
            errorMessage: isValidateError ?
                iBanData.data === '' ? t("This field cannot be left blank.") as string : t("IBAN number must be 24 digits only.") as string
                : '',
        });
    }, [iBanData.data])

    const onIBanChange = (event: any) => {
        const data = event.target.value;
        setIBanData({
            ...iBanData,
            data,
        });
    }

    const onIbanBlur = () => {
        validateIban();
    }

  return {
    iBanData,
    onIBanChange,
    onIbanBlur,
    validateIban,
  }
};
