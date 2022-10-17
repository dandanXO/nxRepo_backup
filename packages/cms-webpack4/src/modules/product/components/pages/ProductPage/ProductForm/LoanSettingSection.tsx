import {Divider, Form, Input, Switch} from "antd";
import React from "react";
import {NumberValidator} from "../../../../../shared/utils/validator";

const LoanSettingSection = () => {
  return (
    <React.Fragment>
      <Divider orientation="left">借款设定</Divider>

      <Form.Item label="借贷期限" required>
        <Form.Item name="loanTerm" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
           rules={[
             {
               transform: (value) => Number(value),
               validator: async (_, value) =>NumberValidator(_, value)({
                 typeErrorMessage: "请填写大于1的正整数",
                 min: 1,
                 minMessage: "请输入借贷期限",
               })
             },
           ]}
        >
          <Input allowClear placeholder="天数"/>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0}}>天</Form.Item>
      </Form.Item>

      <Form.Item label="最高金额上限(选填)">
        <Form.Item name="maxAmount" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
          <Input allowClear placeholder={"最高金额上限"} prefix="₹" />
        </Form.Item>
      </Form.Item>
      {/* NOTICE: Ant Design 4 的 Switch 组件无法从 Form 里取值 */}
      <Form.Item name="extensible" label="支持展期" valuePropName="checked">
        <Switch checkedChildren="是" unCheckedChildren="否"/>
      </Form.Item>

      <Form.Item label="逾期超过" required>
        <Form.Item name="extensibleOverdueDays" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}
           rules={[
             {
               transform: (value) => Number(value),
               validator: async (_, value) =>NumberValidator(_, value)({
                 min: 1,
                 minMessage: "请输入逾期超过",
               })
             },
           ]}
        >
          <Input allowClear placeholder="填写 1-365 间正整数"/>
        </Form.Item>
        <Form.Item style={{ display: 'inline-block', marginBottom: 0}}>天后，不得展期</Form.Item>
      </Form.Item>
    </React.Fragment>
  )
}

export default LoanSettingSection;
