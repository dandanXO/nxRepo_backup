import {Divider, Form, Input, Radio, Switch} from "antd";
import React from "react";
import {NumberValidator} from "../../../../../shared/utils/validation/validator";
import {FormInstance} from "antd/es";

interface LoanSettingSectionProps {
    form: FormInstance;
    enableLoanAmount: boolean;
    enableReLoanAmount: boolean;
}
const LoanSettingSection = (props: LoanSettingSectionProps) => {
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

        <Form.Item label="初贷初始额度">

            <Form.Item name="firstLoanQuotaSwitch" style={{ display: 'inline-block', margin: '0 8px 0 0' }}>
                <Radio.Group>
                    <Radio value={1}>依照风控</Radio>
                    <Radio value={0}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="loanAmount" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input disabled={!props.enableLoanAmount} allowClear placeholder={"初贷初始额度"} />
            </Form.Item>

        </Form.Item>


        <Form.Item label="复贷初始额度">

            <Form.Item name="reLoanQuotaSwitch" style={{ display: 'inline-block', margin: '0 8px 0 0' }}>
                <Radio.Group>
                    <Radio value={1}>依照风控</Radio>
                    <Radio value={0}>系统规则</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="reLoanAmount" style={{ display: 'inline-block', width: '180px', margin: '0 8px 0 0' }}>
                <Input disabled={!props.enableReLoanAmount} allowClear placeholder={"复贷初始额度"} />
            </Form.Item>

        </Form.Item>


    </React.Fragment>
  )
}

export default LoanSettingSection;
