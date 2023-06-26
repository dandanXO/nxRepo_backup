import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Form, FormInstance, Modal, UploadFile } from 'antd';
import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';

import { validatePreOrPostInterestGroups } from '../../../../../shared/components/other/validatePreOrPostInterestGroups';
import { CustomAntFormFieldError } from '../../../../../shared/utils/validation/CustomAntFormFieldError';
import {
    GetProductListResponse,
    Product,
    useGetAvailableMerchantListQuery,
    useGetProductRiskDropdownQuery,
    useLazyGetProductManageListQuery,
    useLazyGetProductQuery,
    usePostProductCreateMutation,
    usePutProductEditMutation,
} from '../../../../service/product/ProductApi';
import {
    BaseRiskRank,
    ProductInterestRate,
    ProductInterestRatesContent,
    productInterestRatesContentKey,
} from '../../../../service/product/domain/productInterestRatePair';
import { ProductTypes } from '../../../../service/product/domain/productTypes';
import { GetAvailableMerchantResponse } from '../../../../service/product/response/getAvailableMerchantResponse';

export interface ProductFormModal {
    show: boolean;
    isEdit?: boolean;
    productId?: number;
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

export const productInterestRatesConvertToBackendMap: { [key in number]: { label: string; key: BaseRiskRank } } = {
    0: {
        label: '极好',
        key: 'EXCELLENT',
    },
    1: {
        label: '良好',
        key: 'GOOD',
    },
    2: {
        label: '正常',
        key: 'NORMAL',
    },
    3: {
        label: '普通',
        key: 'ORDINARY',
    },
};

const productInterestRatesConvertToFrontendMap: { [key in BaseRiskRank]?: { label: string; sort: number } } =
    Object.keys(productInterestRatesConvertToBackendMap).reduce(
        (acc, current) => ({
            ...acc,
            [productInterestRatesConvertToBackendMap[current].key]: {
                label: productInterestRatesConvertToBackendMap[current].label,
                sort: Number(current),
            },
        }),
        {},
    );
/*
    productInterestRatesConvertToFrontendMap like {
        EXCELLENT : {
            label : 极好,
            sort : 0
        }
    }
 */

export const useProductFormModal = (
    props: ProductFormModal,
): {
    modal: Omit<ModalStaticFunctions, 'warn'>;
    productModalData: ProductFormModal;
    productFormData: Product;
    setProductModalData: React.Dispatch<ProductFormModal>;
    handleCloseModal: (e: any) => void;
    onFinish: (value: any) => void;
    form: FormInstance;
    merchantList: GetAvailableMerchantResponse[];
    productRiskList: string[];
    customAntFormFieldError: CustomAntFormFieldError;
    setCustomAntFormFieldError: React.Dispatch<CustomAntFormFieldError>;
    triggerGetList: LazyQueryTrigger<any>;
    productListData: GetProductListResponse;
    isPostProductCreateSuccess: boolean;
    isPutProductSuccess: boolean;
    onFormSubmit: () => void;
    contextHolder: React.ReactElement;
} => {
    const [modal, contextHolder] = Modal.useModal();

    const [productModalData, setProductModalData] = useState<ProductFormModal>({
        show: props.show,
        isEdit: props.isEdit,
        productId: props.productId,
        triggerTableGetList: props.triggerTableGetList,
    });
    // console.log("productModalData", productModalData);

    // NOTICE: form
    const [form] = Form.useForm();

    const [triggerGetProduct, { currentData: productFormData, isFetching }] = useLazyGetProductQuery({});

    const initCustomAntFormFieldError = {
        preInterestRate: { validateStatus: '', help: '' },
        postInterestRate: { validateStatus: '', help: '' },
        renewPostInterestRate: { validateStatus: '', help: '' },
        renewPreInterestRate: { validateStatus: '', help: '' },
        productInterestRatePairsChecked: { validateStatus: '', help: '' },
        productInterestRatePairs: {},
    };

    const [customAntFormFieldError, setCustomAntFormFieldError] =
        useState<CustomAntFormFieldError>(initCustomAntFormFieldError);
    const { currentData: merchantList } = useGetAvailableMerchantListQuery(null);
    const { currentData: productRiskList } = useGetProductRiskDropdownQuery(null);
    const [postProductCreate, { isSuccess: isPostProductCreateSuccess }] = usePostProductCreateMutation();
    const [putProduct, { isSuccess: isPutProductSuccess }] = usePutProductEditMutation();

    useEffect(() => {
        if (!productModalData.productId) {
            return;
        }
        triggerGetProduct({
            productId: productModalData.productId,
        });
    }, [productModalData.productId]);

    useEffect(() => {
        if (isFetching) return;
        // if(!productModalData.productId) return;
        // console.log("productFormData.merchantId", productFormData?.merchantId);
        // console.log("merchantList", merchantList);
        if (!productFormData) return;
        if (!merchantList) return;

        const currentMerchant = merchantList?.find((merchant) => merchant.merchantId === productFormData.merchantId);

        if (!productModalData.productId) {
            form.resetFields();
            setCustomAntFormFieldError(initCustomAntFormFieldError);
        } else {
            const productInterestRatePairs: ProductInterestRate[] = productFormData.productInterestRatePairs.reduce(
                (acc, current) => {
                    if (current.riskRank === 'REJECT') return acc;
                    const groupIndex = productInterestRatesConvertToFrontendMap[current.riskRank].sort;
                    let interestRates: ProductInterestRatesContent[] = current[productInterestRatesContentKey].reduce(
                        (interestRatesAcc, interestRatesCurrent) => [
                            ...interestRatesAcc,
                            {
                                ...interestRatesCurrent,
                                preInterest: fixedFloatNumberToFixed3(Number(interestRatesCurrent.preInterest) * 100),
                                postInterest: fixedFloatNumberToFixed3(Number(interestRatesCurrent.postInterest) * 100),
                            },
                        ],
                        [],
                    );

                    if (interestRates.length === 0) {
                        interestRates = [{ num: '', preInterest: '', postInterest: '', plusAmount: '' }];
                    }

                    acc[groupIndex] = {
                        [productInterestRatesContentKey]: interestRates,
                    };
                    return acc;
                },
                [],
            );

            const { hasError } = validatePreOrPostInterestGroups(
                productInterestRatePairs,
                true,
                productInterestRatesContentKey,
            );

            // NOTICE 後端回應初貸混合風控與複貸混合風控是包在prodRiskProvider的list之中，結構為
            // [object, ...]， object的結構為
            // { enable: true, isOldUser: ture, provider: "BATEI"}，
            // enable：是否啟用，都帶ture，isOldUser：true為複貸false為初貸，provider：風控商名稱
            // 需轉為Filed name為newGuestLoanMixedRisk與oldGuestLoanMixedRisk的tags mode Select 的Field value 中，
            const { newGuestLoanMixedRisk, oldGuestLoanMixedRisk } = productFormData.prodRiskProvider?.reduce(
                (acc, current) => {
                    if (current.isOldUser === false) {
                        // 初貸
                        acc['newGuestLoanMixedRisk'] = acc['newGuestLoanMixedRisk'].concat(current.provider);
                    } else if (current.isOldUser === true) {
                        // 複貸
                        acc['oldGuestLoanMixedRisk'] = acc['oldGuestLoanMixedRisk'].concat(current.provider);
                    }

                    return acc;
                },
                { newGuestLoanMixedRisk: [], oldGuestLoanMixedRisk: [] },
            ) || { newGuestLoanMixedRisk: [], oldGuestLoanMixedRisk: [] };

            form.setFieldsValue({
                merchantId: currentMerchant?.name,
                productName: productFormData.productName,
                // NOTICE: 後端移除
                // adminUsername: productFormData.adminUsername,
                // NOTICE: 後端不回傳真正密碼
                // NOTICE: 後端移除
                // adminPassword: null,
                logo: productFormData.logo,
                logoUpload: [
                    {
                        uid: '1',
                        name:
                            productFormData.logo &&
                            productFormData.logo.split('/') &&
                            productFormData.logo.split('/')[productFormData.logo.length - 1],
                        url: productFormData.logo,
                    },
                ],
                backgroundImg: productFormData.backgroundImg,
                backgroundImgUpload: [
                    {
                        uid: '1',
                        name:
                            productFormData.backgroundImg &&
                            productFormData.backgroundImg.split('/') &&
                            productFormData.backgroundImg.split('/')[productFormData.backgroundImg.length - 1],
                        url: productFormData.backgroundImg,
                    },
                ],

                amountRangeLow: productFormData.amountRange.split('-')[0],
                amountRangeHigh: productFormData.amountRange.split('-')[1],
                interestRangeLow: productFormData.interestRange.split(' - ')[0],
                interestRangeHigh: productFormData.interestRange?.split(' - ')[1]?.split('% / day')[0],
                termRangeLow: productFormData.termRange.split('-')[0],
                termRangeHigh: productFormData.termRange.split('-')[1].split('Days')[0],
                approveRate: `${productFormData.approveRate.split('%')[0]}`,
                approveTime: productFormData.approveTime.split(' ')[0],
                approveTimeUnit: productFormData.approveTime.split(' ')[1],
                csContact: productFormData.csContact,
                csEmail: productFormData.csEmail,
                csTime: [
                    moment(productFormData.csTime.split(' - ')[0], 'h:mm'),
                    moment(productFormData.csTime.split(' - ')[1], 'h:mm'),
                ],
                loanTerm: productFormData.loanTerm,

                maxAmount: productFormData.maxAmount,
                extensible: productFormData.extensible,
                extensibleOverdueDays: productFormData.extensibleOverdueDays,

                oldGuestLoanAmount: productFormData.oldGuestLoanAmount,

                riskRankLoanAmount: productFormData.riskRankLoanAmount,

                newGuestMaxThreshold: productFormData.newGuestMaxThreshold,
                renewMaxThreshold: productFormData.renewMaxThreshold,

                preInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.preInterestRate) * 100)}`,
                postInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.postInterestRate) * 100)}`,

                renewPreInterestRate: `${fixedFloatNumberToFixed3(Number(productFormData.renewPreInterestRate) * 100)}`,
                renewPostInterestRate: `${fixedFloatNumberToFixed3(
                    Number(productFormData.renewPostInterestRate) * 100,
                )}`,

                newGuestProductDisplayStatus: productFormData.newGuestProductDisplayStatus,
                renewProductDisplayStatus: productFormData.renewProductDisplayStatus,

                dailyRate: `${fixedFloatNumberToFixed3(Number(productFormData.dailyRate) * 100)}`,
                dummy: productFormData.dummy,
                extensionRate: `${fixedFloatNumberToFixed3(Number(productFormData.extensionRate) * 100)}`,
                overdueRate: `${fixedFloatNumberToFixed3(Number(productFormData.overdueRate) * 100)}`,
                productInterestRatePairsChecked: !hasError,
                top: productFormData.top,
                tags: productFormData.tags.split(','),
                templateType: productFormData.templateType,
                weight: productFormData.weight,
                enabled: productFormData.enabled,
                productInterestRatePairs,
                newGuestLoanMixedRisk,
                oldGuestLoanMixedRisk,
            });
        }

