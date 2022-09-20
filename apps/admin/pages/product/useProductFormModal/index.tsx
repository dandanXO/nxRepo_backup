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
        interestRangeLow: productFormData.interestRange.split("~")[0],
        interestRangeHigh: productFormData.interestRange.split("~")[1],
        termRangeLow: productFormData.termRange.split("-")[0],
        termRangeHigh: productFormData.termRange.split("-")[1],
        approveRate: productFormData.approveRate,
        approveTime: productFormData.approveTime,
        // approveTimeUnit: productFormData.backgroundImg,
        csEmail: productFormData.csEmail,
        // csTime: `${productFormData.csTime.split(" ")[0]}-${productFormData.csTime.split(" ")[1]}`,
        // csTime: `${productFormData.csTime.split("~")[0]}-${productFormData.csTime.split("~")[1]}`,
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
    }

    console.log("productFormData", productFormData);
  }, [props.show, merchantList, productModalData.productId, isSuccess, isError, merchantList, productFormData?.logo, productFormData?.backgroundImg])

  const handlePostProductCreate = useCallback((values) => {
    postProductCreate(values);
  }, []);


  const onFinish = (values: any) => {
    console.log("onFinish.values", JSON.stringify(values));

    const productInterestRatePairs = values.productInterestRatePairs.map(i => ({ num: Number(i.num), postInterest: Number(i.postInterest), preInterest: Number(i.preInterest) }))
    const creatProductData: PostProductCreateRequestBody = {
      merchantId: Number(values.merchantId),
      productName: values.productName,
      adminUsername: values.adminUsername,
      adminPassword: values.adminPassword,
      logo: values.logo,
      backgroundImg: values.backgroundImg,
      amountRange: `${values.amountRangeLow} - ${values.amountRangeHigh}`,
      // interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}% / day`,
      interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}`,
      // termRange: `${values.termRangeLow}-${values.termRangeHigh} days`,
      termRange: `${values.termRangeLow}-${values.termRangeHigh}`,
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
      productInterestRatePairs: JSON.stringify(productInterestRatePairs),
      top: values.top,
      tags: values.tags.join(","),
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
    // const ModalWrapper = () =>
    // {
    //   console.log("[ModalWrapper] render")
    //   const layout = {
    //     labelCol: { span: 5 },
    //     wrapperCol: { span: 18 },
    //   };
    //   return (
    //     <ErrorBoundary errorComponent={<div>Something went wrong.</div>}>
    //       <Modal
    //         title={!productModalData.isEdit ? "添加产品" : "編輯產品"}
    //         open={productModalData.show}
    //         onCancel={handleCloseModal}
    //         onOk={form.submit}
    //         width={'800px'}
    //         maskClosable={false}
    //       >
    //         <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{
    //           // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`
    //           approveTimeUnit: "mins",
    //           extensible: false,
    //           top: false,
    //           enabled: true,
    //           templateType: 1,
    //         }}>
    //           <BaseSettingSection merchantList={merchantList}/>
    //           <ProductSettingSection logoFileList={uploadFiles?.logoFileList} backgroundImgFileList={uploadFiles?.backgroundImgFileList}/>
    //           <LoanSettingSection/>
    //           <RateSettingSection/>
    //           <UploadSettingSection/>
    //         </Form>
    //       </Modal>
    //     </ErrorBoundary>
    //   )
    // }
    // return ModalWrapper
    // return {
    //   productModalData,
    //   handleCloseModal,
    //   onFinish,
    //   form,
    //   merchantList,
    //   uploadFiles,
    // }
  }, [productModalData.show, productModalData.isEdit, uploadFiles.logoFileList, uploadFiles.backgroundImgFileList])

  return {
    ProductFormModal,
    productModalData,
    setProductModalData,

    handleCloseModal,
    onFinish,
    form,
    merchantList,
    uploadFiles,
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
}
export const ProductModal = (props: ProductModalProps) =>
{
  const { productModalData, handleCloseModal, onFinish, form, merchantList,uploadFiles, onMockFinish } = props;
  console.log("[ModalWrapper] render")
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  return (
    <ErrorBoundary errorComponent={<div>Something went wrong.</div>}>
      <Modal
        title={!productModalData.isEdit ? <span><span style={{ marginRight: 8 }}>添加产品</span> <Button onClick={() => onMockFinish()}>自動填入測試資料</Button></span> : "編輯產品"}
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
          <ProductSettingSection logoFileList={uploadFiles?.logoFileList} backgroundImgFileList={uploadFiles?.backgroundImgFileList}/>
          <LoanSettingSection/>
          <RateSettingSection/>
          <UploadSettingSection/>
        </Form>
      </Modal>
    </ErrorBoundary>
  )
}
