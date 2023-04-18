import React, {useCallback, useEffect, useState} from "react";
import { InputValue } from "@frontend/mobile/shared/ui";
import { t } from "i18next";

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
