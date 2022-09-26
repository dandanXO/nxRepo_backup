import React, {useCallback, useEffect} from "react";
import {Button, Form, Modal} from "antd";
import BaseSettingSection from "./components/BaseSettingSection";
import ProductSettingSection from "./components/ProductSettingSection";
import LoanSettingSection from "./components/LoanSettingSection";
import RateSettingSection from "./components/RateSettingSection";
import {UploadSettingSection} from "./components/UploadSettingSection";
import {GetAvailableMerchantResponse} from "../../types/getAvailbaleMerchant";
import {CustomAntFormFieldError, ProductFormModal} from "./index";


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
  show: boolean;
  // formRef: any,
  // ref: any;
}

// ProductModalForwardRefless
const ProductModal = (props: ProductModalProps) =>
{
  const { productModalData, handleCloseModal, onFinish, form, merchantList,uploadFiles, onMockFinish, customAntFormFieldError, setCustomAntFormFieldError } = props;
  // console.log("debug.setCustomAntFormFieldError", setCustomAntFormFieldError);
  // console.log("[ModalWrapper] render")
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

  // useEffect(() => {
  //   console.log("debug reset")
  //   // form.resetFields();
  //   formRef.current.resetFields();
  // }, [props.show])

  // const formRef = React.useRef<FormInstance>();

  // useEffect(() => {
  //   if (formRef.current !== null) {
  //     formRef.current.resetFields();
  //   }
  // }, [formRef.current])

  return (
    <Modal
      title={!productModalData.isEdit ? <span><span style={{ marginRight: 8 }}>添加产品</span> <Button onClick={() => onMockFinish()}>自动填入范本资料</Button></span> : "编辑产品"}
      open={productModalData.show}
      onCancel={handleCloseModal}
      onOk={form.submit}
      width={'800px'}
      maskClosable={false}
    >
      <Form
        // ref={props.formRef}
        {...layout} form={form} name="control-hooks" onFinish={onFinish}
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
                    help: "请填写0-100间数字",
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
                    help: "请填写0-100间数字",
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
              productInterestRatePairs: [{
                num: "",
                postInterest: "",
                preInterest: "",
              }]
            }}
      >
        <BaseSettingSection merchantList={merchantList} isEdit={productModalData.isEdit}/>
        <ProductSettingSection setLogo={setLogo} setBackgroundImg={setBackgroundImg}/>
        <LoanSettingSection/>
        <RateSettingSection form={form} customAntFormFieldError={customAntFormFieldError}/>
        <UploadSettingSection/>
      </Form>
    </Modal>
  )
}

// const ProductModal = React.forwardRef((props, ref) => (
//   <ProductModalForwardRefless ref={ref} {...props}>
// ));

export { ProductModal };
