import {Form, Modal, UploadFile} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {
  useGetAvailableMerchantListQuery,
  useLazyGetProductManageListQuery,
  useLazyGetProductQuery,
  usePostProductCreateMutation,
  usePutProductEditMutation
} from "../api/ProductApi";
import {PostProductCreateRequestBody} from "../api/types/postProductCreate";
import {ValidateStatus} from "antd/es/form/FormItem";
import moment from "moment/moment";


export interface CustomAntFormFieldError {
  [field: string]: {
    validateStatus?: ValidateStatus;
    help: string;
  }
}

export interface ProductFormModal {
  show: boolean;
  isEdit?: boolean
  productId?: number
  triggerTableGetList?: any;
  formRef?: any;
}

export const useProductFormModal = (props: ProductFormModal) => {

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

  const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>({
    preInterestRate: {
      validateStatus: "",
      help: "",
    },
    postInterestRate: {
      validateStatus: "",
      help: "",
    },
  })
  const { currentData: merchantList, isSuccess: isGetMerchantListSuccess } = useGetAvailableMerchantListQuery(null);
  const [postProductCreate, { isLoading }] = usePostProductCreateMutation();
  const [putProduct, {isSuccess: isPutProductSuccess}] = usePutProductEditMutation();

  const [uploadFiles, setUploadFiles] = useState<{
    logoFileList: UploadFile[];
    backgroundImgFileList: UploadFile[];
  }>({
    logoFileList: null,
    backgroundImgFileList: null,
  });

  useEffect(() => {
    if(triggerFetchTableList) {
      // console.log("[debug] 3", triggerFetchTableList)
    }
  }, [triggerFetchTableList]);


  useEffect(() => {
    // console.log("productModalData.show", productModalData.show);
    form.resetFields();

  }, [productModalData.show])

  useEffect(() => {
    if(!productModalData.productId) {
      return;
    }
    triggerGetProduct({
      productId: productModalData.productId,
    })
  }, [productModalData.productId])


  useEffect(() => {
    // console.log("productModalData.productId", productModalData.productId);
    if(!productModalData.productId) {
      setUploadFiles({
        logoFileList: null,
        backgroundImgFileList: null,
      })
    } else {
      setUploadFiles({
        logoFileList: [
          {
            uid: '1',
            name: "",
            url: productFormData?.logo,
          }
        ],
        backgroundImgFileList: [
          {
            uid: '1',
            name: "",
            url: productFormData?.backgroundImg,
          }
        ],
      });
    }
    // console.log("productFormData", productFormData);
    // NOTICE: uploadFiles is old
    // console.log("uploadFiles", uploadFiles);
  }, [productModalData.productId, props.show, productFormData])

  // useEffect(() => {
  //   console.log("isFetching");
  //   form.resetFields();
  // }, [isFetching])

  useEffect(() => {
    // console.log("isFetching");
    form.resetFields();
  }, [props.show])

  useEffect(() => {
    if(isFetching) return;
    // if(!productModalData.productId) return;
    // console.log("productFormData.merchantId", productFormData?.merchantId);
    // console.log("merchantList", merchantList);
    if(!productFormData) return;
    if(!merchantList) return;
    const currentMerchant = merchantList?.find(merchant => merchant.merchantId === productFormData.merchantId);

    if(!productModalData.productId) {
      form.resetFields();
    } else {

      form.setFieldsValue({
        merchantId: currentMerchant?.name,
        productName: productFormData.productName,
        // NOTICE: 後端移除
        // adminUsername: productFormData.adminUsername,
        // NOTICE: 後端不回傳真正密碼
        // NOTICE: 後端移除
        // adminPassword: null,
        logo: productFormData.logo,
        backgroundImg: productFormData.backgroundImg,
        amountRangeLow: productFormData.amountRange.split("-")[0],
        amountRangeHigh: productFormData.amountRange.split("-")[1],
        interestRangeLow: productFormData.interestRange.split(" - ")[0],
        interestRangeHigh: productFormData.interestRange?.split(" - ")[1]?.split("% / day")[0],
        termRangeLow: productFormData.termRange.split("-")[0],
        termRangeHigh: productFormData.termRange.split("-")[1].split("Days")[0],
        approveRate: `${productFormData.approveRate.split("%")[0]}`,
        approveTime: productFormData.approveTime.split(" ")[0],
        approveTimeUnit: productFormData.approveTime.split(" ")[1],
        csEmail: productFormData.csEmail,
        csTime: [
          moment(productFormData.csTime.split(" - ")[0], 'h:mm:ss'),
          moment(productFormData.csTime.split(" - ")[1], 'h:mm:ss'),
        ],
        loanTerm: productFormData.loanTerm,
        maxAmount: productFormData.maxAmount,
        extensible: productFormData.extensible,
        extensibleOverdueDays: productFormData.extensibleOverdueDays,
        preInterestRate: `${fixedFloatNumberToFixed2(Number(productFormData.preInterestRate) * 100)}`,
        postInterestRate: `${fixedFloatNumberToFixed2(Number(productFormData.postInterestRate) * 100)}`,
        dailyRate: `${fixedFloatNumberToFixed2(Number(productFormData.dailyRate) * 100)}`,
        extensionRate: `${fixedFloatNumberToFixed2(Number(productFormData.extensionRate) * 100)}`,
        productInterestRatePairs: productFormData.productInterestRatePairs.map((ratePair) => {
          return {
            num: ratePair.num,
            preInterest: fixedFloatNumberToFixed2(ratePair.preInterest * 100),
            postInterest: fixedFloatNumberToFixed2(ratePair.postInterest * 100),
          }
        }),
        overdueRate: `${fixedFloatNumberToFixed2(Number(productFormData.overdueRate) * 100)}`,
        top: productFormData.top,
        tags: productFormData.tags.split(","),
        templateType: productFormData.templateType,
        weight: productFormData.weight,
        enabled: productFormData.enabled,
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
    if(productModalData.isEdit) {
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
      // console.log("error", error);
      Modal.error(error.error);
    })
  // }, [productModalData.isEdit, postProductCreate, putProduct, triggerFetchTableList]);
  }, [productModalData.isEdit, productModalData.productId, postProductCreate, putProduct, setProductModalData, form, triggerGetList]);


  const fixedFloatNumberToFixed2 = (number: number): number => {
    return Number(number.toFixed(2));
  }
  const strToFloatNumberWithFixed2 = (str: string): number => {
    return Number((Number(str) * 0.01).toFixed(2));
  }
  const onFinish = (values: any) => {
    // console.log("onFinish.values", JSON.stringify(values));

    const productInterestRatePairs = values?.productInterestRatePairs?.map(i => ({
      num: i.num,
      postInterest: strToFloatNumberWithFixed2(i.postInterest),
      preInterest: strToFloatNumberWithFixed2(i.preInterest) }
    ))

    let creatProductData: PostProductCreateRequestBody = {
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
      csEmail: values.csEmail,
      csTime: `${values.csTime[0].format('HH:mm:ss')} - ${values.csTime[1].format('HH:mm:ss')}`,
      loanTerm: Number(values.loanTerm),
      maxAmount: Number(values.maxAmount),
      extensible: values.extensible,
      extensibleOverdueDays: Number(values.extensibleOverdueDays),

      preInterestRate: strToFloatNumberWithFixed2(values.preInterestRate),
      postInterestRate: strToFloatNumberWithFixed2(values.postInterestRate),
      dailyRate: strToFloatNumberWithFixed2(values.dailyRate),
      extensionRate: strToFloatNumberWithFixed2(values.extensionRate),
      overdueRate: strToFloatNumberWithFixed2(values.overdueRate),
      productInterestRatePairs: productInterestRatePairs,

      top: values.top,
      tags: values.tags.join(","),
      templateType: values.templateType,
      weight: Number(values.weight),
      enabled: values.enabled,
    }
    if(!productModalData.isEdit) {
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

  const handleCloseModal = () => {
    form.resetFields()
    setProductModalData({
      show: false,
    })
  }


  const onAutoFinishedForm = useCallback(() => {
    form.setFieldsValue({
      // "merchantId": 2,
      // "productName": "1",
      // "adminUsername": "2",
      // "adminPassword": "************",
      // "logo": "https://unsplash.com/s/photos/photo",
      "amountRangeLow": "4000",
      "amountRangeHigh": "5000",
      "interestRangeLow": "6",
      "interestRangeHigh": "7",
      "termRangeLow": "8",
      "termRangeHigh": "9",
      "approveRate": "10",
      "approveTime": "50",
      "approveTimeUnit": "mins",
      "csEmail": "service@gmail.com",
      "csTime": [
        moment("2022-09-18T16:00:07.842Z", 'h:mm:ss'),
        moment("2022-09-18T23:00:00.281Z", 'h:mm:ss'),
      ],
      "loanTerm": "13",
      "maxAmount": "140000",
      "extensible": true,
      "extensibleOverdueDays": "15",
      "preInterestRate": "16",
      "postInterestRate": "17",
      "dailyRate": "18",
      "extensionRate": "19",
      "overdueRate": "20",
      "productInterestRatePairs": [
        {
          "num": "21",
          "preInterest": "22",
          "postInterest": "23"
        }
      ],
      "top": false,
      "tags": [
        "小額",
        "借貸",
        "快速"
      ],
      "templateType": 1,
      "weight": "1",
      "enabled": false
    })
  },[]);

  const onFormSubmit = useCallback(() => {
    form.submit();
  }, []);

  return {
    productModalData,
    productFormData,
    setProductModalData,
    handleCloseModal,
    onFinish,
    form,
    merchantList,
    uploadFiles,
    customAntFormFieldError,
    setCustomAntFormFieldError,
    setTriggerFetchTableList,
    triggerGetList,
    productListData,
    onAutoFinishedForm,
    onFormSubmit,
  }
}
