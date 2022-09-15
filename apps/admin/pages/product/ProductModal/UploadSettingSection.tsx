import {Divider, Form, Input, Radio, Switch} from "antd";
import React from "react";

export function UploadSettingSection() {
  return <>
    <Divider orientation="left">上架設定</Divider>

    <Form.Item name="interestRange" label="產品置頂">
      <Switch checkedChildren="是" unCheckedChildren="否"/>
    </Form.Item>

    <Form.Item name="amountRange" label="熱門產品標籤" extra="至少1筆，至多3筆" style={{marginBottom: 0}}
               rules={[{required: true}]} tooltip={
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
      <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked/>
    </Form.Item>
  </>;
}
