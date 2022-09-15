import {Divider, Form, Input} from "antd";
import React from "react";

const RateSettingSection = () => {
  return (
    <React.Fragment>
      <Divider orientation="left">費率設定</Divider>

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
