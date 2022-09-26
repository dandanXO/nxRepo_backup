import {CustomAntFormFieldError, ProductFormModal} from "../../hooks/useProductFormModal";
import {GetAvailableMerchantResponse} from "../../../../types/getAvailbaleMerchant";
import React, {useCallback} from "react";
import {Form} from "antd";
import BaseSettingSection from "./BaseSettingSection";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import {UploadSettingSection} from "./UploadSettingSection";

interface ProductFormProps {
  productModalData: ProductFormModal;
  onFinish: (value: any) => void;
  form: any;
  merchantList: GetAvailableMerchantResponse;
  customAntFormFieldError: CustomAntFormFieldError;
  setCustomAntFormFieldError: React.Dispatch<React.SetStateAction<CustomAntFormFieldError>>;
  show: boolean;
}

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

  return (
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
  )
}

export default Index;
