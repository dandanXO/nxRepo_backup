import { ProductFormModal } from "../hooks/useProductFormModal";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "antd";
import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import { UploadSettingSection } from "./UploadSettingSection";
import { CustomAntFormFieldError } from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import { GetAvailableMerchantResponse } from "../../../../service/product/response/getAvailableMerchantResponse";
import OrderSettingSection from "./OrderSettingSection";
import { validatePreOrPostInterestGroups } from "../../../../../shared/components/other/validatePreOrPostInterestGroups";

interface ProductFormProps {
    productModalData: ProductFormModal;
    onFinish: (value: any) => void;
    form: any;
    merchantList: GetAvailableMerchantResponse[];
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    show: boolean;

    enableLoanAmount: boolean;
    enableReLoanAmount: boolean;
    setEnableLoanAmount: any;
    setEnableReLoanAmount: any;

}

const isOnChange = false;

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
    }, [form]);

    const setBackgroundImg = useCallback((url: string) => {
        form.setFieldsValue({
            backgroundImg: url
        });
    }, [form]);

    const validateRateValue = (rate) => {
        return Number(rate) > 100 || Number(rate) < 0 || rate === '' || isNaN(Number(rate));
    };

    const getChangedField = (allFields: any[], fieldName: string) => {
        const field = allFields.filter(field => field.name.toString() === fieldName)[0];
        return field;
    };

    const compareCount = (index, loanLength, loan, field) => {

        const isFirstField = index === 0;
        const isLastField = index === loanLength - 1;
        const prevIndex = isFirstField ? 0 : index - 1;
        const nextIndex = isLastField ? index - 1 : index + 1;

        const loanCount = Number(loan[index][field]);
        const prevField = Number(loan[prevIndex][field]);
        const nextField = Number(loan[nextIndex][field]);

        const comparePrev = isFirstField ? loanCount < nextField : loanCount > prevField;
        const compareNext = isLastField ? loanCount > nextField : loanCount < nextField;

        return comparePrev || compareNext;

    };

    const validateRiskRankLoanAmount = (validateForm) => {

        let formFieldError = {};

        const isFormError = validateForm.map((i, index) => {

            const validateError = i.loanAmount < 0 || isNaN(i.loanAmount) || i.loanAmount === '';
            const compareError = validateForm.length !== 1 ? compareCount(index, validateForm.length, validateForm, 'loanAmount') : false;
            const errorMessage = i.loanAmount < 0 || isNaN(i.loanAmount) ? '请输入大于0的整数' : (i.loanAmount === '' || i.loanAmount === undefined) ? `请输入初始额度` : '';
            const formIndex = validateForm.length === 1 ? i.index : index;

            formFieldError = {
                ...formFieldError,
                ...{
                    [`riskRankLoanAmount_${formIndex}`]: {
                        validateStatus: validateError || compareError ? "error" : '',
                        help: errorMessage
                    },
                }
            };
            return compareError;

        });

        formFieldError = {
            ...formFieldError,
            ...{
                [`riskRankLoanAmount_error`]: {
                    validateStatus: isFormError.includes(true) ? "error" : '',
                    help: isFormError.includes(true) ? <div>
                        <div>{"以上填写格式可能有以下错误，请再次检查并修正："}</div>
                        <div>{"▪ 所有字段都必须填写。"}</div>
                        <div>{"▪ 初始额度需由大至小填写≥0的整数。"}</div>
                        <div>{"▪ 各级距数值应≤上一级。"}</div>
                    </div> : ''
                },
            }
        };

        setCustomAntFormFieldError(prev => ({ ...prev, ...formFieldError }));
    };
    
    function equalRangeBelow100(str: string, min = 0, max = 100) {
        return Number(str) < min || Number(str) > max;
    }

    const isValueValidate = (value) => {
        return !value || isNaN(value) || equalRangeBelow100(value); 
    };
    const validatePreOrPostInterestRateField = (value, errorText, map, field) => {

        const helpText = !value ? errorText
            : isNaN(value) ? "请输入數字"
                : equalRangeBelow100(value) ? "请输入0-100间数字" : '';
        return {
            ...map,
            [field]: {
                validateStatus: helpText ? "error" : "",
                help: helpText,
                value: value,
            }
        };
    };

    const validatePreAndPostInterestRateSumBelow100 = (preInterestRate, postInterestRate, map, preInterestRateField, postInterestRateField) => {
        const isBelow100 = Number(preInterestRate) + Number(postInterestRate) > 100;
        return {
            ...map,
            [preInterestRateField]: {
                validateStatus: isBelow100 ? "error" : "",
                help: isBelow100 ? "前置利息＋后置利息不得超过100%" : "",
                value: preInterestRate,
            },
            [postInterestRateField]: {
                validateStatus: isBelow100 ? "error" : "",
                help: isBelow100 ? "前置利息＋后置利息不得超过100%" : "",
                value: postInterestRate,
            },
        };
    };
    
    
    // NOTICE: preInterestRate
    let map = {};
    const [interestRatePairsTouchInput, setInterestRatePairsTouchInput] = useState(null);
    return (
        <Form
            // ref={props.formRef}
            {...layout} form={form} name="control-hooks" onFinish={onFinish}
            onFieldsChange={(changedFields, allFields) => {

                if (changedFields[0].name[0] === "riskRankLoanAmount") {
                    const { riskRankLoanAmount } = form.getFieldsValue();
                    const changedField = [{ "loanAmount": changedFields[0].value, index: changedFields[0].name[1] }];
                    const isLoanFormNotFilled = riskRankLoanAmount.map(i => Object.values(i).includes(undefined)).includes(true);
                    const validateForm = isLoanFormNotFilled ? changedField : riskRankLoanAmount;
                    validateRiskRankLoanAmount(validateForm);
                }

                if (changedFields[0].name[0] === "newGuestLoanQuotaSwitch") {
                    props.setEnableLoanAmount(changedFields[0].value === 0);
                }

                if (changedFields[0].name[0] === "oldGuestLoanQuotaSwitch") {
                    props.setEnableReLoanAmount(changedFields[0].value === 0);
                }

                if (changedFields[0].name[0] === "productInterestRatePairs") {
                    setInterestRatePairsTouchInput(changedFields);
                }
              
                // NOTICE: 新客利息
                const preInterestRateField = allFields.filter(field => field.name && field.name[0] === "preInterestRate");
                const postInterestRateField = allFields.filter(field => field.name && field.name[0] === "postInterestRate");
                const inValidPreInterestRateUnit = isValueValidate(preInterestRateField[0].value);
                const inValidPostInterestRateUnit = isValueValidate(postInterestRateField[0].value);
              
                // NOTICE:  inValidPreInterestUnit
                if (changedFields[0].touched && changedFields[0].name[0] === "preInterestRate") {
                    map = validatePreOrPostInterestRateField(preInterestRateField[0].value, "请输入前置利息", map, 'preInterestRate');
              
                }

                // NOTICE:  inValidPostInterestUnit
                if (changedFields[0].touched && changedFields[0].name[0] === "postInterestRate") {
                    map = validatePreOrPostInterestRateField(postInterestRateField[0].value, "请输入後置利息", map, 'postInterestRate');
                }

               
                if ( !inValidPreInterestRateUnit && !inValidPostInterestRateUnit) {
                    map = validatePreAndPostInterestRateSumBelow100(preInterestRateField[0].value, postInterestRateField[0].value, map, 'preInterestRate', 'postInterestRate');
                }
               
                // NOTICE: 次新客利息
                const renewPreInterestRateField = allFields.filter(field => field.name && field.name[0] === "renewPreInterestRate");
                const renewPostInterestRateField = allFields.filter(field => field.name && field.name[0] === "renewPostInterestRate");

                const inValidRenewPreInterestRateUnit = isValueValidate(renewPreInterestRateField[0].value);
                const inValidRenewPostInterestRateUnit = isValueValidate(renewPostInterestRateField[0].value);


                if (changedFields[0].touched && changedFields[0].name[0] === "renewPreInterestRate") {
                    map = validatePreOrPostInterestRateField(renewPreInterestRateField[0].value, "请输入前置利息", map, 'renewPreInterestRate');
                }

                // NOTICE:  inValidPostInterestUnit
                if (changedFields[0].touched && changedFields[0].name[0] === "renewPostInterestRate") {
                    map =  validatePreOrPostInterestRateField(renewPostInterestRateField[0].value, "请输入後置利息", map, 'renewPostInterestRate');
             
                }

                if (!inValidRenewPreInterestRateUnit && !inValidRenewPostInterestRateUnit) {
                    map = validatePreAndPostInterestRateSumBelow100(renewPreInterestRateField[0].value, renewPostInterestRateField[0].value, map, 'renewPreInterestRate', 'renewPostInterestRate');
                }

                let productInterestRatePairsValidationMap = {};

                // 送出表單時欄位檢查
                if (changedFields.length > 1) {
                    map = {
                        ...customAntFormFieldError,
                        ...validatePreOrPostInterestRateField(preInterestRateField[0].value, "请输入前置利息", map, 'preInterestRate'),
                        ...validatePreOrPostInterestRateField(postInterestRateField[0].value, "请输入後置利息", map, 'postInterestRate'),
                        ...validatePreOrPostInterestRateField(renewPreInterestRateField[0].value, "请输入前置利息", map, 'renewPreInterestRate'),
                        ...validatePreOrPostInterestRateField(renewPostInterestRateField[0].value, "请输入後置利息", map, 'renewPostInterestRate'),
                    };

                    // NOTICE: 复贷利率
                    const { productInterestRatePairs } = props.form.getFieldsValue();
                    productInterestRatePairsValidationMap = validatePreOrPostInterestGroups(productInterestRatePairs);
                }
              

                setCustomAntFormFieldError(prev => {
                    const finalMap = Object.keys(productInterestRatePairsValidationMap).length > 0
                        ? productInterestRatePairsValidationMap
                        : prev.productInterestRatePairs;
                    return {
                        ...prev,
                        ...map,
                        productInterestRatePairs: finalMap as any,
                    };
                });



            }}
            initialValues={{
                // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`
                approveTimeUnit: "mins",
                extensible: false,
                top: false,
                enabled: true,
                templateType: 1,
                productInterestRatePairs: [],
                newGuestLoanQuotaSwitch: 1,
                oldGuestLoanQuotaSwitch: 1,
                newGuestProductDisplayStatus: 1,
                renewProductDisplayStatus: 1,
            }}
        >
            <BaseSettingSection merchantList={merchantList} isEdit={productModalData.isEdit} />
            <ProductSettingSection
                setLogo={setLogo}
                setBackgroundImg={setBackgroundImg}
            />
            <OrderSettingSection />
            <LoanSettingSection form={form}
                enableLoanAmount={props.enableLoanAmount}
                enableReLoanAmount={props.enableReLoanAmount}
                isEdit={productModalData.isEdit}
                customAntFormFieldError={customAntFormFieldError}
            />
            <RateSettingSection
                form={form}
                customAntFormFieldError={customAntFormFieldError}
                setCustomAntFormFieldError={setCustomAntFormFieldError}
                interestRatePairsTouchInput={interestRatePairsTouchInput}
            />
            <UploadSettingSection />
        </Form>
    );
};

export default Index;
