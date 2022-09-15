import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Upload,
  UploadProps,
  message,
  TimePicker,
  Select,
  UploadFile, Switch
} from 'antd';
import {ProductModalType} from "../index";
import {UploadOutlined} from "@ant-design/icons";
import styled from "styled-components";
import ProductSettingSection from "./ProductSettingSection";
import LoanSettingSection from "./LoanSettingSection";
import RateSettingSection from "./RateSettingSection";
import BaseSettingSection from "./BaseSettingSection";


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
    const onFinish = (values: any) => {
        console.log(values)
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
        title="添加商戶"
        visible={true}
        onCancel={handleCloseModal}
        onOk={form.submit}
        width={'80%'}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <BaseSettingSection/>
          <ProductSettingSection/>
          <LoanSettingSection/>
          <RateSettingSection/>
        </Form>
      </Modal>
    )
}

export default ProductModal;

