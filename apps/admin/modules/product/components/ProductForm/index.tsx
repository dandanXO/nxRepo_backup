import { CustomAntFormFieldError, ProductFormModal } from "../../hooks/useProductFormModal";
import { GetAvailableMerchantResponse } from "../../api/types/getAvailbaleMerchant";
import React, { useCallback, useEffect } from "react";
import { Form } from "antd";
import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import { UploadSettingSection } from "./UploadSettingSection";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { conversionSubmitValue } from "@ant-design/pro-components";

interface ProductFormProps {
    productModalData: ProductFormModal;
    onFinish: (value: any) => void;
    form: any;
    merchantList: GetAvailableMerchantResponse;
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    show: boolean;
}

let isOnChange = false;

const Index = (props: ProductFormProps) => {
    const { productModalData, onFinish, form, merchantList, customAntFormFieldError, setCustomAntFormFieldError } = props;

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    const setLogo = useCallback((url: string) => {
        form.setFieldsValue({
            logo: url
        });
    }, [form])

    const setBackgroundImg = useCallback((url: string) => {
        form.setFieldsValue({
            backgroundImg: url
        });
    }, [form])

    const validateRateValue = (rate) => {
        return Number(rate) > 100 || Number(rate) < 0 || rate === '' || isNaN(Number(rate));
    }

    return (
        <Form
            // ref={props.formRef}
            {...layout} form={form} name="control-hooks" onFinish={onFinish}
            onFieldsChange={(changedFields, allFields) => {
                // console.log("changedFields", changedFields)
                // console.log("allFields", allFields)
                const preInterestRate = allFields.filter(field => field.name.toString() === "preInterestRate")[0]?.value ?? '';
                const postInterestRate = allFields.filter(field => field.name.toString() === "postInterestRate")[0]?.value ?? '';
                let isValidate = true;
                const onChangeField = changedFields[0]?.name[0];
                const onChangeFieldValue = allFields.filter(field => field.name.toString() === onChangeField)[0]?.value ?? undefined;
                const unChangeField = onChangeField === "preInterestRate" ? "postInterestRate" : "preInterestRate";
                const unChangeFieldValue = allFields.filter(field => field.name.toString() === unChangeField)[0]?.value ?? undefined;
                const validateOnchangeFieldValue = validateRateValue(onChangeFieldValue);
                const validateUnchangeFieldValue = validateRateValue(unChangeFieldValue);
                const validatePreInterestRateValue = validateRateValue(preInterestRate);
                const validatePostInterestRateValue = validateRateValue(postInterestRate);

                const isFieldChange = changedFields[0].touched;

                if (!isFieldChange && !isOnChange && (onChangeField !== "preInterestRate" || onChangeField !== "postInterestRate")) {
                    isOnChange = true;
                    console.log("changedFields", changedFields)
                    if (preInterestRate === '' || postInterestRate === '') {
                        setCustomAntFormFieldError(prev => ({
                            ...customAntFormFieldError,
                            ...prev,
                            preInterestRate: validatePreInterestRateValue ? { validateStatus: "error", help: "请填写0-100间数字" } : { validateStatus: "", help: "" },
                            postInterestRate: validatePostInterestRateValue ? { validateStatus: "error", help: "请填写0-100间数字" } : { validateStatus: "", help: "" },
                        }))
                        isValidate = false;
                    }
                }
                if (validateOnchangeFieldValue) { isValidate = false; }
                setCustomAntFormFieldError(prev => {
                    const isError = prev[unChangeField].help;
                    return {
                        ...customAntFormFieldError,
                        ...prev,
                        [onChangeField]: validateOnchangeFieldValue ? { validateStatus: "error", help: "请填写0-100间数字" } : { validateStatus: "", help: "" },
                        [unChangeField]: isError === '' ? { validateStatus: "", help: "" } : validateUnchangeFieldValue ? { validateStatus: "error", help: "请填写0-100间数字" } : { validateStatus: "", help: "" },
                    }
                })

                if (isValidate && Number(preInterestRate) + Number(postInterestRate) > 100) {
                    setCustomAntFormFieldError(prev => ({
                        ...customAntFormFieldError,
                        ...prev,
                        preInterestRate: { validateStatus: "error", help: "前置利息＋后置利息不得超过100%" },
                        postInterestRate: { validateStatus: "error", help: "前置利息＋后置利息不得超过100%" }
                    }))
                }



            }}
            initialValues={{
                // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`
                approveTimeUnit: "mins",
                extensible: false,
                top: false,
                enabled: true,
                templateType: 1,
                productInterestRatePairs: [{
                    num: "",
                    postInterest: "",
                    preInterest: "",
                }]
            }}
        >
            <BaseSettingSection merchantList={merchantList} isEdit={productModalData.isEdit} />
            <ProductSettingSection setLogo={setLogo} setBackgroundImg={setBackgroundImg} />
            <LoanSettingSection />
            <RateSettingSection form={form} customAntFormFieldError={customAntFormFieldError} />
            <UploadSettingSection />
        </Form>
    )
}

export default Index;
