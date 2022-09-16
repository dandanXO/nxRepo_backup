import {Button, Divider, Form, Input, Select, TimePicker, Upload, UploadFile} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React from "react";
import {formItemGroupRule,formItemRule} from "./rules";
import {EmailValidator, NumberValidator} from "./validator";

const fileList: UploadFile[] = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
];



const ProductSettingSection = () => {
  return (
      <React.Fragment>
          <Divider orientation="left">產品設定</Divider>

          <Form.Item label="Logo" rules={[{ required: true }]} >
              <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  defaultFileList={[...fileList]}
              >
                  <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
              </Upload>
          </Form.Item>

          <Form.Item name="backgroundImg" label="廣告橫幅(選填)" extra="建議上傳 610x300，若沒有上傳，則由系統隨機配置。">
              <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  defaultFileList={[...fileList]}
              >
                  <Button icon={<UploadOutlined />}>點擊上傳圖片</Button>
              </Upload>
          </Form.Item>

          <Form.Item name="amountRange" label="顯示額度" style={{ marginBottom: 0 }}>
              <Form.Item name="amountRangeLow" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }} extra="例如：₹ 3000 - ₹ 10000"
                   rules={[
                     {
                       transform: (value) => Number(value),
                       validator: async (_, value) =>NumberValidator(_, value)({
                         min: 1,
                         minMessage: "请输入最低額度",
                       })
                     },
                   ]}
              >
                  <Input allowClear placeholder={"最低額度"} prefix="₹" />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>-</Form.Item>
              <Form.Item name="amountRangeHigh" style={{ display: 'inline-block', width: '180px', margin: '0 8px' }}
                   rules={[
                     {
                       transform: (value) => Number(value),
                       validator: async (_, value) =>NumberValidator(_, value)({
                         min: 1,
                         minMessage: "请输入最高額度",
                       })
                     },
                   ]}

              >
                  <Input allowClear placeholder={"最高額度"} prefix="₹" />
              </Form.Item>
          </Form.Item>

          <Form.Item name="interestRange" label="顯示利息" extra="至多填寫至小數點後兩位，例如：0.01 - 0.1% / day">
              <Form.Item name="interestRangeLow" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                   rules={[
                     {
                       transform: (value) => Number(value),
                       validator: async (_, value) =>NumberValidator(_, value)({
                         min: 1,
                         minMessage: "请输入最低利息",
                         max: 100,
                         maxMessage: "不可超过100%",
                       })
                     },
                   ]}
              >
                  <Input allowClear placeholder={"最低利息"} />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>-</Form.Item>
              <Form.Item name="interestRangeHigh" style={{ display: 'inline-block', width: '180px', margin: '0 8px' }}
                 rules={[
                   {
                     transform: (value) => Number(value),
                     validator: async (_, value) =>NumberValidator(_, value)({
                       min: 1,
                       minMessage: "请输入最高利息",
                       max: 100,
                       maxMessage: "不可超过100%",
                     })
                   },
                 ]}
              >
                  <Input allowClear placeholder={"最高利息"} />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天</Form.Item>
          </Form.Item>

          <Form.Item name="termRange" label="顯示期限" extra="例如：91-365 days">
              <Form.Item name="termRangeLow" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                         rules={[
                           {
                             transform: (value) => Number(value),
                             validator: async (_, value) =>NumberValidator(_, value)({
                               min: 1,
                               minMessage: "请输入最低天數",
                               max: 365,
                               maxMessage: "请填写1-365间数字%",
                             })
                           },
                         ]}
              >
                  <Input allowClear placeholder={"最低天數"} />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>-</Form.Item>
              <Form.Item name="termRangeHigh" style={{ display: 'inline-block', width: '180px', margin: '0 8px' }}
                 rules={[
                   {
                     transform: (value) => Number(value),
                     validator: async (_, value) =>NumberValidator(_, value)({
                       min: 1,
                       minMessage: "请输入最高天數",
                       max: 365,
                       maxMessage: "请填写1-365间数字%",
                     })
                   },
                 ]}
              >
                  <Input allowClear placeholder={"最高天數"} />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天</Form.Item>
          </Form.Item>

          <Form.Item name="approveRate" label="通過率" rules={formItemGroupRule}>
              <Form.Item name="approveRate" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
                 rules={[
                   {
                     transform: (value) => Number(value),
                     validator: async (_, value) =>NumberValidator(_, value)({
                       min: 1,
                       minMessage: "请输入通過率",
                       max: 100,
                       maxMessage: "请填写1-100间数字",
                     })
                   },
                 ]}
              >
                  <Input allowClear placeholder="填寫 1-100 間數字" />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>%</Form.Item>
          </Form.Item>

          <Form.Item name="approveTime" label="審核通過時間" extra="例如：5 分鐘">
              <Form.Item name="approveTime" style={{ display: 'inline-block', width: '180px', marginBottom: 0 }}
                 rules={[
                   {
                     transform: (value) => Number(value),
                     validator: async (_, value) =>NumberValidator(_, value)({
                       min: 1,
                       minMessage: "请输入審核通過時間",
                     })
                   },
                 ]}
              >
                  <Input allowClear placeholder="填寫數字" />
              </Form.Item>
              <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>
                  <Select
                      placeholder="分鐘"
                      // onChange={this.onGenderChange}
                      allowClear
                  >
                      <Select.Option value="mins">分鐘</Select.Option>
                      <Select.Option value="hours">小時</Select.Option>
                      <Select.Option value="days">天</Select.Option>
                  </Select>
              </Form.Item>
          </Form.Item>

          <Form.Item name="csEmail" label="客服郵箱"
             rules={[
               {
                 transform: (value) => String(value),
                 validator: async (_, value) =>EmailValidator(_, value)({
                   required: true,
                 })
               },
             ]}
          >
              <Input allowClear placeholder="mail@mail.com" />
          </Form.Item>

          <Form.Item name="csTime" label="客服時間" rules={[{ required: true }]}>
              <TimePicker.RangePicker />
          </Form.Item>
      </React.Fragment>
  )
}
export default ProductSettingSection;
