import {Divider, Form, Input, Typography, Row, Col} from "antd";
const { Paragraph, Text } = Typography;

import React from "react";

const RateSettingSection = () => {
  return (
    <React.Fragment>
      <Divider orientation="left">費率設定</Divider>

      <Paragraph style={{ margin: "0 0 0 100px" }}>
          <span>
            填寫規則：
          </span>
        <ul>
          <li>
            所有費率至多填寫至<Text strong>小數點後第一位</Text>，例如：20 或 20.5
          </li>
          <li>
            <Text strong>前置利息+後置利息</Text>不得超過100%
          </li>
        </ul>
      </Paragraph>


      <Form.Item name="amountRange" label="前置利息" rules={[{required: true}]}>
        <Form.Item style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}>
          <Input allowClear placeholder="填寫 0 - 100 間數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item name="amountRange" label="後置利息" rules={[{required: true}]}>
        <Form.Item style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}>
          <Input allowClear placeholder="填寫 0 - 100 間數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item name="amountRange" label="日利息" tooltip="以借款金額計" rules={[{required: true}]}>
        <Form.Item style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}>
          <Input allowClear placeholder="填寫 1-36 間數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item name="amountRange" label="展期利率" rules={[{required: true}]}>
        <Form.Item style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}>
          <Input allowClear placeholder="填寫 0 - 100 間數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

      <Form.Item name="amountRange" label="逾期費率" rules={[{required: true}]}>
        <Form.Item style={{display: 'inline-block', width: '180px', margin: '0 8px 0 0'}}>
          <Input allowClear placeholder="填寫 0 - 100 間數字"/>
        </Form.Item>
        <Form.Item style={{display: 'inline-block', marginBottom: 0}}>%</Form.Item>
      </Form.Item>

    </React.Fragment>
  )
}

export default RateSettingSection;
