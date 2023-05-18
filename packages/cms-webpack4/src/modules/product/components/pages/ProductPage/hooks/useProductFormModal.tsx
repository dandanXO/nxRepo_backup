import { Form, Modal, UploadFile } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
    useGetAvailableMerchantListQuery,
    useLazyGetProductManageListQuery,
    useLazyGetProductQuery,
    usePostProductCreateMutation,
    usePutProductEditMutation
} from "../../../../service/product/ProductApi";
import moment from "moment/moment";
import { CustomAntFormFieldError } from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import { ProductTypes } from "../../../../service/product/domain/productTypes";
import { productInterestRatePairsGroupIndexMap } from "../ProductForm";
export interface ProductFormModal {
    show: boolean;
    isEdit?: boolean
    productId?: number
    triggerTableGetList?: any;
    formRef?: any;
}


export interface FormUploadFileList {
    uid: string;
    name: string;
    url: string;
}

export interface ProductFormUploads {
    logoFileList: UploadFile[];
    backgroundImgFileList: UploadFile[];
}
export const useProductFormModal = (props: ProductFormModal) => {

    const [modal, contextHolder] = Modal.useModal();
    const [tempFormData, setTempFormData] = useState({
        productInterestRatePairs: undefined
    });

    const [productModalData, setProductModalData] = useState<ProductFormModal>({
        show: props.show,
        isEdit: props.isEdit,
        productId: props.productId,
        triggerTableGetList: props.triggerTableGetList
    });
    const [triggerFetchTableList, setTriggerFetchTableList] = useState<any>();
    // console.log("productModalData", productModalData);


    // NOTICE: form
    const [form] = Form.useForm();

    const [triggerGetProduct, { data, currentData: productFormData, isLoading: isGetProductLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetProductQuery({

    });

    const initCustomAntFormFieldError = {
        preInterestRate: { validateStatus: "", help: "" },
        postInterestRate: { validateStatus: "", help: "" },
        renewPostInterestRate: { validateStatus: "", help: "" },
        renewPreInterestRate: { validateStatus: "", help: "" },
        productInterestRatePairsChecked: { validateStatus: "", help: ""},
        productInterestRatePairs: {}
    }

    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>(initCustomAntFormFieldError)
    const { currentData: merchantList, isSuccess: isGetMerchantListSuccess } = useGetAvailableMerchantListQuery(null);
    const [postProductCreate, { isLoading }] = usePostProductCreateMutation();
    const [putProduct, { isSuccess: isPutProductSuccess }] = usePutProductEditMutation();

    useEffect(() => {
        if (!productModalData.productId) {
            return;
        }
        triggerGetProduct({
            productId: productModalData.productId,
        })
    }, [productModalData.productId])


    const [enableLoanAmount, setEnableLoanAmount] = useState<boolean>(false);
    const [enableReLoanAmount, setEnableReLoanAmount] = useState<boolean>(false);



    useEffect(() => {
        if (isFetching) return;
        // if(!productModalData.productId) return;
        // console.log("productFormData.merchantId", productFormData?.merchantId);
        // console.log("merchantList", merchantList);
        if (!productFormData) return;
        if (!merchantList) return;


        setEnableLoanAmount(productFormData.newGuestLoanQuotaSwitch === false)
        setEnableReLoanAmount(productFormData.oldGuestLoanQuotaSwitch === false)


        const currentMerchant = merchantList?.find(merchant => merchant.merchantId === productFormData.merchantId);

        if (!productModalData.productId) {
            form.resetFields();
            setCustomAntFormFieldError(initCustomAntFormFieldError);
        } else {
            const productInterestRatePairs = productFormData.productInterestRatePairs.reduce((acc, current)=> {
                if (!current['riskRank']) return acc;

                const groupIndex = productInterestRatePairsGroupIndexMap[current['riskRank']]
                acc[groupIndex]['content'] = [
                    ...acc[groupIndex]['content'],
                    {
                        ...current,
                        preInterest: fixedFloatNumberToFixed3(current.preInterest * 100),
                        postInterest: fixedFloatNumberToFixed3(current.postInterest * 100),
                    }
                ]
                return acc
            }, [{ content: [] }, { content: [] }, { content: [] }, { content: [] }])

            setTempFormData({ productInterestRatePairs })

            form.setFieldsValue({
                merchantId: currentMerchant?.name,
                productName: productFormData.productName,
                // NOTICE: 後端移除
                // adminUsername: productFormData.adminUsername,
                // NOTICE: 後端不回傳真正密碼
                // NOTICE: 後端移除
                // adminPassword: null,
                logo: productFormData.logo,
                logoUpload: [{
                    uid: '1',
                    name: productFormData.logo && productFormData.logo.split("/") && productFormData.logo.split("/")[productFormData.logo.length - 1],
                    url: productFormData.logo,
                }],
                backgroundImg: productFormData.backgroundImg,
                backgroundImgUpload: [{
                    uid: '1',
                    name: productFormData.backgroundImg && productFormData.backgroundImg.split("/") && productFormData.backgroundImg.split("/")[productFormData.backgroundImg.length - 1],
                    url: productFormData.backgroundImg,
                }],

                amountRangeLow: productFormData.amountRange.split("-")[0],
                amountRangeHigh: productFormData.amountRange.split("-")[1],
                interestRangeLow: productFormData.interestRange.split(" - ")[0],
                interestRangeHigh: productFormData.interestRange?.split(" - ")[1]?.split("% / day")[0],
                termRangeLow: productFormData.termRange.split("-")[0],
                termRangeHigh: productFormData.termRange.split("-")[1].split("Days")[0],
                approveRate: `${productFormData.approveRate.split("%")[0]}`,
                approveTime: productFormData.approveTime.split(" ")[0],
                approveTimeUnit: productFormData.approveTime.split(" ")[1],
                csContact: productFormData.csContact,
                csEmail: productFormData.csEmail,
                csTime: [
                    moment(productFormData.csTime.split(" - ")[0], 'h:mm'),
                    moment(productFormData.csTime.split(" - ")[1], 'h:mm'),
                ],
                loanTerm: productFormData.loanTerm,

                maxAmount: productFormData.maxAmount,
                extensible: productFormData.extensible,
                extensibleOverdueDays: productFormData.extensibleOverdueDays,

                newGuestLoanQuotaSwitch: productFormData.newGuestLoanQuotaSwitch === true ? 1 : 0,
                oldGuestLoanQuotaSwitch: productFormData.oldGuestLoanQuotaSwitch === true ? 1 : 0,
                oldGuestLoanAmount: productFormData.oldGuestLoanAmount,

                riskRankLoanAmount: productFormData.riskRankLoanAmount,


                newGuestMaxThreshold: productFormData.newGuestMaxThreshold,
                renewMaxThreshold: productFormData.renewMaxThreshold,

                preInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.preInterestRate) * 100)}`,
                postInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.postInterestRate) * 100)}`,

                renewPreInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.renewPreInterestRate) * 100)}`,
                renewPostInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.renewPostInterestRate) * 100)}`,

                newGuestProductDisplayStatus: productFormData.newGuestProductDisplayStatus,
                renewProductDisplayStatus: productFormData.renewProductDisplayStatus,

                dailyRate: `${fixedFloatNumberToFixed3(Number(productFormData.dailyRate) * 100)}`,
                dummy: productFormData.dummy,
                extensionRate: `${fixedFloatNumberToFixed3(Number(productFormData.extensionRate) * 100)}`,
                overdueRate: `${fixedFloatNumberToFixed3(Number(productFormData.overdueRate) * 100)}`,
                productInterestRatePairsChecked: productFormData.productInterestRatePairs.length > 0,
                top: productFormData.top,
                tags: productFormData.tags.split(","),
                templateType: productFormData.templateType,
                weight: productFormData.weight,
                enabled: productFormData.enabled,
                productInterestRatePairs
            })
        }

        // console.log("productFormData", productFormData);
    }, [isFetching])


    const [triggerGetList, { currentData: productListData }] = useLazyGetProductManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const handlePostProductCreate = useCallback((values) => {
        const action = !productModalData.isEdit ? postProductCreate : putProduct;
        if (productModalData.isEdit) {
            values = {
                ...values,
                productId: productModalData.productId,
            }
        }
        action(values).unwrap().then((responseData) => {
            // console.log("responseData", responseData);
            // console.log(responseData?.message)
            // console.log(responseData?.code)
            setProductModalData({
                show: false,
                // ...responseData,
            });

            // console.log("props.formRef", props.formRef);
            // props.formRef.current.resetFields();
            // console.log()
            // console.log("form", form)
            form.resetFields();

            // else {
            //   Modal.error({
            //     title: "Error",
            //     content: responseData?.message
            //   });
            // }

            // if(triggerFetchTableList) {
            //   return triggerFetchTableList(null)
            // }
            triggerGetList(null);
        }).catch((error) => {
            // console.log(error)
            modal.error({
                title: "error",
                content: error.data.message
            })
        })
        // }, [productModalData.isEdit, postProductCreate, putProduct, triggerFetchTableList]);
    }, [productModalData.isEdit, productModalData.productId, postProductCreate, putProduct, setProductModalData, form, triggerGetList]);


    const fixedFloatNumberToFixed3 = (number: number): number => {
        return Number(number.toFixed(3));
    }
    const strToFloatNumberWithFixed3 = (str: string): number => {
        return Number((Number(str) * 0.01).toFixed(3));
    }


    const onFinish = (values: any) => {
        // console.log("onFinish.values", JSON.stringify(values));

        let isNotFinish = false;

        // NOTICE：判斷欄位是否有錯誤訊息　（有錯誤不送表單）
        Object.keys(customAntFormFieldError).map(key => {
            if (key !== 'productInterestRatePairs' && customAntFormFieldError[key]['validateStatus'] !== '') {
                isNotFinish = true;
            }
        })

        if (!values?.productInterestRatePairsChecked) {
            setCustomAntFormFieldError((prev) => ({
                ...prev,
                productInterestRatePairsChecked: {
                    help: '此字段为必填项',
                    validateStatus: 'error',
                }
            }))
            isNotFinish = true;
        }

        if (isNotFinish) return;

        let productInterestRatePairs = values?.productInterestRatePairs || tempFormData.productInterestRatePairs
        productInterestRatePairs = productInterestRatePairs?.reduce((acc, current) => {
            const productInterestRatePairsGroups = current['content'].map((part) => ({
                num: part.num,
                postInterest: Number((Number(part.postInterest) * 0.01).toFixed(3)),
                preInterest: Number((Number(part.preInterest) * 0.01).toFixed(3)),
                plusAmount: Number(part.plusAmount),
                riskRank: part.riskRank
            }))
            return [...acc, ...productInterestRatePairsGroups]
        }, [])

        const riskRankLoanAmount = values?.riskRankLoanAmount?.map(i => ({
            ...i,
            loanAmount: Number(i.loanAmount),
        }))

        let creatProductData: ProductTypes = {
            merchantId: Number(values.merchantId),
            productName: values.productName,
            // NOTICE: 後端移除
            // adminPassword: values.adminPassword,
            logo: values.logo,
            backgroundImg: values.backgroundImg,
            // NOTE: Range 開頭為手機端展示，為了吸引客戶
            amountRange: `${values.amountRangeLow}-${values.amountRangeHigh}`,
            interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}% / day`,
            termRange: `${values.termRangeLow}-${values.termRangeHigh}Days`,

            approveRate: `${String(values.approveRate)}%`,

            approveTime: `${values.approveTime} ${values.approveTimeUnit}`,
            csContact: values.csContact,
            csEmail: values.csEmail,
            csTime: `${values.csTime[0].format('HH:mm')} - ${values.csTime[1].format('HH:mm')}`,
            loanTerm: Number(values.loanTerm),

            newGuestMaxThreshold: Number(values.newGuestMaxThreshold),

            maxAmount: Number(values.maxAmount),
            extensible: values.extensible,
            extensibleOverdueDays: Number(values.extensibleOverdueDays),

            newGuestLoanQuotaSwitch: values.newGuestLoanQuotaSwitch,
            oldGuestLoanQuotaSwitch: values.oldGuestLoanQuotaSwitch,
            riskRankLoanAmount: values.riskRankLoanAmount,
            oldGuestLoanAmount: values.oldGuestLoanAmount,
            renewMaxThreshold: Number(values.renewMaxThreshold),

            preInterestRate: strToFloatNumberWithFixed3(values.preInterestRate),
            postInterestRate: strToFloatNumberWithFixed3(values.postInterestRate),

            renewPreInterestRate: strToFloatNumberWithFixed3(values.renewPreInterestRate),
            renewPostInterestRate: strToFloatNumberWithFixed3(values.renewPostInterestRate),

            newGuestProductDisplayStatus: values.newGuestProductDisplayStatus,
            renewProductDisplayStatus: values.renewProductDisplayStatus,


            dailyRate: strToFloatNumberWithFixed3(values.dailyRate),
            extensionRate: strToFloatNumberWithFixed3(values.extensionRate),
            overdueRate: strToFloatNumberWithFixed3(values.overdueRate),

            productInterestRatePairs: productInterestRatePairs,

            top: values.top,
            tags: values.tags.join(","),
            templateType: values.templateType,
            weight: values.weight === undefined ? 0 : Number(values.weight),
            enabled: values.enabled,
        }
        if (!productModalData.isEdit) {
            // console.log("新增")
            creatProductData = {
                ...creatProductData,
                // adminUsername: values.adminUsername,
            }
        } else {
            // console.log("Edit")
        }
        // console.log(creatProductData)

        handlePostProductCreate(creatProductData);
    };

    const handleCloseModal = (e: any) => {
        e.stopPropagation();
        form.resetFields()
        setProductModalData({
            show: false,
        })
        setCustomAntFormFieldError(initCustomAntFormFieldError)
    }

    // const onAutoFinishedForm = useCallback(() => {
    //   form.setFieldsValue({
    //     // "merchantId": 2,
    //     // "productName": "1",
    //     // "adminUsername": "2",
    //     // "adminPassword": "************",
    //     // "logo": "https://unsplash.com/s/photos/photo",
    //     "amountRangeLow": "4000",
    //     "amountRangeHigh": "5000",
    //     "interestRangeLow": "6",
    //     "interestRangeHigh": "7",
    //     "termRangeLow": "8",
    //     "termRangeHigh": "9",
    //     "approveRate": "10",
    //     "approveTime": "50",
    //     "approveTimeUnit": "mins",
    //     "csEmail": "service@gmail.com",
    //     "csTime": [
    //       moment("2022-09-18T16:00:07.842Z", 'h:mm:ss'),
    //       moment("2022-09-18T23:00:00.281Z", 'h:mm:ss'),
    //     ],
    //     "loanTerm": "13",
    //     "maxAmount": "140000",
    //     "extensible": true,
    //     "extensibleOverdueDays": "15",
    //      "newGuestLoanQuotaSwitch": 0,
    //       "loanAmount": "1000",
    //       "oldGuestLoanQuotaSwitch": 0,
    //       "oldGuestLoanAmount": "2000",
    //     "preInterestRate": "16",
    //     "postInterestRate": "17",
    //     "dailyRate": "18",
    //     "extensionRate": "19",
    //     "overdueRate": "20",
    //     "productInterestRatePairs": [
    //       {
    //         "num": "21",
    //         "preInterest": "22",
    //         "postInterest": "23",
    //           "plusAmount": "123"
    //       }
    //     ],
    //     "top": false,
    //     "tags": [
    //       "小額",
    //       "借貸",
    //       "快速"
    //     ],
    //     "templateType": 1,
    //     "weight": "1",
    //     "enabled": false
    //   })
    // },[]);

    const onFormSubmit = useCallback(() => {
        form.submit();
    }, []);

    return {
        modal,
        productModalData,
        productFormData,
        setProductModalData,
        handleCloseModal,
        onFinish,
        form,
        merchantList,
        customAntFormFieldError,
        setCustomAntFormFieldError,
        setTriggerFetchTableList,
        triggerGetList,
        productListData,
        // onAutoFinishedForm,
        onFormSubmit,
        enableLoanAmount,
        enableReLoanAmount,
        setEnableLoanAmount,
        setEnableReLoanAmount,
        contextHolder,
    }
}
