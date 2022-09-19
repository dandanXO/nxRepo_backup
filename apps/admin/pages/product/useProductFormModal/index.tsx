import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import {UploadSettingSection} from "./UploadSettingSection";
import {Form, message, Modal, Upload, UploadProps} from "antd";
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


// const uploadLogoProps: UploadProps = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   beforeUpload: file => {
//     const isPNG = file.type === 'image/png';
//     if (!isPNG) {
//       message.error(`${file.name} is not a png file`);
//     }
//     return isPNG || Upload.LIST_IGNORE;
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

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

  // useEffect(() => {
  //   setProductModalData({
  //     show: props.show,
  //     isEdit: props.isEdit,
  //     productId: props.productId,
  //   })
  // }, [props.show, props.isEdit, props.productId])

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  const [triggerGetList, { currentData: productFormData, isLoading: isGetProductLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetProductQuery({

  })
  const { currentData: merchantList, isSuccess: isGetMerchantListSuccess } = useGetAvailableMerchantListQuery(null);
  const [postProductCreate, { isLoading }] = usePostProductCreateMutation();

  useEffect(() => {
    if(!productModalData.productId) return;
    triggerGetList({
      productId: productModalData.productId,
    })
  }, [productModalData.productId])

  useEffect(() => {
    if(!productModalData.productId) return;
    // form.setFieldsValue({
    //   ...productFormData
    // });
    console.log("productFormData.merchantId", productFormData.merchantId);
    console.log("merchantList", merchantList);
    const currentMerchant = merchantList.find(merchant => merchant.merchantId === productFormData.merchantId);

    form.setFieldsValue({
      merchantId: currentMerchant?.name,
      productName: productFormData.productName,
      adminUsername: productFormData.adminUsername,
      adminPassword: "****************",
      // logo: productFormData.logo,
      // backgroundImg: productFormData.backgroundImg,
      amountRangeLow: productFormData.amountRange.split("-")[0],
      amountRangeHigh: productFormData.amountRange.split("-")[1],
      interestRangeLow: productFormData.interestRange.split("~")[0],
      interestRangeHigh: productFormData.interestRange.split("~")[1],
      termRangeLow: productFormData.termRange.split("-")[0],
      termRangeHigh: productFormData.termRange.split("-")[1],
      approveRate: productFormData.approveRate,
      approveTime: productFormData.approveTime,
      // approveTimeUnit: productFormData.backgroundImg,
      csEmail: productFormData.csEmail,
      // csTime: productFormData.csTime,
      loanTerm: productFormData.loanTerm,
      maxAmount: productFormData.maxAmount,
      // FIXME: 後端回來值 True 顯示異常
      extensible: productFormData.extensible,
      extensibleOverdueDays: productFormData.extensibleOverdueDays,
      preInterestRate: productFormData.preInterestRate,
      postInterestRate: productFormData.postInterestRate,
      dailyRate: productFormData.dailyRate,
      extensionRate: productFormData.extensionRate,
      overdueRate: productFormData.overdueRate,
      // FIXME: 後端回來值 True 顯示異常
      top: productFormData.top,
      tags: productFormData.tags.split(","),
      templateType: productFormData.templateType,
      weight: productFormData.weight,
      // FIXME: 後端回來值 True 顯示異常
      enabled: productFormData.enabled,
    })
    console.log("productFormData", productFormData);
  }, [isSuccess, isError, merchantList])

  const handlePostProductCreate = useCallback((values) => {
    postProductCreate(values);
  }, []);

  const onFinish = (values: any) => {
    const productInterestRatePairs = values.productInterestRatePairs.map(i => ({ num: Number(i.num), postInterest: Number(i.postInterest), preInterest: Number(i.preInterest) }))
    console.log(values)
    const creatProductData: PostProductCreateRequestBody = {
      merchantId: Number(values.merchantId),
      productName: values.productName,
      adminUsername: values.adminUsername,
      adminPassword: values.adminPassword,
      // logo: values.logo,
      // backgroundImg: values.backgroundImg,
      logo:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
      backgroundImg:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
      amountRange: `₹ ${values.amountRangeLow} - ₹ ${values.amountRangeHigh}`,
      interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}% / day`,
      termRange: `${values.termRangeLow}-${values.termRangeHigh} days`,
      approveRate: values.approveRate,
      approveTime: `${values.approveTime} ${values.approveTimeUnit}`,
      csEmail: values.csEmail,
      csTime: `${values.csTime[0].format('HH:mm:ss')} ${values.csTime[1].format('HH:mm:ss')}`,
      loanTerm: Number(values.loanTerm),
      maxAmount: Number(values.maxAmount),
      extensible: values.extensible,
      extensibleOverdueDays: Number(values.extensibleOverdueDays),
      preInterestRate: Number(values.preInterestRate),
      postInterestRate: Number(values.postInterestRate),
      dailyRate: Number(values.dailyRate),
      extensionRate: Number(values.extensionRate),
      overdueRate: Number(values.overdueRate),
      productInterestRatePairs: productInterestRatePairs,
      top: values.top,
      tags: values.tags,
      templateType: values.templateType,
      weight: Number(values.weight),
      enabled: values.enabled,
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
  const ProductFormModal = useMemo(() => {
    const ModalWrapper = () => {
      return (
        <ErrorBoundary errorComponent={<div>Something went wrong.</div>}>
          <Modal
            title={!productModalData.isEdit ? "添加产品" : "編輯產品"}
            open={productModalData.show}
            onCancel={handleCloseModal}
            onOk={form.submit}
            width={'800px'}
            maskClosable={false}
          >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{
              // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`
              approveTimeUnit: "mins",
              extensible: false,
              top: false,
              enabled: true,
              templateType: 1,
            }}>
              <BaseSettingSection merchantList={merchantList}/>
              <ProductSettingSection/>
              <LoanSettingSection/>
              <RateSettingSection/>
              <UploadSettingSection/>
            </Form>
          </Modal>
        </ErrorBoundary>
      )
    }
    return ModalWrapper
  }, [productModalData.show, productModalData.isEdit, productModalData.productId])

  return { ProductFormModal, productModalData, setProductModalData }



  // return {productModalVisible, setProductModalVisible}
}
