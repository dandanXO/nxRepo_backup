import {Form, message, Modal, Upload, UploadProps} from 'antd';
import {ProductModalType} from "../index";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import BaseSettingSection from "./BaseSettingSection";
import React, {useCallback} from "react";
import {UploadSettingSection} from "./UploadSettingSection";
import {usePostProductCreateMutation} from "../../../api"
import {PostProductCreateRequestBody} from "../../../types/postProductCreate"

const uploadLogoProps: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  beforeUpload: file => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};



const ProductModal = ({ setProductModalVisible }: ProductModalType) => {

    const [form] = Form.useForm();

    const [postProductCreate, { isLoading }] = usePostProductCreateMutation();

    const postProductCreateRequest = useCallback(
        (props: PostProductCreateRequestBody) => {
            postProductCreate(props)
                .unwrap()
                .then((data: PostProductCreateRequestBody) => {
                    // do nothing.
                })
                .catch(({ error }) => {
                    console.log(error);
                })
                .finally(() => {
                    // do nothing.
                });
        }, []);

    const handlePostProductCreate = useCallback((values) => {
        postProductCreateRequest({ ...values });
    }, []);

    const onFinish = (values: any) => {
        console.log(values)
        const creatProductData = {
            ...values,
            amountRange: `₹ ${values.amountRangeLow} - ₹ ${values.amountRangeHigh}`,
            interestRange: `${values.interestRangeLow} - ${values.interestRangeHigh}% / day`,
            termRange: `${values.termRangeLow}-${values.termRangeHigh} days`,
            approveTime: `${values.approveTime} ${values.approveTimeUnit}`
        }
        console.log(creatProductData)
        // handlePostProductCreate(creatProductData);
    };

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    const handleCloseModal = () => {
        setProductModalVisible(false)
        form.resetFields()
    }

    return (
      <Modal
        title="添加产品"
        open={true}
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
          <BaseSettingSection/>
          <ProductSettingSection/>
          <LoanSettingSection/>
          <RateSettingSection/>
          <UploadSettingSection/>
        </Form>
      </Modal>
    )
}

export default ProductModal;

