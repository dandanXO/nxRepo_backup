import {Divider, Form, Input, Radio, Switch, Select} from "antd";
const { Option } = Select;
import React, {useMemo} from "react";
import {TagValidator} from "../../ProductModal/validator";

export function UploadSettingSection() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return <>
    <Divider orientation="left">上架設定</Divider>

    <Form.Item name="top" label="產品置頂">
      <Switch checkedChildren="是" unCheckedChildren="否"/>
    </Form.Item>

    <Form.Item name="tags" label="熱門產品標籤" extra="至少1筆，至多3筆" style={{marginBottom: 0}}
       rules={[
         {
           validator: async (_, value) => TagValidator(_, value)({
             typeErrorMessage: "至少1笔，至多3笔",
             required: true,
             message:"至少1笔，至多3笔",
           })
         },
       ]}
      tooltip={
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
      }
    >
      <Select mode="tags" style={{ width: '100%' }} placeholder="热门产品文字标签" onChange={handleChange} />
    </Form.Item>

    <Form.Item name="templateType" label="借款模板">
      <Radio.Group>
        <Radio value={1}>應還 = 合同金額</Radio>
        <Radio value={2}>到手 = 合同金額</Radio>
      </Radio.Group>
    </Form.Item>


    <Form.Item name="weight" label="權重">
      <Input allowClear placeholder="填寫 1-99 間的數字"/>
    </Form.Item>

    <Form.Item name="enabled" label="狀態">
      <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked/>
    </Form.Item>
  </>;
}
