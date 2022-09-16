import {Divider, Form, Input, Switch} from "antd";
import React from "react";

const LoanSettingSection = () => {
  return (
    <React.Fragment>
      <Divider orientation="left">借款設定</Divider>

      <Form.Item name="loanTerm" label="借貸期限" rules={[{ required: true }]}>
        <Form.Item name="loanTerm" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }} >
          <Input allowClear placeholder="天數"/>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0}}>天</Form.Item>
      </Form.Item>

      <Form.Item name="maxAmount" label="最高金額上限(選填)">
        <Input allowClear placeholder={"最高金額上限"} prefix="₹" />
      </Form.Item>

      <Form.Item name="extensible" label="支持展期">
        <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
      </Form.Item>

      <Form.Item name="extensibleOverdueDays" label="逾期超過" rules={[{ required: true }]}>
        <Form.Item name="extensibleOverdueDays" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
          <Input allowClear placeholder="填寫 1-365 間正整數"/>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0}}>天後，不得展期</Form.Item>
      </Form.Item>
    </React.Fragment>
  )
}

export default LoanSettingSection;
