import { Form, Input } from "antd";
import React from "react";
import { Select } from 'antd'
import {GetAvailableMerchantResponse} from "../../../types/getAvailbaleMerchant";
const { Option } = Select

interface BaseSettingSectionProps {
  merchantList: GetAvailableMerchantResponse;
}
const BaseSettingSection = (props: BaseSettingSectionProps) => {
  return (
    <React.Fragment>
          <Form.Item name="merchantId" label="商戶名" rules={[{ required: true }]} >
              <Select
                  placeholder="商戶名"
                  // onChange={this.onGenderChange}
                  allowClear
              >
                  {props.merchantList.map((i) => <Option key={i.merchantId} value={i.merchantId}>{i.name}</Option>)}
              </Select>
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
    </React.Fragment>
  )
}

export default BaseSettingSection;
