import {Button, Divider, Form, Input, message, Select, TimePicker, Upload, UploadFile, UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React, {useCallback, useState} from "react";
import {EmailValidator, NumberValidator} from "../validator";




interface ProductSettingSectionProps {
  setLogo: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundImg: React.Dispatch<React.SetStateAction<string>>;
}
const ProductSettingSection = (props: ProductSettingSectionProps) => {

  const uploadLogoProps: UploadProps = {
    name: 'file',
    action: '/hs/admin/product-manage/icon/upload',
    beforeUpload: file => {
      console.log("file", file);
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
        console.log("info", info);
        props.setLogo(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const uploadBackgroundImgProps: UploadProps = {
    name: 'file',
    action: '/hs/admin/product-manage/icon/upload',
    beforeUpload: file => {
      console.log("file", file);
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
        console.log("info", info);
        props.setBackgroundImg(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
      <React.Fragment>
        <Divider orientation="left">產品設定</Divider>

        <Form.Item label="Logo" required>
          <Form.Item name="logo">
            <Input allowClear placeholder={""} />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', marginBottom: 0 }} >
            <Upload
              maxCount={1}
              listType="picture"
              // NOTICE: https://segmentfault.com/q/1010000037501973
              // NOTICE: 受 Form 控制，不可提供 fileList
              // fileList={props.backgroundImgFileList}
              // NOTICE: [Upload file.status is always being uploading](https://github.com/ant-design/ant-design/issues/2423)
              // disabled
              {...uploadLogoProps}
            >
              <Button icon={<UploadOutlined />}>点击上传图片</Button>
            </Upload>
          </Form.Item>
        </Form.Item>

        <Form.Item label="廣告橫幅(選填)">
          <Form.Item name="backgroundImg" extra="建議上傳 610x300，若沒有上傳，則由系統隨機配置。">
            <Input allowClear placeholder={""} />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', marginBottom: 0 }} >
            <Upload
              maxCount={1}
              //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              // NOTICE: https://segmentfault.com/q/1010000037501973
              // fileList={props.backgroundImgFileList}
              // disabled
              {...uploadBackgroundImgProps}
            >
              <Button icon={<UploadOutlined />}>点击上传图片</Button>
            </Upload>
          </Form.Item>
        </Form.Item>


          <Form.Item  label="顯示額度" style={{ marginBottom: 0 }} required >
              <Form.Item name="amountRangeLow" style={{ display: 'inline-block', width: '250px', margin: '0 8px 0 0' }} extra="例如：₹ 3000 - ₹ 10000"
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

          <Form.Item label="顯示利息" extra="至多填寫至小數點後兩位，例如：0.01 - 0.1% / day" required>
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
                  <Input allowClear placeholder={"最低利息"} suffix={"%"}/>
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

          <Form.Item label="顯示期限" extra="例如：91-365 days" required>
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

          <Form.Item label="通過率" required>
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

          <Form.Item label="審核通過時間" extra="例如：5 分钟" required>
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
              <Form.Item name="approveTimeUnit" style={{ display: 'inline-block', marginBottom: 0 }} >
                  <Select
                    // NOTICE: [antd: Form.Item] `defaultValue` will not work on controlled Field. You should use `initialValues`
                    //   defaultValue={"mins"}
                  >
                      <Select.Option value="mins">分钟</Select.Option>
                      <Select.Option value="hours">小时</Select.Option>
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
             required
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
