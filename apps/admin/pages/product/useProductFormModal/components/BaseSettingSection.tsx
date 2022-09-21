import {Form, Input, UploadFile} from "antd";
import React from "react";
import { Select } from 'antd'
import {GetAvailableMerchantResponse} from "../../../../types/getAvailbaleMerchant";
const { Option } = Select

interface BaseSettingSectionProps {
  merchantList?: GetAvailableMerchantResponse;
  isEdit: boolean;
}
const BaseSettingSection = (props: BaseSettingSectionProps) => {
  return (
    <React.Fragment>
          <Form.Item name="merchantId" label="商户名" rules={[{ required: true }]} >
              <Select
                  placeholder="商户名"
                  // onChange={this.onGenderChange}
                  allowClear
              >
                  {props?.merchantList.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}
              </Select>
          </Form.Item>

      <Form.Item name="productName" label="产品名" rules={[{ required: true }]}>
        <Input allowClear placeholder="A1 Loan"/>
      </Form.Item>

      <Form.Item name="adminUsername" label="用户名">
        <Input allowClear disabled={props.isEdit}/>
      </Form.Item>

      <Form.Item name="adminPassword" label="登入密码" rules={[{ required: !props.isEdit }]}>
        <Input.Password allowClear placeholder="登入密码"/>
      </Form.Item>
    </React.Fragment>
  )
}

export default BaseSettingSection;
