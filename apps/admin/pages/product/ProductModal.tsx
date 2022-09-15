import {Button, Divider, Form, Input, Modal, Radio, Upload, UploadProps, message, TimePicker, Select} from 'antd';
import {ProductModalType} from "./index";
import {UploadOutlined} from "@ant-design/icons";
import styled from "styled-components";


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

const CustomStyle = styled.div`
  .ant-input-group.ant-input-group-compact > *:last-child {
    border-bottom-right-radius: 0;
  }
`


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
      <CustomStyle>
        <Modal
          title="添加商戶"
          visible={true}
          onCancel={handleCloseModal}
          onOk={form.submit}
          width={'80%'}
        >
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="name" label="商戶ID" rules={[{ required: true }]} >
              <Input allowClear placeholder="商戶ID"/>
            </Form.Item>
            <Form.Item name="productName" label="產品名" rules={[{ required: true }]}>
              <Input allowClear placeholder="A1 Loan"/>
            </Form.Item>
            <Form.Item name="adminUsername" label="用戶名">
              <Input allowClear/>
            </Form.Item>

            <Form.Item name="adminPassword" label="登入密碼" rules={[{ required: true }]}>
              <Input.Password allowClear placeholder="登入密碼"/>
            </Form.Item>

            <Divider orientation="left">產品設定</Divider>


            <Form.Item label="Logo">
              <Input.Group compact>
                <Form.Item>
                  <Input allowClear placeholder="url"/>
                </Form.Item>
                <Form.Item name="logo" noStyle>
                  <Upload {...uploadLogoProps}>
                    <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
                  </Upload>
                </Form.Item>
              </Input.Group>
            </Form.Item>




            <Form.Item name="backgroundImg" label="廣告橫幅(選填)"  extra="建議上傳 610x300，若沒有上傳，則由系統隨機配置。">
              <Input allowClear placeholder="url"/>
              <Upload {...uploadLogoProps}>
                <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="interestRange" label="顯示額度" style={{ marginBottom: 0}}>
              <Form.Item name="interestRangeStart" style={{ display: 'inline-block', width: '180px' }} extra="例如：₹ 3000 - ₹ 10000">
                <Input allowClear placeholder={"最低額度"} prefix="₹" />
              </Form.Item>
              -
              <Form.Item name="interestRangeEnd" style={{ display: 'inline-block', width: '180px' }}>
                <Input allowClear placeholder={"最高額度"} prefix="₹" />
              </Form.Item>
            </Form.Item>

            <Form.Item name="interestRange" label="顯示利息" extra="至多填寫至小數點後兩位，例如：0.01 - 0.1% / day">
              <Form.Item name="interestRangeStart" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}>
                <Input allowClear placeholder={"最低利息"}/>
              </Form.Item>
              -
              <Form.Item name="interestRangeEnd" style={{ display: 'inline-block', width: '180px', margin: '0 8px' }}>
                <Input allowClear placeholder={"最高利息"}/>
              </Form.Item>
              天
            </Form.Item>

            <Form.Item name="interestRange" label="顯示期限" extra="例如：91-365 days">
              <Form.Item name="interestRangeStart" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder={"最低天數"}/>
              </Form.Item>
              -
              <Form.Item name="interestRangeEnd" style={{ display: 'inline-block', width: '180px', margin: '0 8px' }}>
                <Input allowClear placeholder={"最高天數"}/>
              </Form.Item>
              天
            </Form.Item>

            <Form.Item name="amountRange" label="通過率">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 1-100 間數字"/>
              </Form.Item>
              %
            </Form.Item>

            <Form.Item name="amountRange" label="審核通過時間">
              <Input.Group compact style={{ borderRight: 0}}>
                <Form.Item>
                  <Input allowClear placeholder="填寫數字"/>
                </Form.Item>
                <Form.Item>
                  <Select
                    placeholder="分鐘"
                    // onChange={this.onGenderChange}
                    allowClear
                  >
                    <Select.Option value="male">小時</Select.Option>
                    <Select.Option value="female">天</Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>

            </Form.Item>

            <Form.Item name="amountRange" label="客服郵箱" extra="例如：5 分鐘">
              <Input allowClear placeholder="mail@mail.com"/>
            </Form.Item>

            <Form.Item name="amountRange" label="客服時間">
              <TimePicker.RangePicker />
            </Form.Item>



            <Divider orientation="left">借款設定</Divider>

            <Divider orientation="left">費率設定</Divider>

            <Divider orientation="left">上架設定</Divider>
            <Form.Item name="enabled" label="狀態" initialValue={"true"}>
              <Radio.Group >
                <Radio value="true">上架</Radio>
                <Radio value="false">下架</Radio>
              </Radio.Group>
            </Form.Item>

          </Form>
        </Modal>
      </CustomStyle>
    )
}

export default ProductModal;

