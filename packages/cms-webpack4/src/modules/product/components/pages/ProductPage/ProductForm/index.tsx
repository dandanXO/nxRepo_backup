import {ProductFormModal} from "../hooks/useProductFormModal";
import React, {useCallback, useEffect, useState} from "react";
import { Form } from "antd";
import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import { UploadSettingSection } from "./UploadSettingSection";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import {GetAvailableMerchantResponse} from "../../../../service/product/response/getAvailableMerchantResponse";
import OrderSettingSection from "./OrderSettingSection";

interface ProductFormProps {
    productModalData: ProductFormModal;
    onFinish: (value: any) => void;
    form: any;
    merchantList: GetAvailableMerchantResponse[];
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
    show: boolean;

    enableLoanAmount: boolean;
    enableReLoanAmount:boolean;
    setEnableLoanAmount:any;
    setEnableReLoanAmount: any;

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

    const getChangedField = (allFields: any[],fieldName: string) => {
        const field = allFields.filter(field => field.name.toString() === fieldName)[0];
        return field;
    }

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

    }

    const validateRiskRankLoanAmount = (validateForm) => {

        let formFieldError = {};

        const isFormError = validateForm.map((i,index)=>{

            const validateError = i.loanAmount < 0 || isNaN(i.loanAmount) || i.loanAmount === '';
            const compareError = validateForm.length !== 1 ? compareCount(index, validateForm.length, validateForm, 'loanAmount') : false;
            const errorMessage = i.loanAmount < 0 || isNaN(i.loanAmount) ? '请输入大于0的整数' : (i.loanAmount === '' || i.loanAmount === undefined) ? `请输入初始额度` : '';
            const formIndex = validateForm.length === 1 ? i.index : index;

            formFieldError = {
                ...formFieldError,
                ...{
                    [`riskRankLoanAmount_${formIndex}`]: {
                        validateStatus:  validateError || compareError ? "error" : '',
                        help: errorMessage
                    },
                }
            }
           return compareError

        })

        formFieldError = {
            ...formFieldError,
            ...{
                [`riskRankLoanAmount_error`]: {
                    validateStatus: isFormError.includes(true) ? "error" : '',
                    help: isFormError.includes(true)?<div>
                               <div>{"以上填写格式可能有以下错误，请再次检查并修正："}</div>
                                <div>{"▪ 所有字段都必须填写。"}</div>
                                <div>{"▪ 初始额度需由大至小填写≥0的整数。"}</div>
                               <div>{"▪ 各级距数值应≤上一级。"}</div>
                       </div>:''
                },
            }
        }

        setCustomAntFormFieldError(prev => ({ ...prev, ...formFieldError }));
    }


    return (
        <Form
            // ref={props.formRef}
            {...layout} form={form} name="control-hooks" onFinish={onFinish}
            onFieldsChange={(changedFields, allFields) => {

                if(changedFields[0].name[0] ==="riskRankLoanAmount"){
                    const { riskRankLoanAmount } = form.getFieldsValue();
                    const changedField = [{ "loanAmount": changedFields[0].value, index: changedFields[0].name[1] }];
                    const isLoanFormNotFilled = riskRankLoanAmount.map(i => Object.values(i).includes(undefined)).includes(true);
                    const validateForm = isLoanFormNotFilled ? changedField : riskRankLoanAmount;
                    validateRiskRankLoanAmount(validateForm);
                }

                if(changedFields[0].name[0] ==="newGuestLoanQuotaSwitch") {
                    props.setEnableLoanAmount(changedFields[0].value === 0)
                }

                if(changedFields[0].name[0] ==="oldGuestLoanQuotaSwitch") {
                    props.setEnableReLoanAmount(changedFields[0].value === 0)
                }

                function empty(str) {
                    return str === ""
                }
                function equalRangeBelow100(str: string, min:number = 0, max: number = 100) {
                    return Number(str) < min || Number(str) > max
                }
                // NOTICE: preInterestRate
                let map = {

                }


                let inValidPreInterestRateUnit = false;

                const preInterestRateField = allFields.filter(field => field.name && field.name[0] ==="preInterestRate")

                if(preInterestRateField[0].touched && preInterestRateField[0].name && preInterestRateField[0].name[0] === "preInterestRate") {
                    if(empty(preInterestRateField[0].value)) {
                        inValidPreInterestRateUnit = true;
                        map = {
                            ...map,
                            preInterestRate: {
                                validateStatus: "error",
                                help: "请输入前置利息",
                                value: preInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidPreInterestRateUnit && isNaN(preInterestRateField[0].value)) {
                        inValidPreInterestRateUnit = true;
                        map = {
                            ...map,
                            preInterestRate: {
                                validateStatus: "error",
                                help: "请输入數字",
                                value: preInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidPreInterestRateUnit && equalRangeBelow100(preInterestRateField[0].value)) {
                        inValidPreInterestRateUnit = true;
                        map = {
                            ...map,
                            preInterestRate: {
                                validateStatus: "error",
                                help: "请输入0-100间数字",
                                value: preInterestRateField[0].value,
                            },
                        }
                    }

                    if(!inValidPreInterestRateUnit) {
                        map = {
                            ...map,
                            preInterestRate: {
                                validateStatus: "",
                                help: "",
                                value: preInterestRateField[0].value,
                            },
                        }
                    }
                }

                // console.log("preInterestRate.map", JSON.parse(JSON.stringify(map)));

                const postInterestRateField = allFields.filter(field => field.name && field.name[0] ==="postInterestRate")

                // NOTICE:  inValidPostInterestUnit
                let inValidPostInterestRateUnit = false;
                if(postInterestRateField[0].touched && postInterestRateField[0].name && postInterestRateField[0].name[0] === "postInterestRate") {
                    if(empty(postInterestRateField[0].value)) {
                        inValidPostInterestRateUnit = true;
                        map = {
                            ...map,
                            postInterestRate: {
                                validateStatus: "error",
                                help: "请输入後置利息",
                                value: postInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidPostInterestRateUnit && isNaN(postInterestRateField[0].value)) {
                        inValidPostInterestRateUnit = true;
                        map = {
                            ...map,
                            postInterestRate: {
                                validateStatus: "error",
                                help: "请输入數字",
                                value: postInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidPostInterestRateUnit && equalRangeBelow100(postInterestRateField[0].value)) {
                        inValidPostInterestRateUnit = true;
                        map = {
                            ...map,
                            postInterestRate: {
                                validateStatus: "error",
                                help: "请输入0-100间数字",
                                value: postInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidPostInterestRateUnit) {
                        map = {
                            ...map,
                            postInterestRate: {
                                validateStatus: "",
                                help: "",
                                value: postInterestRateField[0].value,
                            },
                        }
                    }
                }
                // console.log("postInterestRate.map", JSON.parse(JSON.stringify(map)));

                if(!inValidPreInterestRateUnit && !inValidPostInterestRateUnit) {
                    if(Number(getChangedField(allFields, "preInterestRate").value) +
                        Number(getChangedField(allFields, "postInterestRate").value) > 100) {
                        map = {
                            ...map,
                            preInterestRate: {
                                validateStatus: "error",
                                help: "前置利息＋后置利息不得超过100%"
                            },
                            postInterestRate: {
                                validateStatus: "error",
                                help: "前置利息＋后置利息不得超过100%"
                            },
                        }
                    } else {
                        map = {
                            ...map,
                            preInterestRate: {
                                validateStatus: "",
                                help: ""
                            },
                            postInterestRate: {
                                validateStatus: "",
                                help: ""
                            },
                        }
                    }
                }
                // console.log("map", map);


                // NOTICE: 次新客利息

                let inValidRenewPreInterestRateUnit = false;

                const renewPreInterestRateField = allFields.filter(field => field.name && field.name[0] ==="renewPreInterestRate")

                if(renewPreInterestRateField[0].touched && renewPreInterestRateField[0].name && renewPreInterestRateField[0].name[0] === "renewPreInterestRate") {
                    if(empty(renewPreInterestRateField[0].value)) {
                        inValidRenewPreInterestRateUnit = true;
                        map = {
                            ...map,
                            renewPreInterestRate: {
                                validateStatus: "error",
                                help: "请输入前置利息",
                                value: renewPreInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidRenewPreInterestRateUnit && isNaN(renewPreInterestRateField[0].value)) {
                        inValidRenewPreInterestRateUnit = true;
                        map = {
                            ...map,
                            renewPreInterestRate: {
                                validateStatus: "error",
                                help: "请输入數字",
                                value: renewPreInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidRenewPreInterestRateUnit && equalRangeBelow100(renewPreInterestRateField[0].value)) {
                        inValidRenewPreInterestRateUnit = true;
                        map = {
                            ...map,
                            renewPreInterestRate: {
                                validateStatus: "error",
                                help: "请输入0-100间数字",
                                value: renewPreInterestRateField[0].value,
                            },
                        }
                    }

                    if(!inValidRenewPreInterestRateUnit) {
                        map = {
                            ...map,
                            renewPreInterestRate: {
                                validateStatus: "",
                                help: "",
                                value: renewPreInterestRateField[0].value,
                            },
                        }
                    }
                }

                // console.log("renewPreInterestRate.map", JSON.parse(JSON.stringify(map)));

                const renewPostInterestRateField = allFields.filter(field => field.name && field.name[0] ==="renewPostInterestRate")

                // NOTICE:  inValidPostInterestUnit
                let inValidRenewPostInterestRateUnit = false;
                if(renewPostInterestRateField[0].touched && renewPostInterestRateField[0].name && renewPostInterestRateField[0].name[0] === "renewPostInterestRate") {
                    if(empty(renewPostInterestRateField[0].value)) {
                        inValidRenewPostInterestRateUnit = true;
                        map = {
                            ...map,
                            renewPostInterestRate: {
                                validateStatus: "error",
                                help: "请输入後置利息",
                                value: renewPostInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidRenewPostInterestRateUnit && isNaN(renewPostInterestRateField[0].value)) {
                        inValidRenewPostInterestRateUnit = true;
                        map = {
                            ...map,
                            renewPostInterestRate: {
                                validateStatus: "error",
                                help: "请输入數字",
                                value: renewPostInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidRenewPostInterestRateUnit && equalRangeBelow100(renewPostInterestRateField[0].value)) {
                        inValidRenewPostInterestRateUnit = true;
                        map = {
                            ...map,
                            renewPostInterestRate: {
                                validateStatus: "error",
                                help: "请输入0-100间数字",
                                value: renewPostInterestRateField[0].value,
                            },
                        }
                    }
                    if(!inValidRenewPostInterestRateUnit) {
                        map = {
                            ...map,
                            renewPostInterestRate: {
                                validateStatus: "",
                                help: "",
                                value: renewPostInterestRateField[0].value,
                            },
                        }
                    }
                }
                // console.log("renewPostInterestRate.map", JSON.parse(JSON.stringify(map)));

                if(!inValidRenewPreInterestRateUnit && !inValidRenewPostInterestRateUnit) {
                    if(Number(getChangedField(allFields, "renewPreInterestRate").value) +
                        Number(getChangedField(allFields, "renewPostInterestRate").value) > 100) {
                        map = {
                            ...map,
                            renewPreInterestRate: {
                                validateStatus: "error",
                                help: "前置利息＋后置利息不得超过100%"
                            },
                            renewPostInterestRate: {
                                validateStatus: "error",
                                help: "前置利息＋后置利息不得超过100%"
                            },
                        }
                    } else {
                        map = {
                            ...map,
                            renewPreInterestRate: {
                                validateStatus: "",
                                help: ""
                            },
                            renewPostInterestRate: {
                                validateStatus: "",
                                help: ""
                            },
                        }
                    }
                }
                // console.log("map", map);



                // NOTICE: END 次新客利息
                let productInterestRatePairsValidationMap = {}
                // NOTICE: productInterestRatePairs
                if(changedFields[0].touched && changedFields[0].name && changedFields[0].name[0] === "productInterestRatePairs") {

                    const productInterestRatePairs = allFields.filter(field => field.name && (field.name as any).length === 3 && field.name[0] ==="productInterestRatePairs")
                    // console.log("productInterestRatePairs", productInterestRatePairs);


                    let recordIndex
                    productInterestRatePairs.map((row, index) => {
                        recordIndex = row.name[1] !== recordIndex ? recordIndex = row.name[1] : recordIndex;
                        // console.log("recordIndex", recordIndex);

                        // NOTE: 前置利息
                        let inValidPreInterest = false;

                        if(row.name[1] === recordIndex && row.touched && (row.name[2] as any).indexOf("preInterest") > -1 && empty(row.value)) {
                            inValidPreInterest = true;
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                preInterest: {
                                    validateStatus: "error",
                                    help: "请输入前置利息",
                                    value: row.value,
                                },
                            }
                        }

                        if(row.name[1] === recordIndex && row.touched && !inValidPreInterest && (row.name[2] as any).indexOf("preInterest") > -1 && isNaN(row.value)) {
                            inValidPreInterest = true;
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                preInterest: {
                                    validateStatus: "error",
                                    help: "请输入數字",
                                    value: row.value,
                                },
                            }
                        }


                        if(row.name[1] === recordIndex && row.touched && !inValidPreInterest && (row.name[2] as any).indexOf("preInterest") > -1 && equalRangeBelow100(row.value)) {
                            inValidPreInterest = true;
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                preInterest: {
                                    validateStatus: "error",
                                    help: "请输入0-100间数字",
                                    value: row.value,
                                },
                            }
                        }

                        if(row.name[1] === recordIndex && row.touched && !inValidPreInterest && (row.name[2] as any).indexOf("preInterest") > -1 ) {
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                preInterest: {
                                    validateStatus: "",
                                    help: "",
                                    value: row.value,
                                },
                            }
                        }

                        // NOTE: 後置利息
                        let inValidPostInterest = false;

                        if(row.name[1] === recordIndex && row.touched && (row.name[2] as any).indexOf("postInterest") > -1 && empty(row.value)) {
                            inValidPostInterest = true;
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                postInterest: {
                                    validateStatus: "error",
                                    help: "请输入後置利息",
                                    value: row.value,
                                },
                            }
                        }

                        if(row.name[1] === recordIndex && row.touched && !inValidPostInterest && (row.name[2] as any).indexOf("postInterest") > -1 && isNaN(row.value)) {
                            inValidPostInterest = true;
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                postInterest: {
                                    validateStatus: "error",
                                    help: "请输入數字",
                                    value: row.value,
                                },
                            }
                        }
                        if(row.name[1] === recordIndex && row.touched && !inValidPostInterest && (row.name[2] as any).indexOf("postInterest") > -1 && equalRangeBelow100(row.value)) {
                            inValidPostInterest = true;
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                postInterest: {
                                    validateStatus: "error",
                                    help: "请输入0-100间数字",
                                    value: row.value,
                                },
                            }
                        }
                        if(row.name[1] === recordIndex && row.touched && !inValidPostInterest && (row.name[2] as any).indexOf("postInterest") > -1 ) {
                            productInterestRatePairsValidationMap[recordIndex] = {
                                ...productInterestRatePairsValidationMap[recordIndex],
                                postInterest: {
                                    validateStatus: "",
                                    help: "",
                                    value: row.value,
                                },
                            }
                        }
                    })


                    Object.keys(productInterestRatePairsValidationMap).map(recordIndexKey => {
                        if(
                            productInterestRatePairsValidationMap[recordIndexKey]?.preInterest?.validateStatus !== "error"  &&
                            productInterestRatePairsValidationMap[recordIndexKey]?.postInterest?.validateStatus !== "error"
                        ) {
                            if(
                                Number(productInterestRatePairsValidationMap[recordIndexKey].preInterest?.value) +
                                Number(productInterestRatePairsValidationMap[recordIndexKey].postInterest?.value) > 100
                            ) {
                                productInterestRatePairsValidationMap[recordIndexKey] = {
                                    preInterest: {
                                        validateStatus: "error",
                                        help: "前置利息＋后置利息不得超过100%"
                                    },
                                    postInterest: {
                                        validateStatus: "error",
                                        help: "前置利息＋后置利息不得超过100%"
                                    },
                                }
                            } else {
                                productInterestRatePairsValidationMap[recordIndexKey] = {
                                    preInterest: {
                                        validateStatus: "",
                                        help: ""
                                    },
                                    postInterest: {
                                        validateStatus: "",
                                        help: ""
                                    },
                                }
                            }
                        }

                    })



                }

                // console.log("productInterestRatePairsValidationMap.1", productInterestRatePairsValidationMap);



                setCustomAntFormFieldError(prev => {
                    const finalMap = {}
                    if(prev.productInterestRatePairs) {
                        Object.keys(prev.productInterestRatePairs).map((key, index) => {
                            // console.log("key", key);
                            finalMap[key] = prev.productInterestRatePairs[key];
                        })
                    }
                    if(productInterestRatePairsValidationMap) {
                        Object.keys(productInterestRatePairsValidationMap).map((key, index) => {
                            finalMap[key] = {
                                ...finalMap[key],
                                ...productInterestRatePairsValidationMap[key]
                            };
                        })
                    }

                    // console.log("productInterestRatePairsValidationMap.2", productInterestRatePairsValidationMap);

                    return {
                        ...prev,
                        ...map,
                        productInterestRatePairs: finalMap as any,
                    }
                })



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
                    plusAmount: "",
                }],
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
            <OrderSettingSection/>
            <LoanSettingSection form={form}
                enableLoanAmount={props.enableLoanAmount}
                enableReLoanAmount={props.enableReLoanAmount}
                isEdit={productModalData.isEdit}
                customAntFormFieldError={customAntFormFieldError}
            />
            <RateSettingSection form={form} customAntFormFieldError={customAntFormFieldError} />
            <UploadSettingSection />
        </Form>
    )
}

export default Index;
