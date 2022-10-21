import {ProductFormModal} from "../hooks/useProductFormModal";
import { GetAvailableMerchantResponse } from "../../../../api/types/getAvailbaleMerchant";
import React, {useCallback, useEffect, useState} from "react";
import { Form } from "antd";
import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import { UploadSettingSection } from "./UploadSettingSection";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";

interface ProductFormProps {
    productModalData: ProductFormModal;
    onFinish: (value: any) => void;
    form: any;
    merchantList: GetAvailableMerchantResponse;
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



    return (
        <Form
            // ref={props.formRef}
            {...layout} form={form} name="control-hooks" onFinish={onFinish}
            onFieldsChange={(changedFields, allFields) => {
                if(changedFields[0].name[0] ==="firstLoanQuotaSwitch") {
                    console.log("changedFields", changedFields[0].value);
                    props.setEnableLoanAmount(changedFields[0].value === 0)
                }

                if(changedFields[0].name[0] ==="reLoanQuotaSwitch") {
                    console.log("changedFields", changedFields[0].value);
                    props.setEnableReLoanAmount(changedFields[0].value === 0)
                }


                // console.log("allFields", allFields);

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
                                help: "请填写0-100间数字",
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
                                help: "请填写0-100间数字",
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
                                    help: "请填写0-100间数字",
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
                                    help: "请填写0-100间数字",
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
                                Number(productInterestRatePairsValidationMap[recordIndexKey].preInterest.value) +
                                Number(productInterestRatePairsValidationMap[recordIndexKey].postInterest.value) > 100
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
                firstLoanQuotaSwitch: 1,
                reLoanQuotaSwitch: 1,
            }}
        >
            <BaseSettingSection merchantList={merchantList} isEdit={productModalData.isEdit} />
            <ProductSettingSection
                setLogo={setLogo}
                setBackgroundImg={setBackgroundImg}
            />
            <LoanSettingSection form={form} enableLoanAmount={props.enableLoanAmount} enableReLoanAmount={props.enableReLoanAmount}/>
            <RateSettingSection form={form} customAntFormFieldError={customAntFormFieldError} />
            <UploadSettingSection />
        </Form>
    )
}

export default Index;