        // console.log("productFormData", productFormData);
    }, [isFetching]);

    const [triggerGetList, { currentData: productListData }] = useLazyGetProductManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const handlePostProductCreate = useCallback(
        (values) => {
            const action = !productModalData.isEdit ? postProductCreate : putProduct;
            if (productModalData.isEdit) {
                values = {
                    ...values,
                    productId: productModalData.productId,
                };
            }
            action(values)
                .unwrap()
                .then(() => {
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
                })
                .catch((error) => {
                    // console.log(error)
                    modal.error({
                        title: 'error',
                        content: error.data.message,
                    });
                });
            // }, [productModalData.isEdit, postProductCreate, putProduct, triggerFetchTableList]);
        },
        [
            productModalData.isEdit,
            productModalData.productId,
            postProductCreate,
            putProduct,
            setProductModalData,
            form,
            triggerGetList,
        ],
    );

    const fixedFloatNumberToFixed3 = (number: number): number => {
        return Number(number.toFixed(3));
    };
    const strToFloatNumberWithFixed3 = (str: string): number => {
        return Number((Number(str) * 0.01).toFixed(3));
    };

    const onFinish = (values: any) => {
        // console.log("onFinish.values", JSON.stringify(values));

        let isNotFinish = false;

        // NOTICE：判斷欄位是否有錯誤訊息（有錯誤不送表單）
        Object.keys(customAntFormFieldError).map((key) => {
            if (key !== 'productInterestRatePairs' && customAntFormFieldError[key]['validateStatus'] !== '') {
                isNotFinish = true;
            }
        });

        if (!values?.productInterestRatePairsChecked) {
            setCustomAntFormFieldError((prev) => ({
                ...prev,
                productInterestRatePairsChecked: {
                    help: '此字段为必填项',
                    validateStatus: 'error',
                },
            }));
            isNotFinish = true;
        }

        if (isNotFinish) return;

        const productInterestRatePairs = form
            .getFieldValue('productInterestRatePairs')
            .reduce((acc, current, index) => {
                const interestRates = current[productInterestRatesContentKey].reduce(
                    (interestRatesAcc, interestRatesCurrent) => [
                        ...interestRatesAcc,
                        {
                            ...interestRatesCurrent,
                            postInterest: Number((Number(interestRatesCurrent.postInterest) * 0.01).toFixed(3)),
                            preInterest: Number((Number(interestRatesCurrent.preInterest) * 0.01).toFixed(3)),
                            plusAmount: Number(interestRatesCurrent.plusAmount),
                        },
                    ],
                    [],
                );

                return [
                    ...acc,
                    {
                        riskRank: productInterestRatesConvertToBackendMap[index].key,
                        [productInterestRatesContentKey]: interestRates,
                    },
                ];
            }, []);

        // NOTICE 需將newGuestLoanMixedRisk與oldGuestLoanMixedRisk的資料轉為後端prodRiskProvider的格式
        const newGuestLoanMixedRisks = values.newGuestLoanMixedRisk.reduce(
            (acc, current) => [...acc, { isOldUser: false, provider: current }],
            [],
        );

        const oldGuestLoanMixedRisk = values.oldGuestLoanMixedRisk.reduce(
            (acc, current) => [...acc, { isOldUser: true, provider: current }],
            [],
        );

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

            prodRiskProvider: newGuestLoanMixedRisks.concat(oldGuestLoanMixedRisk),

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
            tags: values.tags.join(','),
            templateType: values.templateType,
            weight: values.weight === undefined ? 0 : Number(values.weight),
            enabled: values.enabled,
        };
        if (!productModalData.isEdit) {
            // console.log("新增")
            creatProductData = {
                ...creatProductData,
                // adminUsername: values.adminUsername,
            };
        } else {
            // console.log("Edit")
        }
        // console.log(creatProductData)

        handlePostProductCreate(creatProductData);
    };

    const handleCloseModal = (e: any) => {
        e.stopPropagation();
        form.resetFields();
        setProductModalData({
            show: false,
        });
        setCustomAntFormFieldError(initCustomAntFormFieldError);
    };

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
        productRiskList,
        customAntFormFieldError,
        setCustomAntFormFieldError,
        triggerGetList,
        productListData,
        isPostProductCreateSuccess,
        isPutProductSuccess,
        // onAutoFinishedForm,
        onFormSubmit,
        contextHolder,
    };
};
