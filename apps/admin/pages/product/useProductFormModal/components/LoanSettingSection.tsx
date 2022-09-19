import {Divider, Form, Input, Switch} from "antd";
import React from "react";
import {NumberValidator} from "../validator";

const LoanSettingSection = () => {
  return (
    <React.Fragment>
      <Divider orientation="left">借款設定</Divider>

      <Form.Item label="借貸期限" required>
        <Form.Item name="loanTerm" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
           rules={[
             {
               transform: (value) => Number(value),
               validator: async (_, value) =>NumberValidator(_, value)({
                 typeErrorMessage: "请填写大于1的正整数",
                 min: 1,
                 minMessage: "请输入借貸期限",
               })
             },
           ]}
        >
          <Input allowClear placeholder="天數"/>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0}}>天</Form.Item>
      </Form.Item>

      <Form.Item label="最高金額上限(選填)">
        <Form.Item name="maxAmount" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
          <Input allowClear placeholder={"最高金額上限"} prefix="₹" />
        </Form.Item>
      </Form.Item>

      <Form.Item name="extensible" label="支持展期">
        <Switch checkedChildren="是" unCheckedChildren="否"/>
      </Form.Item>

      <Form.Item label="逾期超過" required>
        <Form.Item name="extensibleOverdueDays" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
           rules={[
             {
               transform: (value) => Number(value),
               validator: async (_, value) =>NumberValidator(_, value)({
                 min: 1,
                 minMessage: "请输入逾期超過",
               })
             },
           ]}
        >
          <Input allowClear placeholder="填寫 1-365 間正整數"/>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0}}>天後，不得展期</Form.Item>
      </Form.Item>
    </React.Fragment>
  )
}

export default LoanSettingSection;
