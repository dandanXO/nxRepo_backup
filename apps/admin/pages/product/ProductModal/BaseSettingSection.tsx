import {Form, Input} from "antd";
import React from "react";

const BaseSettingSection = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default BaseSettingSection;
