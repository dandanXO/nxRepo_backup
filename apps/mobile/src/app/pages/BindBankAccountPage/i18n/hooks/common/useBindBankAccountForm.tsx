import React, {useCallback, useState} from "react";
import type {InputValue} from "@frontend/mobile/shared/ui";
import {z} from "zod";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {i18nBankBindPageKey} from "../../translations";

const ValidationInfo = {
  min1: i18next.t("This field cannot be left blank", {ns: i18nBankBindPageKey.CommonKey}),
};

export const useBindBankAccountForm = () => {
    const {t} = useTranslation();

    // NOTE: FormInput - bankcardNoData
    const [bankcardNoData, setBankcardNoData] = useState<InputValue<string>>({
        data: "",
        isValidation: false,
        errorMessage: "",
    });

    const validateBankcardNo = useCallback(() => {
        const bankCardNoScheme = z
            .string()
            .min(1, ValidationInfo.min1)
            .min(9, t("Account number must be between from 9 to 18 digits only.", {ns: i18nBankBindPageKey.CommonKey}) as string)
            .max(
                18,
              t("Account number must be between from 9 to 18 digits only.", {ns: i18nBankBindPageKey.CommonKey}) as string
            );
        const result = bankCardNoScheme.safeParse(bankcardNoData.data);
        if (!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setBankcardNoData({
                ...bankcardNoData,
                isValidation: false,
                errorMessage,
            });
        } else {
            setBankcardNoData({
                ...bankcardNoData,
                isValidation: true,
                errorMessage: "",
            });
        }
    }, [bankcardNoData.data]);

    const onAccountNumberChange = (event: any) => {
      let data = event.target.value;
      data = data.replace(/[^0-9]/g, "");
      setBankcardNoData({
        ...bankcardNoData,
        data,
      });
    }

    const onAccountNumberBlur = () => {
      validateBankcardNo();
      if (String(confirmedBankcardNoData.data).length > 0) {
        validateConfirmedBankcardNo();
      }
    }

    // NOTE: FormInput - confirmedBankcardNoData
    const [confirmedBankcardNoData, setConfirmedBankcardNoData] = useState<
      InputValue<string>
      >({
      data: "",
      isValidation: false,
      errorMessage: "",
    });

    const validateConfirmedBankcardNo = useCallback(() => {
        const confirmedBankcardNo = confirmedBankcardNoData.data;
        const bankcardNo = bankcardNoData.data;
        const confirmedBankCardNoScheme = z
            .string()
            .refine(
                (confirmedBankcardNo) => confirmedBankcardNo === bankcardNo,
                {
                    message: t("Please make sure your account number match.", {ns: i18nBankBindPageKey.CommonKey}) as string
                  ,
                }
            );
        const result = confirmedBankCardNoScheme.safeParse(confirmedBankcardNo);
        if (!result.success) {
            const firstError = result.error.format();
            const errorMessage = firstError._errors[0];
            setConfirmedBankcardNoData({
                ...confirmedBankcardNoData,
                isValidation: false,
                errorMessage,
            });
        } else {
            setConfirmedBankcardNoData({
                ...confirmedBankcardNoData,
                isValidation: true,
                errorMessage: "",
            });
        }
    }, [confirmedBankcardNoData.data, bankcardNoData.data]);

    const onConfirmAccountNumberChange = (event: any) => {
      let data = event.target.value;
      data = data.replace(/[^0-9]/g, "");
      setConfirmedBankcardNoData({
        ...confirmedBankcardNoData,
        data,
      });
    }

    const onConfirmAccountNumberBlur = () => {
      validateConfirmedBankcardNo();
    }

    // NOTICE: reuse me
    const validate = useCallback(() => {

        // NOTE: FormInput
        validateBankcardNo();
        validateConfirmedBankcardNo();

        return bankcardNoData.isValidation && confirmedBankcardNoData.isValidation

    }, [
      // NOTICE: REFACTOR ME
        bankcardNoData.isValidation,
        bankcardNoData.data,
        confirmedBankcardNoData.isValidation,
        confirmedBankcardNoData.data, bankcardNoData.data
    ]);

    return {
      bankcardNoData,
      onAccountNumberChange,
      onAccountNumberBlur,
      confirmedBankcardNoData,
      onConfirmAccountNumberChange,
      onConfirmAccountNumberBlur,
      validate,
    }
};
