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

const fileList: UploadFile[] = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
];

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
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="backgroundImg" label="廣告橫幅(選填)"  extra="建議上傳 610x300，若沒有上傳，則由系統隨機配置。">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="interestRange" label="顯示額度" style={{ marginBottom: 0}}>
              <Form.Item name="interestRangeStart"  style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}extra="例如：₹ 3000 - ₹ 10000">
                <Input allowClear placeholder={"最低額度"} prefix="₹" />
              </Form.Item>
              -
              <Form.Item name="interestRangeEnd" style={{ display: 'inline-block', width: '180px', margin: '0 8px' }}>
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

            <Form.Item name="amountRange" label="審核通過時間" style={{ marginBottom: 0 }}>
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

            <Form.Item name="amountRange" label="借貸期限">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="天數"/>
              </Form.Item>
              天
            </Form.Item>

            <Form.Item name="interestRange" label="最高金額上限(選填)">
              <Input allowClear placeholder={"最高金額上限"} prefix="₹" />
            </Form.Item>

            <Form.Item name="interestRange" label="支持展期">
              <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
            </Form.Item>

            <Form.Item name="amountRange" label="逾期超過">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 1-365 間正整數"/>
              </Form.Item>
              天後，不得展期
            </Form.Item>


            <Divider orientation="left">費率設定</Divider>

            <Form.Item name="amountRange" label="前置利息">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 0 - 100 間數字"/>
              </Form.Item>
              %
            </Form.Item>

            <Form.Item name="amountRange" label="後置利息">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 0 - 100 間數字"/>
              </Form.Item>
              %
            </Form.Item>

            <Form.Item name="amountRange" label="日利息" tooltip="以借款金額計">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 1-36 間數字"/>
              </Form.Item>
              %
            </Form.Item>

            <Form.Item name="amountRange" label="展期利率">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 0 - 100 間數字"/>
              </Form.Item>
              %
            </Form.Item>

            <Form.Item name="amountRange" label="逾期費率">
              <Form.Item style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input allowClear placeholder="填寫 0 - 100 間數字"/>
              </Form.Item>
              %
            </Form.Item>

            <Divider orientation="left">上架設定</Divider>

            <Form.Item name="interestRange" label="產品置頂">
              <Switch checkedChildren="是" unCheckedChildren="否" />
            </Form.Item>

            <Form.Item name="amountRange" label="熱門產品標籤" extra="至少1筆，至多3筆"  tooltip={
              <div>
                <span>參考文字：</span>
                <ul>
                  <li>instant disbursal</li>
                  <li>paperless process</li>
                  <li>no processing fee</li>
                  <li>paperless journey</li>
                  <li>best plans</li>
                  <li>flexible repayment</li>
                  <li>Best</li>
                  <li>loan fast</li>
                  <li>low interest</li>
                  <li>high approval rates</li>
                  <li>建議使用簡明易懂的詞彙</li>
                </ul>
              </div>
            }>
              <Input allowClear placeholder="熱門產品文字標籤"/>
            </Form.Item>

            <Form.Item name="amountRange" label="借款模板">
              <Radio.Group defaultValue={1}>
                <Radio value={1}>應還 = 合同金額</Radio>
                <Radio value={2}>到手 = 合同金額</Radio>
              </Radio.Group>
            </Form.Item>


            <Form.Item name="amountRange" label="權重">
              <Input allowClear placeholder="填寫 1-99 間的數字"/>
            </Form.Item>

            <Form.Item name="enabled" label="狀態" initialValue={"true"}>
              <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked />
            </Form.Item>

          </Form>
        </Modal>
      </CustomStyle>
    )
}

export default ProductModal;

