import BaseSettingSection from "./components/BaseSettingSection";
import ProductSettingSection from "./components/ProductSettingSection";
import LoanSettingSection from "./components/LoanSettingSection";
import RateSettingSection from "./components/RateSettingSection";
import {UploadSettingSection} from "./components/UploadSettingSection";
import {Button, Form, message, Modal, Upload, UploadFile, UploadProps} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  useGetAvailableMerchantListQuery,
  useGetProductManageListQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
  usePostProductCreateMutation
} from "../../../api";
import {PostProductCreateRequestBody} from "../../../types/postProductCreate";
import {ErrorBoundary} from "../../../components/ErrorBoundary";
import {GetAvailableMerchantResponse} from "../../../types/getAvailbaleMerchant";
import {GetProductListResponseProduct} from "../../../types/getProductList";
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
}

export const useProductFormModal = (props: ProductFormModal) => {

  const [productModalData, setProductModalData] = useState<ProductFormModal>({
    show: props.show,
    isEdit: props.isEdit,
    productId: props.productId,
  });
  console.log("productModalData", productModalData);

  const [form] = Form.useForm();
  const [triggerGetList, { currentData: productFormData, isLoading: isGetProductLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetProductQuery({

  })
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

  useEffect(() => {
    if(!productModalData.productId) return;
    triggerGetList({
      productId: productModalData.productId,
    })
  }, [productModalData.productId])

  const [uploadFiles, setUploadFiles] = useState<{
    logoFileList: UploadFile[];
    backgroundImgFileList: UploadFile[];
  }>({
    logoFileList: null,
    backgroundImgFileList: null,
  });

  useEffect(() => {
    // console.log("isSuccess, isLoading, isFetching", isSuccess, isLoading, isFetching)
    // FIXME: 清除編輯得到的照片
    console.log("productModalData.productId", productModalData.productId);
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
    console.log("productFormData", productFormData);
    // NOTICE: uploadFiles is old
    console.log("uploadFiles", uploadFiles);
  }, [productModalData.productId, props.show, productFormData])

  useEffect(() => {

    // if(!productModalData.productId) return;

    console.log("productFormData.merchantId", productFormData?.merchantId);
    console.log("merchantList", merchantList);
    if(!productFormData) return;
    if(!merchantList) return;
    const currentMerchant = merchantList?.find(merchant => merchant.merchantId === productFormData.merchantId);

    if(!productModalData.productId) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        merchantId: currentMerchant?.name,
        productName: productFormData.productName,
        adminUsername: productFormData.adminUsername,
        // NOTICE: 後端不回傳真正密碼
        adminPassword: null,
        logo: productFormData.logo,
        backgroundImg: productFormData.backgroundImg,
        amountRangeLow: productFormData.amountRange.split("-")[0],
        amountRangeHigh: productFormData.amountRange.split("-")[1],
        interestRangeLow: productFormData.interestRange.split(" - ")[0],
        interestRangeHigh: productFormData.interestRange?.split(" - ")[1]?.split("% / day")[0],
        termRangeLow: productFormData.termRange.split("-")[0],
        termRangeHigh: productFormData.termRange.split("-")[1].split(" days")[0],
        approveRate: `${Number(productFormData.approveRate) * 100}`,
        approveTime: productFormData.approveTime.split(" ")[0],
        approveTimeUnit: productFormData.approveTime.split(" ")[1],
        csEmail: productFormData.csEmail,
        csTime: [
          moment(productFormData.csTime.split(" ")[0], 'h:mm:ss'),
          moment(productFormData.csTime.split(" ")[1], 'h:mm:ss'),
        ],
        loanTerm: productFormData.loanTerm,
        maxAmount: productFormData.maxAmount,
        // FIXME: 後端回來值 True 顯示異常
        extensible: productFormData.extensible,
        extensibleOverdueDays: productFormData.extensibleOverdueDays,
        preInterestRate: `${Number(productFormData.preInterestRate) * 100}`,
        postInterestRate: `${Number(productFormData.postInterestRate) * 100}`,
        dailyRate: `${Number(productFormData.dailyRate) * 100}`,
        extensionRate: `${Number(productFormData.extensionRate) * 100}`,
        overdueRate: `${Number(productFormData.overdueRate) * 100}`,
        // FIXME: 後端回來值 True 顯示異常
        top: productFormData.top,
        tags: productFormData.tags.split(","),
        templateType: productFormData.templateType,
        weight: productFormData.weight,
        // FIXME: 後端回來值 True 顯示異常
        enabled: productFormData.enabled,
      })
    }

    console.log("productFormData", productFormData);
  }, [props.show, merchantList, productModalData.productId, isSuccess, isError, merchantList, productFormData?.logo, productFormData?.backgroundImg])

  const handlePostProductCreate = useCallback((values) => {
    postProductCreate(values).unwrap().then((responseData: {code?: number; message?: string})  => {
      // console.log("responseData", responseData);
      // console.log(responseData?.message)
      // console.log(responseData?.code)
      if(responseData?.code === 200) {
        setProductModalData({
          show: false,
        });
      } else {
        Modal.error({
          title: "Error",
          content: responseData?.message
        });
      }
    }).catch((error) => {
      Modal.error(error.error);
    })
  }, []);


  const strToFloatNumberWithFixed2 = (str: string): number => {
    return Number((Number(str) * 0.01).toFixed(2));
  }
  const onFinish = (values: any) => {
    console.log("onFinish.values", JSON.stringify(values));

    const productInterestRatePairs = values?.productInterestRatePairs?.map(i => ({ num: strToFloatNumberWithFixed2(i.num), postInterest: strToFloatNumberWithFixed2(i.postInterest), preInterest: strToFloatNumberWithFixed2(i.preInterest) }))
    let creatProductData: PostProductCreateRequestBody = {
      merchantId: Number(values.merchantId),
      productName: values.productName,

      adminPassword: values.adminPassword,
      logo: values.logo,
      backgroundImg: values.backgroundImg,
      // NOTE: Range 開頭為手機端展示，為了吸引客戶
      amountRange: `${values.amountRangeLow}-${values.amountRangeHigh}`,
      interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}% / day`,
      termRange: `${values.termRangeLow}-${values.termRangeHigh} days`,

      approveRate: String(strToFloatNumberWithFixed2(values.approveRate)),

      approveTime: `${values.approveTime} ${values.approveTimeUnit}`,
      csEmail: values.csEmail,
      csTime: `${values.csTime[0].format('HH:mm:ss')} ${values.csTime[1].format('HH:mm:ss')}`,
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
    if(!props.isEdit) {
      creatProductData = {
        ...creatProductData,
        adminUsername: values.adminUsername,
      }
    }
    console.log(creatProductData)
    handlePostProductCreate(creatProductData);
  };

  const handleCloseModal = () => {
    setProductModalData({
      show: false,
    })
    form.resetFields()
  }

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
  }
}

interface ProductModalProps {
  productModalData: ProductFormModal;
  handleCloseModal: () => void;
  onFinish: (value: any) => void;
  form: any;
  merchantList: GetAvailableMerchantResponse;
  uploadFiles: any;
  onMockFinish: () => void;
  customAntFormFieldError: CustomAntFormFieldError;
  setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
}

const ProductModal = (props: ProductModalProps) =>
{
  const { productModalData, handleCloseModal, onFinish, form, merchantList,uploadFiles, onMockFinish, customAntFormFieldError, setCustomAntFormFieldError } = props;
  console.log("debug.setCustomAntFormFieldError", setCustomAntFormFieldError);
  console.log("[ModalWrapper] render")
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

  return (
    <ErrorBoundary errorComponent={<div>Something went wrong.</div>}>
      <Modal
        title={!productModalData.isEdit ? <span><span style={{ marginRight: 8 }}>添加产品</span> <Button onClick={() => onMockFinish()}>自動填入測試資料</Button></span> : "编辑产品"}
        open={productModalData.show}
        onCancel={handleCloseModal}
        onOk={form.submit}
        width={'800px'}
        maskClosable={false}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
              onFieldsChange={(changedFields, allFields) =>{
                // console.log("changedFields", changedFields)
                // console.log("allFields", allFields)
                const preInterestRate = allFields.filter(field => field.name.toString() === "preInterestRate")[0]?.value ?? undefined;
                const postInterestRate = allFields.filter(field => field.name.toString() === "postInterestRate")[0]?.value ?? undefined;
                let isValidate = true;
                if(Number(preInterestRate)> 100 || Number(preInterestRate) < 0) {
                  setCustomAntFormFieldError({
                    ...customAntFormFieldError,
                    preInterestRate: {
                      validateStatus: "error",
                      help: "请填写1-100间数字",
                    },
                  })
                  isValidate = false;
                } else if(Number(preInterestRate) >= 0 && Number(preInterestRate)<= 100){
                  setCustomAntFormFieldError({
                    ...customAntFormFieldError,
                    preInterestRate: {
                      validateStatus: "",
                      help: "",
                    },
                  })
                }
                if(Number(postInterestRate)> 100 || Number(postInterestRate) < 0) {
                  setCustomAntFormFieldError({
                    ...customAntFormFieldError,
                    postInterestRate: {
                      validateStatus: "error",
                      help: "请填写1-100间数字",
                    },
                  })
                  isValidate = false;
                } else if(Number(postInterestRate) >= 0 && Number(postInterestRate)<= 100){
                  setCustomAntFormFieldError({
                    ...customAntFormFieldError,
                    postInterestRate: {
                      validateStatus: "",
                      help: "",
                    },
                  })
                }
                if(isValidate) {
                  if(Number(preInterestRate) + Number(postInterestRate) > 100) {
                    setCustomAntFormFieldError({
                      ...customAntFormFieldError,
                      preInterestRate: {
                        validateStatus: "error",
                        help: "前置利息＋后置利息不得超过100%",
                      },
                      postInterestRate: {
                        validateStatus: "error",
                        help: "前置利息＋后置利息不得超过100%",
                      }
                    })
                  } else {
                    setCustomAntFormFieldError({
                      ...customAntFormFieldError,
                      preInterestRate: {
                        validateStatus:"",
                        help: "",
                      },
                      postInterestRate: {
                        validateStatus:"",
                        help: "",
                      }
                    })
                  }
                }
              }}
              initialValues={{
                // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`

                approveTimeUnit: "mins",
                extensible: false,
                top: false,
                enabled: true,
                templateType: 1,
              }}
        >
          <BaseSettingSection merchantList={merchantList} isEdit={productModalData.isEdit}/>
          <ProductSettingSection setLogo={setLogo} setBackgroundImg={setBackgroundImg}/>
          <LoanSettingSection/>
          <RateSettingSection form={form} customAntFormFieldError={customAntFormFieldError}/>
          <UploadSettingSection/>
        </Form>
      </Modal>
    </ErrorBoundary>
  )
}
export { ProductModal }
